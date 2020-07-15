(async function() {
    const incomeData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/meidum_income.csv');
    const gdpData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/gdp_by_state.csv');
    const UnitedStateIncome = incomeData[0];
    const UnitedStateGdb = gdpData[0];
    //1997-2015
    const phase = [1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
    function generateIncomePhase(data, gdpData) {
        const result = new Array(phase.length);
        for (let i=0;i<phase.length;i++) {
            // if (!result['phase']) result['phase'] = new Array(phase.length);
            result[i] = {
                'year': phase[i],
                'income':  Number(data[phase[i]].split(',').join('')) / 1.852,
                'gdp': Number(gdpData[phase[i]].split(',').join('')),
            }
        }
        return result;
    }
    const USPhase = generateIncomePhase(UnitedStateIncome, UnitedStateGdb);

    function generateBarGraph(data,value,color,xx,yy,texts,labelx,labely) {
        var svg = d3.select("svg"),
        width = 600,
        height = 400;
        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + xx + "," + yy + ")");
            xScale.domain(data.map((d)=>d.year));
            yScale.domain([0, d3.max(data,(d)=>d[value])]);
            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr('id', `${value}-x`)
            .attr("y", height - 375)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Year");

            g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return "$" + d;
            }).ticks(10))
            .append("text")
            .attr('id', `${value}-y`)
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("value").text("Dollars");

             svg.append("text")
            .attr('id', `${value}-txt`)
            .attr("transform", `translate(${labelx},${labely})`)
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text(texts);

        g.selectAll("rect")
         .data(data)
         .enter().append("rect")
         .attr('class', value)
         .style("fill", color)
         .attr("x", function(d) { return xScale(d.year); })
         .attr("y", function(d) { return yScale(d[value]); })
         .attr("height", function(d) { return height - yScale(d[value]); })
         .transition()
         .duration(1200)
         .attr("width", xScale.bandwidth())
    }
    // generateBarGraph(USPhase,'income', '#69b3a2',100,120,'Medium Income chart', 230,20);
    // generateBarGraph(USPhase,'gdp', 'steelblue',800,120, 'GDP Per Person', 990,20);
    // d3.selectAll(`rect.income`).remove();
    // d3.select('#income-txt').remove();
    function generateUSMap() {
   var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var unemployment = d3.map();
var stateNames = d3.map();

var path = d3.geoPath();

var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(0, 10))
    .range(d3.schemeBlues[9]);

var g = svg.append("g")
    .attr("class", "key")
    .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Unemployment rate");

g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickFormat(function(x, i) { return i ? x : x + "%"; })
    .tickValues(color.domain()))
  .select(".domain")
    .remove();

var promises = [
  d3.json("https://d3js.org/us-10m.v1.json"),
  d3.tsv("https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/us_map.tsv", function(d) {
    stateNames.set(d.id, d.name)
  }),
  d3.tsv("https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/map.tsv", function(d) { 
    console.log("d in map", d);
    unemployment.set(d.name, +d.value); 
  })
]
console.log("before promises")
Promise.all(promises).then(ready)

function ready([us]) {
  console.log("in ready", topojson.feature(us, us.objects.states).features)
  console.log("statenames", stateNames)
  console.log("employment", unemployment)
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) { 
          console.log("d", d)
          console.log("unemployment", unemployment)
          var sn = stateNames.get(d.id)
          console.log("sn",sn)
          d.rate = unemployment.get(stateNames.get(d.id)) || 0
          console.log("rate", d.rate)
          var col =  color(d.rate); 
          console.log("col", col)
          if (col) {
            console.log("found col", col, "for d", d)
            return col
          } else {
            return '#ffffff'
          }
      })
      .attr("d", path)
    .append("title")
      .text(function(d) { 
    			console.log("title", d)
    			return d.rate + "%"; });

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}
    }
    generateUSMap();
})();
