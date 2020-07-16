(async function() {
    const incomeData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/meidum_income.csv');
    const gdpData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/gdp_by_state.csv');
    const UnitedStateIncome = incomeData[0];
    const UnitedStateGdb = gdpData[0];
    // incomeData.forEach((d,index) => {
    //     console.log(d.State, index);
    // })
    gdpData.forEach((d,index) => {
        console.log(d[''],index);
    })
    const NorthDakotaIncome = incomeData[35];
    const NorthDakotaGdp = gdpData[35];
    const ColoradoIncome = incomeData[6];
    const ColoradoGdp = gdpData[6];
    const IndianaIncome = incomeData[15];
    const IndianaGdp = gdpData[15];
    const NewYorkIncome = incomeData[33];
    const NewYorkGdp = gdpData[33];
    const CaliforniaIncome = incomeData[5];
    const CaliforniaGdp = gdpData[5];
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
    const USPhase = generateIncomePhase(UnitedStateIncome,UnitedStateGdb);
    const NorthDakotaPhase = generateIncomePhase(NorthDakotaIncome, NorthDakotaGdp);
    const ColoradoPhase = generateIncomePhase(ColoradoIncome, ColoradoGdp);
    const IndianaPhase = generateIncomePhase(IndianaIncome, IndianaGdp);
    const NewYorkPhase = generateIncomePhase(NewYorkIncome, NewYorkGdp);
    const CaliforniaPhase = generateIncomePhase(CaliforniaIncome, CaliforniaGdp);
    const includeStateNames = {
        'North Dakota': NorthDakotaPhase,
        'Colorado': ColoradoPhase,
        'Indiana': IndianaPhase,
        'New York': NewYorkPhase,
        'California': CaliforniaPhase
    };
    function generateBarGraph(data,value,color,xx,yy,texts,labelx,labely,svg) {
        var width = 600,
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
                var svg = d3.select("body").append("svg").attr('width',1500).attr('height', 800);
   var width = +svg.attr("width"),
    height = +svg.attr("height");

var unemployment = d3.map();
var stateNames = d3.map();

    function processId(d, value) {
        let id;
        if (d.id[0]==0) {
            id = d.id.substring(1);
        } else id = d.id;
        let currentId = '$' + id;
        var sn = stateNames[currentId];
        if (includeStateNames[sn]) {
            return value;
        }
    }
var x = d3.scaleLinear()
    .domain([1, 10])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(0, 8))
    .range(d3.schemeBlues[8]);

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
    unemployment.set(d.name, +d.value); 
  })
]
Promise.all(promises).then(ready)

function ready([us]) {
    var path = d3.geoPath();

  svg.append("g")
  .attr("transform", "translate(200,50)")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("fill", function(d) {
          let id;
          if (d.id[0]==0) {
              id = d.id.substring(1);
          } else id = d.id;
          let currentId = '$' + id;
          var sn = stateNames[currentId];
          d.rate = unemployment['$'+ sn] || 0
          var col =  color(d.rate);
          if (col) {
            return col
          } else {
            return '#ffffff'
          }
      })
      .attr("d", path)
      .on('click', (d) => {
            let id;
            if (d.id[0]==0) {
                id = d.id.substring(1);
            } else id = d.id;
            let currentId = '$' + id;
            var sn = stateNames[currentId];
            if (includeStateNames[sn]) {
                console.log(sn);
                d3.selectAll("svg").remove();
                initBarGraph(includeStateNames[sn]);
            }
      })
      .style('stroke-width', (d)=> {
          return processId(d,5);
      })
      .style('stroke', (d)=> {
         return processId(d,'fuchsia');
      })
      .append("title")
      .text(function(d) { 
    			return d.rate + "%"; });

  svg.append("path").attr("transform", "translate(200,50)")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path)
}
    }
    generateUSMap();

        // d3.selectAll(`rect.income`).remove();
    // d3.selectAll('path').remove();
// d3.selectAll("svg").remove();
    function initBarGraph(state) {
    var svginit = d3.select("body").append("svg").attr('width',1500).attr('height', 800);
    generateBarGraph(state,'income', '#69b3a2',100,120,'Medium Income chart', 230,20, svginit);
    generateBarGraph(state,'gdp', 'steelblue',800,120, 'GDP Per Person', 990,20, svginit);
    }

})();
