'use strict';

var svgWidth = 400,
    svgHeight = 600,
    tubeWidth = 50,
    birdHeight = 30,
    birdWidth = 30,
    fallTime = 4,
    goUpTime = 0.5,
    rectTime = 5,
    bumpUp = 100;

var svg = d3.select('#mainContainer')
    .append('svg')
    .attr({
        'width': svgWidth,
        'height': svgHeight
    });

var bird = svg.append('rect')
    .attr({
        'id': 'bird',
        'fill': 'red',
        'width': birdWidth,
        'height': birdHeight,
        'x': (svgWidth / 3) - (birdWidth / 2),
        'y': (svgHeight - birdHeight) / 2
    });

var flightHeight = bird[0][0].y.baseVal.value;

svg.append('text')
    .attr({
        'id': 'clickToStart',
        'x': svgWidth / 2,
        'y': svgHeight / 2,
        'pointer-events': 'none',
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'font-size': '30px',
        'text-anchor': 'middle',
        'fill': 'white',
        'stroke': 'black',
        'stroke-width': 1
    })
    .text('TAP TO START');

var id = 0;

var start = false;
var fall = false;

d3.select('html').on('click', function (){
    start = true;
    fall = true;
    birdBump(bird);
    gravityPull(bird, flightHeight);
});

setInterval(function gameStarts() {
    id = id + 1;

    if (start === true) {
        svg.select('#clickToStart').remove();
        appendTube();
        svg.select('#rect-' + (id - rectTime).toString()).remove();
    }
}, 1500);

//function checkBirdHeight() {
//    flightHeight = bird[0][0].y.baseVal.value;
//
//     gravityPull(bird, flightHeight); }
//};

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

function gravityPull(bird, flightHeight) {
    flightHeight = bird[0][0].y.baseVal.value;

    if (fall === true && flightHeight < svgHeight - birdHeight) {
        console.log(flightHeight + birdHeight);
        bird.transition()
            .duration(250)
            .ease('linear')
            .attr({
                'y': flightHeight + (birdHeight)
            })
            .each('end', function () {gravityPull(bird, flightHeight)});
    }
}

function birdBump(bird) {
    fall = false;

    flightHeight = bird[0][0].y.baseVal.value;

    bird.attr({
            'y': flightHeight - bumpUp
        });

    fall = true;

}
