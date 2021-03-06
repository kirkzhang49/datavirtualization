(async function() {
    const incomeData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/meidum_income.csv');
    const gdpData = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/gdp_by_state.csv');
    const UnitedStateIncome = incomeData[0];
    const UnitedStateGdb = gdpData[0];
    const populationState = await d3.csv('https://raw.githubusercontent.com/kirkzhang49/datavirtualization/master/population.csv');
    const populationDict = {};
    for (let population of populationState) {
        populationDict[population['state_or_territory']] = population['census_population_april_1_2010_number'];
    }
       let constState, constStateName,constateRate,type='vsGraph';
       let startYear = 1997,endYear = 2015;
    incomeData.forEach((d,index)=>console.log(d.State,index));
    const AlabamaIncome = incomeData[1];
    const AlabamaGdp = gdpData[1];
    const AlaskaIncome = incomeData[2];
    const AlaskaGdp = gdpData[2];
    const CaliforniaIncome = incomeData[5];
    const CaliforniaGdp = gdpData[5];
    const ColoradoIncome = incomeData[6];
    const ColoradoGdp = gdpData[6];
    const IndianaIncome = incomeData[15];
    const IndianaGdp = gdpData[15];
    const NewYorkIncome = incomeData[33];
    const NewYorkGdp = gdpData[33];
    const NorthDakotaIncome = incomeData[35];
    const NorthDakotaGdp = gdpData[35];

    //1997-2015
    const phase = [1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
    function generateIncomePhase(data, gdpData) {
        const result = new Array(phase.length);
        for (let i=0;i<phase.length;i++) {
            // if (!result['phase']) result['phase'] = new Array(phase.length);
            let income0 = (Number(data[phase[i]].split(',').join('')) / 1.852).toFixed(2);
            let gdp0 = Number(gdpData[phase[i]].split(',').join(''));
            result[i] = {
                'year': phase[i],
                'income': income0,
                'gdp': gdp0,
                'rate': ((gdp0/income0)*100).toFixed(2)
            }
        }
        return result;
    }
    const USPhase = generateIncomePhase(UnitedStateIncome,UnitedStateGdb);
    const AlabamaPhase = generateIncomePhase(AlabamaIncome,AlabamaGdp)
    const Arizona = generateIncomePhase(incomeData[3], gdpData[3]);
    const Arkansas = generateIncomePhase(incomeData[4], gdpData[4]);
    const CaliforniaPhase = generateIncomePhase(CaliforniaIncome, CaliforniaGdp);
    const Connecticut = generateIncomePhase(incomeData[7], gdpData[7]);
    const Delaware = generateIncomePhase(incomeData[8], gdpData[8]);
    const DC = generateIncomePhase(incomeData[9], gdpData[9]);
    const Florida = generateIncomePhase(incomeData[10], gdpData[10]);
    const Georgia = generateIncomePhase(incomeData[11], gdpData[11]);
    const Hawaii = generateIncomePhase(incomeData[12], gdpData[12]);
    const Idaho = generateIncomePhase(incomeData[13], gdpData[13]);
    const Illinois = generateIncomePhase(incomeData[14], gdpData[14]);
    const Iowa = generateIncomePhase(incomeData[16], gdpData[16]);
    const Kansas = generateIncomePhase(incomeData[17], gdpData[17]);
    const Kentucky = generateIncomePhase(incomeData[18], gdpData[18]);
    const Louisiana = generateIncomePhase(incomeData[19], gdpData[19]);
    const Maine = generateIncomePhase(incomeData[20], gdpData[20]);
    const Maryland = generateIncomePhase(incomeData[21], gdpData[21]);
    const Massachusetts = generateIncomePhase(incomeData[22], gdpData[22]);
    const Michigan = generateIncomePhase(incomeData[23], gdpData[23]);
    const Minnesota = generateIncomePhase(incomeData[24], gdpData[24]);
    const Mississippi = generateIncomePhase(incomeData[25], gdpData[25]);
    const Missouri = generateIncomePhase(incomeData[26], gdpData[26]);
    const Montana = generateIncomePhase(incomeData[27], gdpData[27]);
    const Nebraska = generateIncomePhase(incomeData[28], gdpData[28]);
    const Nevada = generateIncomePhase(incomeData[29], gdpData[29]);
    const NewHampshire = generateIncomePhase(incomeData[30], gdpData[30]);
    const NewJersey = generateIncomePhase(incomeData[31], gdpData[31]);
    const NewMexico = generateIncomePhase(incomeData[32], gdpData[32]);
    const NorthCarolina  = generateIncomePhase(incomeData[34], gdpData[34]);
    const Ohio = generateIncomePhase(incomeData[36], gdpData[36]);
    const Oklahoma = generateIncomePhase(incomeData[37], gdpData[37]);
    const Oregon = generateIncomePhase(incomeData[38], gdpData[38]);
    const Pennsylvania = generateIncomePhase(incomeData[39], gdpData[39]);
    const RhodeIsland = generateIncomePhase(incomeData[40], gdpData[40]);
    const SouthCarolina = generateIncomePhase(incomeData[41], gdpData[41]);
    const SouthDakota = generateIncomePhase(incomeData[42], gdpData[42]);
    const Tennessee = generateIncomePhase(incomeData[43], gdpData[43]);
    const Texas = generateIncomePhase(incomeData[44], gdpData[44]);
    const Utah = generateIncomePhase(incomeData[45], gdpData[45]);
    const Vermont = generateIncomePhase(incomeData[46], gdpData[46]);
    const Virginia = generateIncomePhase(incomeData[47], gdpData[47]);
    const Washington = generateIncomePhase(incomeData[48], gdpData[48]);
    const WestVirginia = generateIncomePhase(incomeData[49], gdpData[49]);
    const Wisconsin = generateIncomePhase(incomeData[50], gdpData[50]);
    const Wyoming = generateIncomePhase(incomeData[51], gdpData[51]);
    const AlaskaPhase = generateIncomePhase(AlaskaIncome,AlaskaGdp);
    const NorthDakotaPhase = generateIncomePhase(NorthDakotaIncome, NorthDakotaGdp);
    const ColoradoPhase = generateIncomePhase(ColoradoIncome, ColoradoGdp);
    const IndianaPhase = generateIncomePhase(IndianaIncome, IndianaGdp);
    const NewYorkPhase = generateIncomePhase(NewYorkIncome, NewYorkGdp);
    const includeStateNames = {
        'Alabama': AlabamaPhase,
        'Alaska': AlaskaPhase,
        'Iowa': Iowa,
        'Wyoming': Wyoming,
        'Wisconsin': Wisconsin,
        'West Virginia': WestVirginia,
        'Washington': Washington,
        'Virginia':Virginia,
        'Ohio':Ohio,
        'Vermont': Vermont,
        'Utah':Utah,
        'Texas': Texas,
        'Tennessee': Tennessee,
        'South Dakota':SouthDakota,
        'South Carolina':SouthCarolina,
        'Rhode Island': RhodeIsland,
        'Pennsylvania': Pennsylvania,
        'Oregon':Oregon,
        'Oklahoma': Oklahoma,
        'North Carolina':NorthCarolina,
        'New Mexico':NewMexico,
        'New Jersey':NewJersey,
        'New Hampshire':NewHampshire,
        'Nevada': Nevada,
        'Nebraska': Nebraska,
        'Montana': Montana,
        'Missouri': Missouri,
        'Mississippi': Mississippi,
        'Maryland': Maryland,
        'Minnesota': Minnesota,
        'Michigan': Michigan,
        'Massachusetts': Massachusetts,
        'Maine': Maine,
        'Louisiana': Louisiana,
        'Kentucky': Kentucky,
        'Kansas': Kansas,
        'Arizona': Arizona,
        'Illinois': Illinois,
        'Idaho':Idaho,
        'Arkansas': Arkansas,
        'California': CaliforniaPhase,
        'Connecticut':Connecticut,
        'Colorado': ColoradoPhase,
        'Delaware': Delaware,
        'D.C.': DC,
        'Florida': Florida,
        'Georgia': Georgia,
        'Hawaii': Hawaii,
        'North Dakota': NorthDakotaPhase,
        'Indiana': IndianaPhase,
        'New York': NewYorkPhase,
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
            let txtD = type === 'vsGraph' ? 'Dollars' : '%';
            g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                if (type==='vsGraph')
                return "$" + d;
                else return d + ' %'
            }).ticks(10))
            .append("text")
            .attr('id', `${value}-y`)
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("value").text(txtD);

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
           .on('mousemove', function(d){
            
            var html = "";
            let toolTxt = value == 'income' ? 'gdp' : 'income';
            let toolValue = value == 'income' ? d.gdp : d.income;
            if (type === 'vsGraph') {
            html += "<div class=\"tooltip_kv\">";
            html += "<span class=\"tooltip_key\">";
            html += `gdp/inc(${d.year}):`
            html += "</span>";
            html += "<span class=\"tooltip_value\">";
            html += ` ${d.rate}%`
            html += "";
            html += "</span>" + '<br/>';
            html += `<span>${toolTxt}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${toolValue}</span>`;
            html += "</div>";
            } else {
            html += "<div class=\"tooltip_kv\">";
            html += "<span class=\"tooltip_key\">";
            html += `gdp/inc(${d.year}):`
            html += "</span>";
            html += "<span class=\"tooltip_value\">";
            html += ` ${d.rate}%`
            html += "";
            html += "</span>" + '<br/>';
            html += `<span>$Incomes: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${d.income}</span><br/>`;
            html += `<span>$Gdp: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${d.gdp}</span>`;
            html += "</div>";
            }
            $("#tooltip-container").html(html);
            $(this).attr("fill-opacity", "0.8");
            $("#tooltip-container").show();
              var tooltip_width = $("#tooltip-container").width();
              d3.select("#tooltip-container")
                .style("top", (d3.event.layerY + 15) + "px")
                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");

            
      })
      .on('mouseout', function(){
        $(this).attr("fill-opacity", "1");
        $("#tooltip-container").hide();
      })
         .transition()
         .duration(1200)
         .attr("width", xScale.bandwidth())
    }

    function generateUSMap() {
                var svg = d3.select("body").append("svg").attr('width',1500).attr('height', 800);
   var width = +svg.attr("width"),
    height = +svg.attr("height");

             svg.append("text")
            .attr("transform", `translate(1000,50)`)
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text('US Unemployment Rate Map');

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
  .attr("transform", "translate(400,100)")
    .attr("class", "states-choropleth")
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
                d3.selectAll("svg").remove();
                initBarGraph(includeStateNames[sn], sn, d.rate);
            }
      })
      .style('stroke-width', (d)=> {
          return processId(d,5);
      })
      .style('stroke', (d)=> {
         return processId(d,'fuchsia');
      })
      .on('mousemove', function(d){
                      let id;
            if (d.id[0]==0) {
                id = d.id.substring(1);
            } else id = d.id;
            let currentId = '$' + id;
            var sn = stateNames[currentId];
            var populationState = populationDict[sn];
            var html = "";
  
            html += "<div class=\"tooltip_kv\">";
            html += "<span class=\"tooltip_key\">";
            html += sn
            html += "</span>";
            html += "<span class=\"tooltip_value\">";
            html += ` ${d.rate}%`
            html += "";
            html += "</span>" + '<br/>';
            html += `<span>Population:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${populationState}</span>`
            html += "</div>";
                
            $("#tooltip-container").html(html);
            $(this).attr("fill-opacity", "0.8");
            $("#tooltip-container").show();
            var map_width = $('.states-choropleth')[0].getBoundingClientRect().width;

              var tooltip_width = $("#tooltip-container").width();
              d3.select("#tooltip-container")
                .style("top", (d3.event.layerY + 15) + "px")
                .style("left", (d3.event.layerX - tooltip_width - 30) + "px");

            
      })
      .on('mouseout', function(){
        $(this).attr("fill-opacity", "1");
        $("#tooltip-container").hide();
      })


  svg.append("path").attr("transform", "translate(400,100)")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path)
}
    }

        // d3.selectAll(`rect.income`).remove();
    // d3.selectAll('path').remove();
// d3.selectAll("svg").remove();
function generateSubSence(state, stateName, rate,svginit) {
         $('.homeBTN').css('display', 'block');
         $('.textHint').css('display', 'block');
         $('.switchBTN').css('display', 'block');
        $('.inputField').css('display', 'block');
        $("#tooltip-container").css('display', 'none');
        $('.textAnnotation').css('display','none');
            svginit.append("text")
            .attr("transform", `translate(700,30)`)
            .attr("x", 50)
            .attr("y", 50)
            .attr('fill', 'olive')
            .attr("font-size", "30px")
            .text(`${stateName} Medium income vs GDP Rate`);
    let statePopulation = populationDict[stateName];
    const avgIncome = (state.reduce((a,c)=>a+Number(c.income),0)/state.length).toFixed(2);
    const avgGdp = (state.reduce((a,c)=>a+Number(c.gdp),0)/state.length).toFixed(2);
    const ratio = (avgGdp/avgIncome).toFixed(2);
        svginit.append("text")
        .attr("transform", `translate(540,760)`)
        .attr("x", 50)
        .attr("y", 50)
        .attr('fill', 'black')
        .attr('font-weight','bold')
        .attr("font-size", "28px")
        .text(`Avg Income: ${avgIncome}, Avg Gdp: ${avgGdp}, avg ratio:${ratio}`);

        svginit.append("text")
            .attr("transform", `translate(550,690)`)
            .attr("x", 50)
            .attr("y", 50)
            .attr('fill', 'black')
            .attr('font-weight','bold')
            .attr("font-size", "28px")
            .text(`State Population: ${statePopulation}, Unemployment Rate: ${rate}%`);
}
    function initBarGraph(state, stateName, rate) {
        state = includeStateNames[stateName].slice(startYear-1997,endYear-1997+1);
        constState=state;
        constStateName=stateName;
        constateRate=rate;
    var svginit = d3.select("body").append("svg").attr('width',1800).attr('height', 1100);
        generateSubSence(state, stateName, rate,svginit);
        if (type==='vsGraph') {
            generateBarGraph(state,'income', '#69b3a2',400,200,'Medium Income chart', 230,120, svginit);
            generateBarGraph(state,'gdp', 'steelblue',1100,200, 'GDP Per Person', 990,120, svginit);
        } else {
            generateBarGraph(state,'rate', '#ffae00',720,200,'GDP/inc Ratio', 610,120, svginit);
        }
    }
    function backMap() {
        d3.selectAll("svg").remove();
        $('.homeBTN').css('display', 'none');
        $('.textHint').css('display', 'none');
        $('.inputField').css('display', 'none');
        $('.switchBTN').css('display', 'none');
        $('.textAnnotation').css('display','block');
        generateUSMap();
    }
    function switchGraph() {
        d3.selectAll("svg").remove();
        type = type ==='vsGraph' ? 'ratioGraph' : 'vsGraph';
        if (type === 'vsGraph') {
            $('.switchBTN').text('Switch to Ratio Chart');
            $('.switchBTN').css('color','#ffae00');
        } else {
            $('.switchBTN').text('Switch to VS Chart');
             $('.switchBTN').css('color','steelblue');
        }
        initBarGraph(constState,constStateName,constateRate);
    }
    $('.homeBTN').click(backMap);
    $('.switchBTN').click(switchGraph);
    $('#startYear').change(() => {
        startYear = $('#startYear').val();
    });
    $('#endYear').change(() => {
        endYear = $('#endYear').val();
    });
    $('#changeYear').click(() => {
        if (startYear<1997||startYear>2015||endYear<1997||endYear>2015) {
            alert('the year enter muster between 1997 to 2015');
        }
        else {
            d3.selectAll("svg").remove();
            initBarGraph(constState,constStateName,constateRate);
        }
    });
        generateUSMap();

})();
