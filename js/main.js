'use strict';

var svgWidth = 400,
    svgHeight = 600,
    tubeWidth = 50,
    time = 5;

var svg = d3.select('#mainContainer')
    .append('svg')
    .attr({
        'width': svgWidth,
        'height': svgHeight
    });

var id = 0;

function Timer() {
    id = id + 1;

    appendTube();

    svg.select('#rect-' + (id - time).toString()).remove();
}

setInterval('Timer()', 1500);

function appendTube() {

    var tubeHeight = 50,

        positionRandomizer = Math.random().toFixed(1),

        rect = svg.append('g')
            .attr('id', function () { return 'rect-' + id.toString(); });

    //top tube
    rect.append('rect')
        .attr({
            'x': svgWidth,
            'y': 0,
            'height': tubeHeight,
            'width': tubeWidth,
            'fill': 'rgb(118,190,58)',
            'stroke-width': 2,
            'stroke': 'rgb(81,59,71)'
        });

    //bottom tube
    rect.append('rect')
        .attr({
            'x': svgWidth,
            'y': svgHeight - tubeHeight,
            'height': tubeHeight,
            'width': tubeWidth,
            'fill': 'rgb(118,190,58)',
            'stroke-width': 2,
            'stroke': 'rgb(81,59,71)'
        });

    moveRect(rect);

}

function moveRect(moveThing) {
    moveThing.selectAll('rect')
        .transition()
        .ease('linear')
        .duration(time * 1000)
        .attr('x', function () { return -tubeWidth - 2; });
}

