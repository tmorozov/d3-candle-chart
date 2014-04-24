function runChart(selector) {

  // [timeStamp, Open, High, Lo, Close, Volume]
  var barsData = {
    bars: [[1241150460000, 1.324445, 1.32464, 1.32443, 1.32448], [1241150520000, 1.324475, 1.324575, 1.324435, 1.32457], [1241150580000, 1.32456, 1.324645, 1.324485, 1.324645], [1241150640000, 1.324685, 1.32533, 1.324685, 1.32526], [1241150700000, 1.32528, 1.32535, 1.32489, 1.325145], [1241150760000, 1.32514, 1.32514, 1.32492, 1.324925], [1241150820000, 1.324915, 1.32492, 1.324895, 1.32491], [1241150880000, 1.3249, 1.32537, 1.3249, 1.325335], [1241150940000, 1.32523, 1.32537, 1.32507, 1.325305], [1241151000000, 1.325335, 1.32604, 1.325265, 1.325915], [1241151060000, 1.32593, 1.32602, 1.325255, 1.325455], [1241151120000, 1.325475, 1.325705, 1.324825, 1.32541], [1241151180000, 1.325345, 1.325725, 1.3252, 1.3252], [1241151240000, 1.32521, 1.32554, 1.325195, 1.32543], [1241151300000, 1.32543, 1.32543, 1.32468, 1.324715], [1241151360000, 1.32475, 1.32512, 1.32475, 1.32508], [1241151420000, 1.325085, 1.325085, 1.324955, 1.325], [1241151480000, 1.32499, 1.325015, 1.324455, 1.32459], [1241151540000, 1.324585, 1.324755, 1.324345, 1.32447], [1241151600000, 1.32449, 1.324505, 1.324355, 1.324355], [1241151660000, 1.324415, 1.324655, 1.32436, 1.324635], [1241151720000, 1.32461, 1.324615, 1.32453, 1.32453], [1241151780000, 1.324525, 1.324785, 1.324455, 1.324785], [1241151840000, 1.324805, 1.32506, 1.3248, 1.32501], [1241151900000, 1.32502, 1.325335, 1.325, 1.32532], [1241151960000, 1.325345, 1.32546, 1.325345, 1.325365], [1241152020000, 1.325355, 1.325355, 1.324875, 1.324875], [1241152080000, 1.324875, 1.32495, 1.324875, 1.32495], [1241152140000, 1.32498, 1.325005, 1.32458, 1.324675], [1241152200000, 1.32464, 1.32486, 1.32452, 1.32483], [1241152260000, 1.324855, 1.32501, 1.324845, 1.32498], [1241152320000, 1.325, 1.32532, 1.32499, 1.325315], [1241152380000, 1.32534, 1.32541, 1.32533, 1.325385], [1241152440000, 1.32539, 1.32539, 1.325245, 1.32538], [1241152500000, 1.325385, 1.32541, 1.325255, 1.325405], [1241152560000, 1.3254, 1.32541, 1.325355, 1.325355], [1241152620000, 1.325345, 1.325405, 1.325325, 1.325405], [1241152680000, 1.325465, 1.325585, 1.32541, 1.325415], [1241152740000, 1.32542, 1.325445, 1.32522, 1.325305], [1241152800000, 1.32535, 1.325645, 1.325345, 1.325475], [1241152860000, 1.325525, 1.326095, 1.325525, 1.325835], [1241152920000, 1.325845, 1.325845, 1.32567, 1.325845], [1241152980000, 1.32586, 1.326135, 1.325765, 1.32587], [1241153040000, 1.325845, 1.325845, 1.32545, 1.32551], [1241153100000, 1.325505, 1.325505, 1.32538, 1.325405], [1241153160000, 1.32543, 1.325575, 1.325355, 1.3255], [1241153220000, 1.325455, 1.325455, 1.32542, 1.32543], [1241153280000, 1.325425, 1.32543, 1.32542, 1.32543], [1241153340000, 1.325425, 1.325455, 1.32542, 1.325455], [1241153400000, 1.325475, 1.32549, 1.32541, 1.32543]]
  };

  var domain = { 
    x: [
      d3.min(barsData.bars, function(bar){ return bar[0]; }), 
      d3.max(barsData.bars, function(bar){ return bar[0]+60000; })    
    ],
    //d3.extent(barsData.bars, function(bar) { return bar[0]; }), 
    y: [ 
      d3.min(barsData.bars, function(bar){ return bar[3]; }), 
      d3.max(barsData.bars, function(bar){ return bar[2]; })
    ]
  };

  var margin = {top: 20, right: 20, bottom: 30, left: 40};
  var dimentions = { w: 960, h: 500 };

  var timeFormatter = d3.time.format("%Y-%m-%d %H:%M:%S");

  d3.select("button.js-reset")
    .on("click", reset);
  d3.select(window)
    .on("resize", update);
    
  init();
  update();
  
  var width;
  var height;
  var x; //scale  
  var y; //scale
  var xAxis; //axis controll
  var yAxis; //axis controll
  var zoom; //zoom behavior

  // graphic elements

  var chart;
    var canvas;
      var rect;
      var xAxisG;
      var yAxisG;

      var xCross;
      var yCross;

      var items;
        var bars;
        var lines;

  function initCross() {
    xCross = canvas.append("g")
      .attr("class", "x crosshair hidden");
    xCross.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("y2", 0);
    xCross.append("text")
      .attr("dx", "-0.35em")
      .attr("dy", "0.35em")
      .attr("text-anchor", "end");
    xCross.insert("rect", "text")
      .attr("x", -margin.left)
      .attr("y", -9)
      .attr("width", margin.left)
      .attr("height", "18px");

    yCross = canvas.append("g")
      .attr("class", "y crosshair hidden");
    yCross.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0);
    yCross.append("text")
      .attr("dy", "1.3em")
      .attr("text-anchor", "middle")
    yCross.insert("rect", "text")
      .attr("x", -60)
      .attr("width", 120)
      .attr("height", "18px")   
  }

  function initItems() {
    items = canvas.append("svg");
    bars = items.selectAll("rect")
      .data(barsData.bars);
    bars.enter()
      .append("rect")
      .attr("class", function(bar) {
        return bar[1] > bar[4] ? 'down' : 'up';
      });

    lines = items.selectAll("line.stem")
      .data(barsData.bars);
    lines.enter()
      .append("line")
      .attr("class", function(bar) {
        return bar[1] > bar[4] ? 'stem down' : 'stem up';
      });
  }

  function initScales() {
    // x = d3.scale.linear().domain(domain.x);
    x = d3.time.scale().domain(domain.x);
    y = d3.scale.linear().domain(domain.y).nice();

    xAxis = d3.svg.axis().orient("bottom");
    yAxis = d3.svg.axis().orient("left").ticks(5);

    var domainXdelta = domain.x[1] -domain.x[0];
    zoom = d3.behavior.zoom()
      .scaleExtent([0.2, 2])
      .xExtent([domain.x[0] - 2*domainXdelta , domain.x[1]])
      // .yExtent(domain.y)
      .on("zoom", zoomed);    
  }

  function initAxes() {
    xAxisG = canvas.append("g")
      .attr("class", "x axis");

    yAxisG = canvas.append("g")
      .attr("class", "y axis");
  }

  function initCanvas() {
    chart = d3.select(selector).append("svg");
    canvas = chart.append("g");
  }

  function init() {
    initScales();
    initCanvas();

    initAxes();
    initItems();
    initCross();

    rect = canvas.append("rect")
      .attr("class", "mouse");
  }

  function zoomed() {
    updateAxes();
    updateItems();
  }

  function updateItems() {
    items
      .attr("width", width)
      .attr("height", height);
    //-----
    bars
      .attr("x", function(bar) {
        return x(bar[0]);
      })
      .attr("y", function(bar) {
        return y(Math.max(bar[1], bar[4]));
      })
      .attr("height", function(bar) {
        var top = y(Math.max(bar[1], bar[4]));
        var bottom = y(Math.min(bar[1], bar[4]));
        return bottom-top;
      })
      .attr("width", function(bar) {
        var start = x(bar[0]);
        var end = x(bar[0]+60000);
        return end-start;
      })

    function lineX(bar) {
      var start = x(bar[0]);
      var end = x(bar[0]+60000);
      var barX = start + (end-start)/2;
      return barX;      
    }

    lines
      .attr("x1", lineX)
      .attr("x2", lineX)
      .attr("y1", function(bar){
        return y(bar[2])
      })
      .attr("y2", function(bar){
        return y(bar[3])
      });
    //-----

  }

  function updateCross() {
    xCross.select("line")
      .attr("x2", width);

    yCross.select("line")
      .attr("y2", height);
    yCross.select("text")
      .attr("y", height);
    yCross.select("rect")
      .attr("y", height);
  }

  function updateDimentions() {
    var el = d3.select(selector);
    dimentions.w = parseFloat(el.style("width"));
    dimentions.h = parseFloat(el.style("height"));

    width = dimentions.w - margin.left - margin.right,
    height = dimentions.h - margin.top - margin.bottom;
  }

  function updateScales() {
    x.range([0, width]);
    y.range([height, 0]);  

    xAxis.scale(x).tickSize(-height);
    yAxis.scale(y).tickSize(-width);
    zoom.x(x).y(y);    
  }

  function updateCanvas() {
    chart
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    canvas
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoom);

  }

  function updateAxes() {


    xAxisG
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    yAxisG.call(yAxis);
  }

  function update() {
    updateDimentions();

    updateScales();
    updateCanvas();
    updateAxes();
    updateItems();
    updateCross();

    rect
      .attr("width", width)
      .attr("height", height)
      .on("mousemove", onMousemove);    
  }

  function normalizeX(val) {
    var res = val;
    var domainX = x.invert(val);
    var arr = barsData.bars;
    var l = arr.length;
    for(var i=0; i<l; i++) {
      if(Math.abs(arr[i][0]-domainX) < 30000) {
        res = x(arr[i][0]+30000);
        break;
      }
    }
    return res;
  }

  function crossMove() {
    var p = d3.mouse(rect[0][0]);
    var valX = x.invert(p[0]);
    var valY = y.invert(p[1]);


    xCross
      .attr("transform","translate(0,"+p[1]+")")
    xCross.select("text")
      .text(valY.toFixed(5));


    yCross
      .attr("transform","translate("+normalizeX(p[0])+", 0)")
    yCross.select("text")
      .text(timeFormatter(valX));     
  }

  function onMousemove() {
    crossMove();   
  }


  function reset() {
    d3.transition().duration(750).tween("zoom", function() {
      var ix = d3.interpolate(x.domain(), domain.x),
        iy = d3.interpolate(y.domain(), domain.y);
      return function(t) {
        zoom.x(x.domain(ix(t))).y(y.domain(iy(t)));
        zoomed();
      };
    });
  }
}

runChart(".candle-chart");
