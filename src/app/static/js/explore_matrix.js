/*eslint-disable no-unused-lets*/
/*global window, animalNameSpace, d3*/

'use strict';

/**
 * Add the Adjacency Matrix to the Matrix div
 */

animalNameSpace.initAdjacencyMatrix = function() {

    let self = this;
    let svgContainer;
    let rectWidth = 30;
    let margin = 50;

    // if there is only one animal return
    if (self.animal_ids.length <= 1) {
        return;
    }

    //the svg container
    svgContainer = d3.select('#matrix-vis')
        .classed('svg-container', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + (self.animal_ids.length * rectWidth + margin) + ' ' + (self.animal_ids.length * rectWidth + margin))
        // add the class svg-content
        .classed('svg-conten', true)
        .attr('id', 'main-matrix-svg');

    // organize the matrix data in a nice way
    let matrixData = [];
    for (let i = 0; i < self.animal_ids.length - 1; i++) {
        matrixData.push([]);
        for (let j = i + 1; j < self.animal_ids.length; j++) {
            matrixData[i].push({
                'node1': self.animal_ids[i],
                'node2': self.animal_ids[j]
            });
        }
    }

    // add a matrix group and  the whole matrix
    svgContainer.append('g')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .attr('id', 'adjacency-matrix')
        .selectAll('rect')
        .data(matrixData)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + (i * +rectWidth) + ',' + (i * +rectWidth + 5) + ')';
        })
        .attr('id', function(d) {
            return 'row-' + d[0]['node1'];
        }).selectAll('rect')
        .data(function(d) {
            return d;
        })
        .enter()
        .append('rect')
        .attr('class', 'matrix-cell')
        .attr('id', function(d) {
            return 'mc-' + d['node1'] + '-' + d['node2'];
        })
        .attr('width', rectWidth)
        .attr('height', rectWidth)
        .attr('x', function(d, i) {
            return i * rectWidth;
        })
        .attr('y', 0);

    // add the x-axis
    let tmpScale = d3.scalePoint().domain(self.animal_ids.slice(1)).range([rectWidth / 2, (self.animal_ids.length - 1) * rectWidth - rectWidth / 2], 1);

    let xAxis = d3.axisTop(tmpScale)
        .ticks(0)
        .tickSize(0)
        .tickPadding(0);
    svgContainer.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .call(xAxis)
        .selectAll('text').style('text-anchor', 'end').attr('transform', 'translate(-5,0) rotate(90)');

    // add the y-axis
    tmpScale = d3.scalePoint().domain(self.animal_ids.slice(0, -1)).range([rectWidth / 2, (self.animal_ids.length - 1) * rectWidth - rectWidth / 2], 1);

    let yAxis = d3.axisLeft(tmpScale)
        .ticks(0)
        .tickSize(0)
        .tickPadding(0);
    svgContainer.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin + ',' + margin + ')')
        .call(yAxis)
        .selectAll('text').style('text-anchor', 'end').attr('transform', 'translate(-5,5)');

};
