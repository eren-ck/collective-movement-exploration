import decimal
from flask import Blueprint, Response, jsonify, request
from sqlalchemy import text

from db import db, create_session

from helpers.auth import user_required
from model.dataset_model import Dataset
from model.percentile_model import Percentile
from model.metadata_model import Metadata
from model.network_model import Network
from model.movement_data_model import Movement_data

api_page = Blueprint('api', __name__, url_prefix='/api')


@api_page.before_request
@user_required
def check_user():
    """ Protect to only logged in users of the admin endpoints. """
    pass


# Custom Rest API
@api_page.route('/dataset', methods=['GET'])
def get_dataset():
    """
        Return all datasets
    """
    datasets = db.session.query(Dataset).all()
    results = []
    for elem in datasets:
        results.append(elem.as_dict())
    return jsonify(results)


@api_page.route('/dataset/<int:id>', methods=['GET'])
def get_dataset_id(id=None):
    """
        Return a specific dataset

        :param id: id of the specific dataset
    """
    if not id:
        return jsonify({})
    datasets = db.session.query(Dataset).filter_by(id=id)
    results = []
    for elem in datasets:
        results.append(elem.as_dict())
    return jsonify(results)


@api_page.route('/dataset/user/<int:user_id>', methods=['GET'])
def get_dataset_user_id(user_id=None):
    """
        Return all datasets of a specific user

        :param user_id: id of the user
    """
    if not id:
        datasets = db.session.query(Dataset).all()
    else:
        datasets = db.session.query(Dataset).filter_by(user_id=user_id)
    results = []
    for elem in datasets:
        results.append(elem.as_dict())
    return jsonify(results)


@api_page.route('/dataset/<int:id>/<feature>', methods=['GET'])
def get_feature(id=None, feature=None):
    """
        Return a feature of a specific dataset

        :param id : id of the specific dataset
        :param feature: feature string
    """
    # not a valid feature
    if not id or not feature:
        return jsonify({})

    # return absolute features
    if feature in ['speed', 'acceleration', 'distance_centroid', 'metric_distance', 'direction', 'midline_offset']:
        stmt = '''SELECT array(
                           SELECT round(''' + feature + ''',2)::text
                           FROM movement_data
                           WHERE dataset_id = :id
                           ORDER BY "time", animal_id); '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return the centroid
    if feature in ['centroid']:
        stmt = '''SELECT array(SELECT  ST_asGeoJSON(centroid)::json->'coordinates'
                    FROM group_data
                    WHERE dataset_id = :id
                    ORDER BY "time") ; '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return the medoid
    if feature in ['medoid']:
        stmt = '''SELECT array(SELECT medoid
                       FROM group_data
                       WHERE dataset_id = :id
                       ORDER BY "time") ; '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return one of the aggregated and averaged swarm features
    if feature in ['swarm_time', 'swarm_speed', 'swarm_acceleration', 'swarm_convex_hull_area',
                   'swarm_distance_centroid',
                   'swarm_direction', 'swarm_polarisation']:
        feature = feature.replace('swarm_', '')
        stmt = '''SELECT array(
                           SELECT round(''' + feature + ''',2)::text
                           FROM group_data
                           WHERE dataset_id = :id
                           ORDER BY "time"); '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return convex hull
    if feature in ['convex_hull']:
        stmt = '''SELECT array(
                SELECT ST_asSVG(ST_Simplify(convex_hull,0.1),0,1) as convex_hull
                FROM group_data
                WHERE dataset_id = :id
                ORDER BY "time"); '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return triangulation
    if feature in ['triangulation']:
        stmt = '''SELECT array(
                SELECT ST_asSVG(ST_Simplify(delaunay_triangulation,0.1),0,1) as delaunay_triangulation
                FROM group_data
                WHERE dataset_id = :id
                ORDER BY "time"); '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    # return triangulation
    if feature in ['voronoi']:
        stmt = '''SELECT array(
                SELECT ST_asSVG(ST_Simplify(voronoi_polygons,0.1),0,1) as voronoi
                FROM group_data
                WHERE dataset_id = :id
                ORDER BY "time"); '''
        result = db.engine.execute(text(stmt), id=id).fetchone()[0]
        return jsonify(result)

    return jsonify({"id": id, "feature": feature})


@api_page.route('/dataset/<int:id>/vc', methods=['GET'])
def get_vc_feature(id=None):
    """
           Return the variation coefficient of the feature

           :param id: id of the specific dataset
       """
    # not a valid feature
    if not id:
        return jsonify({})
    result = {}
    # return absolute features
    for feature in ['metric_distance', 'speed', 'acceleration', 'distance_centroid', 'direction']:
        stmt = '''SELECT stddev(''' + feature + '''+ tmp.val ) / avg(''' + feature + ''' + tmp.val)
                    FROM movement_data,
                        (SELECT abs(min(''' + feature + ''')) as val
                        FROM movement_data
                        WHERE dataset_id = :id) as tmp
                    WHERE dataset_id = :id; '''
        query = db.engine.execute(text(stmt), id=id).fetchone()[0]

        if isinstance(query, decimal.Decimal):
            result[feature] = round(float(query), 4)
    # TODO add some more features here
    for feature in ['convex_hull_area']:
        stmt = '''SELECT stddev(''' + feature + '''+ tmp.val ) / avg(''' + feature + ''' + tmp.val)
                            FROM group_data,
                                (SELECT abs(min(''' + feature + ''')) as val
                                FROM group_data
                                WHERE dataset_id = :id) as tmp
                            WHERE dataset_id = :id; '''
        query = db.engine.execute(text(stmt), id=id).fetchone()[0]

        if isinstance(query, decimal.Decimal):
            if feature == 'convex_hull_area':
                result['euclidean_distance'] = round(float(query), 4)
            else:
                result[feature] = round(float(query), 4)

    return jsonify(result)


@api_page.route('/movement_only/<int:id>', methods=['GET'])
def get_movment_only(id=None):
    """
            Return all only the movement data of a specific dataset

            :param id: id of the specific dataset
        """

    def streaming_func():
        session = create_session()
        if id == None:
            return jsonify({})
        num_records = 1500
        stmt = '''SELECT json_build_object('a', animal_id, 't', "time", 'p', ST_asGeoJSON(position)::json->'coordinates')::text
                FROM movement_data
                WHERE dataset_id = '%s'
                ORDER BY "time", animal_id ;'''
        result = session.connection().execution_options(stream_results=True).execute(stmt, (id))
        while True:
            rows = result.fetchmany(num_records)
            if not rows:
                break
            tmp = 'data: ['
            for elem in rows:
                tmp += elem[0] + ','
            tmp = tmp[:-1]
            yield tmp + ']\n\n'

        yield 'data: close\n\n'
        session.remove()

    return Response(streaming_func(), mimetype='text/event-stream')


@api_page.route('/percentile/<int:id>', methods=['GET'])
def get_percentile(id=None):
    """
        Return the percentiles of a datasets

        :param id: id of the specific dataset
    """
    if not id:
        return jsonify({})
    query = db.session.query(Percentile).filter_by(dataset_id=id)
    result = []
    for elem in query:
        result.append(elem.as_dict())
    return jsonify(result)


@api_page.route('/metadata/<int:id>', methods=['GET'])
def get_metadata(id=None):
    """
        Return the metadata information for the datasets

        :param id: id of the specific dataset
    """
    if not id:
        return jsonify({})
    query = db.session.query(Metadata).filter_by(dataset_id=id)
    result = []
    for elem in query:
        result.append(elem.as_dict())
    return jsonify(result)


@api_page.route('/dataset/networks/<int:id>', methods=['GET'])
def get_dataset_networks(id=None):
    """
        Return all network information (not the data) of a specific dataset

        :param id: id of the specific dataset
    """
    if not id:
        return jsonify({})
    query = db.session.query(Network).filter_by(dataset_id=id)
    result = []
    for elem in query:
        result.append(elem.as_info_dict())
    return jsonify(result)


@api_page.route('/dataset/network/<int:dataset_id>/<int:network_id>', methods=['GET'])
def get_dataset_network_data(dataset_id=None, network_id=None):
    """
        Return a json of the network for a specific dataset

        :param dataset_id: id of the specific dataset
        :param network_id: network id of the specific dataset
    """
    if dataset_id is None or network_id is None:
        return jsonify({})
    query = db.session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id)
    result = []
    for elem in query:
        result.append(elem.network_as_data_dict())
    return jsonify(result)


@api_page.route('/dataset/network/hierarchy/<int:dataset_id>/<int:network_id>', methods=['GET'])
def get_dataset_network_hierarchy_data(dataset_id=None, network_id=None):
    """
        Return a json of the network hierarchy for a specific dataset

        :param dataset_id: id of the specific dataset
        :param network_id: network id of the specific dataset
    """
    if dataset_id is None or network_id is None:
        return jsonify({})
    query = db.session.query(Network).filter_by(dataset_id=dataset_id, network_id=network_id)
    result = []
    for elem in query:
        result.append(elem.hierarchy_as_data_dict())
    return jsonify(result)


@api_page.route('/dataset/<int:id>/animal_ids', methods=['GET'])
def get_animal_ids(id=None):
    """
        Return the distinct animal ids

        :param id : id of the specific dataset
    """
    if id is None:
        return jsonify({})
    animal_ids = db.session.query(Movement_data.animal_id).filter_by(dataset_id=id).distinct(Movement_data.animal_id)
    result = []
    for elem in animal_ids:
        result.append(elem[0])
    return jsonify(result)

# @ api_page.route('/api/dataset/visual_parameter/<int:dataset_id>', methods=['POST'])
# def get_dataset_suggested_parameters(dataset_id=None):
#     """
#         Calculate the suggested parameters via a optimization method
#
#         :param
#             dataset_id: id of the specific dataset
#             tracked_data: JSON String of the tracked data
#     """
#     # Get JSON object passed with Ajax request
#     tracked_data = request.json
#     return jsonify(data=calculate_parameters(dataset_id, tracked_data))
