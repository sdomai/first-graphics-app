import * as d3 from "d3";
// imports data
import annualTotals from "../_data/annual_totals";
// make charts reusable by putting it into a function
var createChart = (el, fieldname) => {
  // select a div by the id, select element county-homicides
  var container = d3.select(el);
  var margin = { top: 20, right: 20, bottom: 20, left: 40 };
  // ofset width; access width of that element by looking at the page
  var containerWidth = container.node().offsetWidth;
  var containerHeight = containerWidth * 0.66;

  // Chart width and height
  var chartWidth = containerWidth - margin.right - margin.left;
  var chartHeight = containerHeight - margin.top - margin.bottom;

  // give svg width and height based on width/height of container; responsive design
  var svg = container
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight);
  var g = svg
    .append("g")
    //  `  means you're going to use $ syntax
    .attr("transform", `translate(${margin.left}, ${margin.right})`);

  // create x and y domains
  // map= loop through item by item, then return one item to create a list
  //  => each dictionary is passed in and returned; year attributes
  // for each year, return that value
  var xDomain = annualTotals.map(d => d.year);
  // list of every year's homicide total
  var yMax = d3.max(annualTotals.map(d => d[fieldname]));
  // start at 0 because graph starts at 0
  var yDomain = [0, yMax];

  // create our scales
  var xScale = d3
    .scaleBand()
    //pass domain through
    .domain(xDomain)
    .range([0, chartWidth])
    //give bars some padding
    .padding(0.1);

  //linear scale for y
  var yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([chartHeight, 0]);

  // create 2 axes
  // want d3 to draw x scale on bottom of chart
  //.tickValues specify which x values we want to display on the chart
  var xAxis = d3.axisBottom(xScale).tickValues([2000, 2005, 2010, 2015, 2017]);
  // draw 4 lines on chart from left to right using chart width as scale
  var yAxis = d3
    .axisLeft(yScale)
    .tickSize(-chartWidth)
    .ticks(4);

  // svg that holds ticks and axes values
  // svg variable refers to g element
  g.append("g")
    .attr("class", "x axis")
    //reposition chart to make x axis on bottom of chart
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  g.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  //draw another g element to hold bars
  var bars = g.append("g").attr("class", "bars");

  // actually draw our bars
  bars
    // select all elements called bar and bind annualTotals to it
    // enter contains the amount of elements you want to draw; in this case 17
    // for each element that is entering, draw a rectangle, give it class = bar
    .selectAll(".bar")
    .data(annualTotals)
    .enter()
    .append("rect")
    .attr("class", "bar")
    // tell where and how to draw the bars; give bars attributes based on data
    // convert year to pixel value
    // for each element, apply this function
    // use data where bar should be drawn using d year
    .attr("x", d => xScale(d.year))
    //ex given 1000 homicides, what does y offset value want to draw
    .attr("y", d => yScale(d[fieldname]))
    //function that allows us to calculate how wide bars should be based on width of chart
    .attr("width", xScale.bandwidth())
    .attr("height", d => chartHeight - yScale(d[fieldname]));
};

createChart("#county-homicides", "homicides_total");
createChart("#harvard-park-homicides", "homicides_harvard_park");
