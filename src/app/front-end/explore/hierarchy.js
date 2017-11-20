/*eslint-disable no-unused-lets*/
/*global window,$, d3*/
// import * as spv from './spatial_view.js';

import {
    networkHierarchy
} from './explore.js';

import {
    indexTime
} from './spatial_view/spatial_view';

let margin = {
        top: 20,
        right: 90,
        bottom: 30,
        left: 90
    },
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

export function draw_dendrogram() {
    // console.log(networkHierarchy);

    // console.log(networkHierarchy[indexTime]);
    // hide if no network is choosen
    if (!$.isEmptyObject(networkHierarchy)) {
        $('#dendrogram-vis').show();

        let treemap = d3.tree()
            .size([height, width]);

        let treeData = networkHierarchy[indexTime];
        let nodes = d3.hierarchy(treeData, function(d) {
            return d.children;
        });

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = d3.select('#dendrogram-vis').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom),
            g = svg.append('g')
            .attr('transform',
                'translate(' + margin.left + ',' + margin.top + ')');

        // adds the links between the nodes
        let link = g.selectAll('.link')
            .data(nodes.descendants().slice(1))
            .enter().append('path')
            .attr('class', 'link')
            .attr('d', function(d) {
                return 'M' + d.y + ',' + d.x +
                    'C' + (d.y + d.parent.y) / 2 + ',' + d.x +
                    ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x +
                    ' ' + d.parent.y + ',' + d.parent.x;
            });

        // adds each node as a group
        let node = g.selectAll('.node')
            .data(nodes.descendants())
            .enter().append('g')
            .attr('class', function(d) {
                return 'node' +
                    (d.children ? ' node--internal' : ' node--leaf');
            })
            .attr('transform', function(d) {
                return 'translate(' + d.y + ',' + d.x + ')';
            });

        // adds the circle to the node
        node.append('circle')
            .attr('r', 10);

        // adds the text to the node
        node.append('text')
            .attr('dy', '.35em')
            .attr('x', function(d) {
                return d.children ? -13 : 13;
            })
            .style('text-anchor', function(d) {
                return d.children ? 'end' : 'start';
            })
            .text(function(d) {
                return d.data.name;
            });


    } else {
        $('#dendrogram-vis').hide();
    }
}
