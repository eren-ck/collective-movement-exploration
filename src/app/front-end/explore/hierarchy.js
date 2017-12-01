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
let hierarchy_level_1 = [];

export function init_dendrogram() {
    let margin = 20,
        width = 5000,
        height = 5000;
    // animal_ids.length * 30
    let zoom = d3.zoom()
        .scaleExtent([1, 10])
        .on('zoom', function() {
            //constrained zooming
            // modify the translate so that it never exits the tank
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


export function draw_dendrogram() {
    // console.log(networkHierarchy);

    // console.log(networkHierarchy[indexTime]);
    // hide if no network is choosen
    if ($('#show-dendrogram').hasClass('active') === true && !$.isEmptyObject(networkHierarchy)) {
        // console.log('hey');
        // $('#dendrogram-vis').show();
        // if ($('#main-vis-div').attr('class') === 'col-md-12') {
        //     $('#main-vis-div').removeClass('col-md-12');
        //     $('#main-vis-div').addClass('col-md-8');
        // }


        let treeData = networkHierarchy[indexTime];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

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
            // .transition()
            // .duration(duration)
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
        //.transition()
        // .duration(duration)
        nodeEnter
            // .transition()
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });

        // .transition()
        // .duration(duration)
        node
            // .transition()
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
        // .style('opacity', 1);

        // .transition()
        // .duration(duration)
        // EXIT
        node.exit()
            .remove();

        // draw the hierarchy
        // transform the hiearhcy fisrt into an array of arrays
        // TODO something with hierary level should be done here
        for (let i = 0; i < hierarchy_level_1.length; i++) {
            //TODO change the hierarchy function here this is still on click
            let group = hierarchy_level_1[i];
            // get the positions in the spatial view for the whole cluster
            let vertices = [];
            for (let j = 0; j < group.length; j++) {
                let group_member = arrayAnimals.find(d => d['a'] === group[j]);
                if (group_member) {
                    vertices.push([group_member['p'][0], -group_member['p'][1]]);
                }
            }
            let hull = spatialView.append('path')
                .attr('class', 'hierarchyHullPath');
            console.log(vertices);
            hull
                .datum(d3.polygonHull(vertices))
                .attr('d', function(d) {
                    console.log(d);
                    return 'M' + d.join('L') + 'Z';
                });
        }


        // adds the text to the node
        // node.append('text')
        //     .attr('dy', '.35em')
        //     .attr('x', function(d) {
        //         return d.children ? -13 : 13;
        //     })
        //     .style('text-anchor', function(d) {
        //         return d.children ? 'end' : 'start';
        //     })
        //     .text(function(d) {
        //         return d.data.name;
        //     });


    }
    // else {
    // $('#dendrogram-vis').hide();
    // if ($('#main-vis-div').attr('class') === 'col-md-8') {
    //     $('#main-vis-div').removeClass('col-md-8');
    //     $('#main-vis-div').addClass('col-md-12');
    // }
    // }
}

function diagonalLines(d) {
    return 'M' + d.x + ',' + d.y +
        'V' + d.parent.y + 'H' + d.parent.x;


    // return 'M' + d.x + ',' + d.y +
    //     'C' + (d.x + d.parent.x) / 2 + ',' + d.y +
    //     ' ' + (d.x + d.parent.x) / 2 + ',' + d.parent.y +
    //     ' ' + d.parent.x + ',' + d.parent.y;
}

// Toggle children on click.
function click(d) {
    hierarchy_level_1.push(d['data']['name']);

    console.log('Hey there');
    console.log(hierarchy_level_1);
    // if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    // } else {
    //     d.children = d._children;
    //     d._children = null;
    // }
    // draw_dendrogram(d);
}