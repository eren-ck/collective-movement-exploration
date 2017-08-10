/*eslint-disable no-unused-lets*/
/*global window, animalNameSpace, d3, $*/

'use strict';

/**
 * Add the Adjacency Matrix to the Matrix div
 */

animalNameSpace.initAdjacencyMatrix = function() {

    let self = this;
    let svgContainer;
    let rectWidth = 30 ;
    let margin = 20;

    if(self.animal_ids.length <= 1){
        return;
    }


    //the svg container
    svgContainer = d3.select('#matrix-vis')
        .classed('svg-container', true)
        // to make it responsive with css
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 ' + (self.animal_ids.length*rectWidth+ margin) + ' ' + (self.animal_ids.length*rectWidth + margin))
        // add the class svg-content
        .classed('svg-content', true)
        .attr('id', 'main-matrix-svg');

        let matrixData = [];
        for(let i = 0; i<self.animal_ids.length-1;i++){
            matrixData.push([]);
            for(let j = i+1;j<self.animal_ids.length;j++){
                matrixData[i].push({
                    'node1':self.animal_ids[i],
                    'node2':self.animal_ids[j]
                });
            }
        }

        console.log(matrixData);

        svgContainer.append('g')
          .attr('transform', 'translate('+margin+','+margin+')')
          .attr('id', 'adjacency-matrix')
          .selectAll('rect')
          .data(matrixData)
          .enter()
          .append('g')
           .attr('transform', function(d,i){
                return 'translate(0,'+(i*+rectWidth+5)+')';
            })
            .attr('id', function(d){
                return 'row-' + d[0]['node1'];
            }).selectAll('rect')
            .data(function(d) { return d; })
            .enter()
          .append('rect')
          .attr('class','matrix-cell')
          .attr('id', function(d){
              return 'mc-'+d['node1']+'-'+d['node2'];
          })
          .attr('width', rectWidth)
          .attr('height', rectWidth)
          .attr('x', function (d,i) {
              return (self.animal_ids.length-2)*rectWidth - i*rectWidth;
          })
          .attr('y', 0);

        //   let tmpScale = d3.scaleOrdinal().domain(self.animal_ids).range([0,self.animal_ids.length*rectWidth],1);
        //  let xAxis = d3.axisTop.scale(tmpScale).tickSize(4);
        //  let yAxis = d3.axisLeft().scale(tmpScale).orient('left').tickSize(4);
        //  svgContainer.append('g').call(xAxis).selectAll('text').style('text-anchor', 'end').attr('transform', 'translate(-10,-10) rotate(90)');
        //  svgContainer.append('g').call(yAxis);
};
