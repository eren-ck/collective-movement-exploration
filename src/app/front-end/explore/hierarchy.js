/*eslint-disable no-unused-lets*/
/*global window,$, d3*/
// import * as spv from './spatial_view.js';

import {
    networkHierarchy
} from './explore.js';

import {
    indexTime,
    arrayAnimals
} from './spatial_view/spatial_view';

let zoomGroup;
let treemap;
let spatialView;
let hierarchyLevels = {
    'h0': 2,
    'h1': 2,
    'h2': 2,
    'h3': 2,
}; // which level of the hierarchy is visualized

export function initDendrogram() {
    let margin = 20,
        width = 5000,
        height = 5000;
    // animal_ids.length * 30
    let zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on('zoom', function() {
            //constrained zooming
            d3.event.transform.x = Math.min(0, width * (d3.event.transform.k - 1),
                Math.max(width * (1 - d3.event.transform.k), d3.event.transform.x));

            d3.event.transform.y = Math.min(0, height * (d3.event.transform.k - 1),
                Math.max(height * (1 - d3.event.transform.k), d3.event.transform.y));

            // translate and scale
            zoomGroup.attr('transform', d3.event.transform);
        });

    let svg = d3.select('#dendrogram-vis')
        .classed('svg-dendrogramContainer', true)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        // add the class svg-content
        .classed('svg-content', true)
        .attr('id', 'main-vis-svg')
        .call(zoom);

    zoomGroup = svg.append('g')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .append('svg:g');

    treemap = d3.tree() //d3.cluster()
        .size([(height - margin), (width - margin)]);

    spatialView = d3.select('.tank');

}


export function drawDendrogram() {
    // if data is avaiable draw hierarchy clusters
    if (!$.isEmptyObject(networkHierarchy)) {

        // get the data and transform it
        let treeData = networkHierarchy[indexTime];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);
        // hide if no network is choosen

        if ($('#show-dendrogram').hasClass('active') === true) {
            // DATA JOIN - links (edges)
            let link = zoomGroup
                .selectAll('path.link')
                .data(nodes.descendants().slice(1));

            // ENTER
            link
                .enter()
                .append('path')
                .attr('class', 'link')
                .attr('d', diagonalLines);

            // Transition links to their new position.
            link
                .attr('d', diagonalLines);

            // EXIT
            link.exit()
                .remove();


            // DATA JOIN - nodes
            // adds each node as a group
            let node = zoomGroup
                .selectAll('.node')
                .data(nodes.descendants());

            var nodeEnter = node.enter()
                .append('g')
                .attr('class', function(d) {
                    return 'node' +
                        (d.children ? ' node--internal' : ' node--leaf');
                })
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

            // ENTER
            nodeEnter.append('circle')
                .attr('r', 20)
                .on('click', click);

            // UPDATE
            nodeEnter
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

            node
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });

            // EXIT
            node.exit()
                .remove();

        }
        // draw the hierarchy in spatial view
        drawHierarchy(nodes);
    }
}

function drawHierarchy(nodes) {
    // transform the hiearhcy fisrt into an array of arrays
    let root = nodes['children'][0];

    // let clusters1 = getHierarchyLevel();
    let tmp = getHierarchyLevel(root, 0, hierarchyLevels['h0']);

    // draw the hierarchy of hierarchy 0 first of all
    // TODO make modular so 4 hierarchies can be drawn for the first
    // afterwards n hierarchies

    // DATA JOIN - clusters for the convex hull
    let hieraryHulls = spatialView
        .selectAll('path.hierarchyHullPath')
        .data(getHierarchyVertices(tmp));

    // ENTER
    hieraryHulls
        .enter()
        .append('path')
        .attr('class', 'hierarchyHullPath')
        .attr('d', function(d) {
            return 'M' + d.join('L') + 'Z';
        });

    // Transition links to their new position.
    hieraryHulls
        .attr('d', function(d) {
            return 'M' + d.join('L') + 'Z';
        });
    // EXIT
    hieraryHulls.exit()
        .remove();

}


function diagonalLines(d) {
    return 'M' + d.x + ',' + d.y +
        'V' + d.parent.y + 'H' + d.parent.x;
}


function click(d) {

    console.log('Hey there');
    console.log(d['data']['name']);
}

function getHierarchyLevel(root, hierarchy, level) {
    let result = [];

    // second level of the array
    let tmp_nodes = root['children'];
    // iterate through the tree
    for (let i = 1; i < root['height']; i++) {
        // check if we are at the searched level
        if (tmp_nodes[0] && tmp_nodes[0]['depth'] === level) {
            // add each cluster to the result set
            tmp_nodes.forEach(function(node) {
                if (typeof node['data']['name'] !== 'undefined') {
                    result.push(node['data']['name']);
                }
            });
            break;
        }
        // get all children of a specific level in the tree
        let tmp = [];
        tmp_nodes.forEach(function(node) {
            if (typeof node['children'] !== 'undefined') {
                tmp = tmp.concat(node['children']);
            }
        });
        tmp_nodes = tmp;
    }
    return result;
}

function getHierarchyVertices(hierarchies) {
    let result = []; // result set
    hierarchies.forEach(function(cluster) {
        let vertices = []; // vertices of the clusters in the spatial view
        for (let j = 0; j < cluster.length; j++) {
            let groupMember = arrayAnimals.find(d => d['a'] === cluster[j]);
            if (groupMember) {
                vertices.push([groupMember['p'][0], -groupMember['p'][1]]);
            }
        }
        // Andrew montone chain algorithm reutrns for points fewer than 3 null
        // console.log(vertices);
        if (vertices.length >= 3) {
            result.push(d3.polygonHull(vertices));
        }
    });

    return result;
}

function setLevel() {
    console.log('hey');
}