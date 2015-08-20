'use strict';

var svgWidth = 400,
    svgHeight = 600,
    tubeWidth = 50,
    tubeGap = 75,
    birdHeight = 30,
    birdWidth = 30,
    fallTime = 0.175,
    goUpTime = 0.25,
    rectSpawn = 1.5,
    rectTime = 5,
    rectSpeed = 5,
    bumpUp = 75;

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

//score
svg.append('text')
    .attr({
        'id': 'scoreCounter',
        'x': 10,
        'y': 20,
        'pointer-events': 'none',
        'font-family': 'sans-serif',
        'font-weight': 'bold',
        'font-size': '15px',
        'text-anchor': 'start',
        'fill': 'black'
    })
    .text('score: ');

//tap to start
var mainText = svg.append('text')
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
        'stroke-width': 2
    });

mainText.text('TAP TO START');

var id = 0;

var start = false;
var fall = false;

d3.select('html').on('click', function (){
    start = true;
    fall = true;
    mainText.text('');
    birdBump(bird);
    gravityPull(bird, flightHeight);
});

setInterval(function gameStarts() {
    id = id + 1;

    if (start === true) {
        appendTube();
        svg.select('#rect-' + (id - rectTime).toString()).remove();

    svg.selectAll('.tubeRectTop')
        .each(function (d) {
            if (this.x.baseVal.value <= ((svgWidth / 3) + birdWidth) && this.x.baseVal.value >= ((svgWidth / 3) - tubeWidth) && bird[0][0].y.baseVal.value <= this.height.baseVal.value)
                {
                    console.log('you lost - TOP');
                    mainText.text('GAME OVER');
                    d3.select('html').on('click', function (){});
                }
        });

    svg.selectAll('.tubeRectBot')
        .each(function (d) {
            if (this.x.baseVal.value <= ((svgWidth / 3) + birdWidth) && this.x.baseVal.value >= ((svgWidth / 3) - tubeWidth) && bird[0][0].height.baseVal.value >= this.y.baseVal.value)
                { console.log('you lost - BOT'); }
        });

    }
}, rectSpawn * 1000);

setInterval(function () {
    if (start === true && rectSpeed >= 1.25) { rectSpeed = rectSpeed - 0.15; }
}, 1500);

function appendTube() {

    var tubeHeight = 50,

        heightRandomizer = Math.floor(Math.random()*((svgHeight * 0.66) - (svgHeight * 0.33) + 1) + (svgHeight * 0.33)),

        rect = svg.append('g')
            .attr('id', function () { return 'rect-' + id.toString(); });

    //top tube
    rect.append('rect')
        .attr({
            'class': 'tubeRectTop',
            'x': svgWidth,
            'y': 0,
            'height': heightRandomizer - tubeGap,
            'width': tubeWidth,
            'fill': 'rgb(118,190,58)',
            'stroke-width': 2,
            'stroke': 'rgb(81,59,71)'
        });

    //bottom tube
    rect.append('rect')
        .attr({
            'class': 'tubeRectBot',
            'x': svgWidth,
            'y': heightRandomizer + tubeGap,
            'height': svgHeight - heightRandomizer + tubeGap*2,
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
        .duration(rectSpeed * 1000)
        .attr('x', function () { return -tubeWidth - 2; });
}

function gravityPull(bird, flightHeight) {
    flightHeight = bird[0][0].y.baseVal.value;

    if (fall === true && flightHeight < svgHeight - birdHeight) {

        bird.transition()
            .duration(fallTime * 1000)
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

    bird.attr('y', flightHeight - bumpUp);

    fall = true;

}
