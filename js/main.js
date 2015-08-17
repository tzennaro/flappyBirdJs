'use strict';

var svgWidth = 400,
    svgHeight = 600,
    tubeWidth = 50,
    birdHeight = 30,
    birdWidth = 30,
    fallTime = 1,
    rectTime = 5;

var svg = d3.select('#mainContainer')
    .append('svg')
    .attr({
        'width': svgWidth,
        'height': svgHeight
    });

var bird = svg.append('rect')
    .attr({
        'fill': 'red',
        'width': birdWidth,
        'height': birdHeight,
        'x': (svgWidth / 3) - (birdWidth / 2),
        'y': (svgHeight - birdHeight) / 2
    });

svg.append('text')
    .attr({
        'id': 'clickToStart',
        'x': svgWidth / 2,
        'y': svgHeight / 2,
        'pointer-events': 'none',
        'font-family': 'sans-serif',
        'font-size': '30px',
        'text-anchor': 'middle',
        'fill': 'white',
        'stroke': 'black',
        'stroke-width': 1
    })
    .text('CLICK TO START');

var id = 0;

var start = false;

svg.on('click', function (){
    start = true;
});

function Timer() {
    id = id + 1;

    if (start === true) {
        svg.select('#clickToStart').remove();
        appendTube();
        gravityPull(bird);
        svg.select('#rect-' + (id - rectTime).toString()).remove();
    }
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
        .duration(rectTime * 1000)
        .attr('x', function () { return -tubeWidth - 2; });
}

function gravityPull(bird) {
    bird.transition()
        .ease('cubic-in')
        .duration(fallTime * 1000)
        .attr({
        'y': svgHeight - birdHeight
    });
}
