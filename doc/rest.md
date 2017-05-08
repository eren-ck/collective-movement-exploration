# REST API

This is a REST API documentation. The REST API is only accessible when logged in.

```
Title : Show all datasets
URL : /api/dataset
Method : GET
URL Params :
Data Params :
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Show the dataset with unique identifier id
URL : /api/dataset/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { id : [integer] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Show all datasets of a specific user.
URL : /api/dataset/user/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { id : [integer] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Return a extracted feature of a dataset.
URL : /api/dataset/:id/:feature
Method : GET | POST | DELETE | PUT
URL Params : Required: id=[integer],  feature=[string]
Data Params : { id : [integer], feature:['speed', 'acceleration', 'distance_centroid',
   'metric_distance','centroid', 'medoid', 'swarm_speed', 'swarm_acceleration',
   'swarm_convex_hull_area', 'convex_hull', 'triangulation', 'voronoi'] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Get the movement data of a specific dataset.
URL : /api/movement_only/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { id : [integer] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Show all feature scales for the specific color schemes
URL : /api/percentile/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { id : [integer] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```

```
Title : Get all metadata of a specific dataset
URL : /api/metadata/:id
Method : GET
URL Params : Required: id=[integer]
Data Params : { id : [integer] }
Response Codes: Success (200 OK), Bad Request (400), Unauthorized (401)
```
