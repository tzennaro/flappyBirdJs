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

var id = 0

function Timer () {
    id = id + 1;

    appendTube();

    svg.select('#rect-' + (id - time).toString()).remove();
}

setInterval('Timer()', 1500);

function appendTube () {

    var tubeHeight = 50;

    var positionRandomizer = Math.random().toFixed(1);

    var rect = svg.append('g')
        .attr('id', function () { return 'rect-' + id.toString(); });

    //top tube
    rect.append('rect')
        .attr({
            'x': svgWidth,
            'y': 0,
            'height': tubeHeight,
            'width': tubeWidth,
            'fill': 'green'
        });

    //bottom tube
    rect.append('rect')
        .attr({
            'x': svgWidth,
            'y': svgHeight - tubeHeight,
            'height': tubeHeight,
            'width': tubeWidth,
            'fill': 'green'
        });

    moveRect(rect);

}

function moveRect(moveThing) {
    moveThing.selectAll('rect')
        .transition()
        .ease('linear')
        .duration(time * 1000)
        .attr('x', function () { return -tubeWidth; });
}

