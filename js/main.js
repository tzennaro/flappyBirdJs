var svgWidth = 400,
    svgHeight = 600,
    tubeWidth = 50,
    time = 5000;

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
    console.log(id);
    svg.select('#rect-' + (id - 5).toString()).remove();
}

setInterval('Timer()', 1500);

function appendTube () {

    var positionRandomizer = Math.random().toFixed(1);

    var rect = svg.append('rect')
        .attr({
            'x': svgWidth,
            'y': function () {
                if (positionRandomizer >= 0.5) { return 0; }
                else { return svgHeight - 10; }
            },
            'height': 10,
            'width': tubeWidth,
            'id': function () { return 'rect-' + id.toString(); },
            'fill': 'green'
        });

    moveRect(rect);

}

function moveRect(moveThing) {
    moveThing.transition()
        .ease('linear')
        .duration(time)
        .attr('x', function () { return -tubeWidth; });
}

