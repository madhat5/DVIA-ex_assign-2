// console.log('sim sim salabim');
// The svg
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
let projection = d3.geoMercator()
    .center([-100, 40]) // GPS of location to zoom on
    .scale(550) // This is like the zoom
    .translate([width / 2, height / 2])

// let checkMouse = function(obj){
//     console.log("D3 mouseOver" + obj.mouse(this));

//     return obj.mouse(this)[0] + 10
// }

// Load external data and boot÷…
$.getJSON("./data/cleanData.json", jsonData => {
    // console.log(jsonData[0].lat)
    // console.log(jsonData[0].mag)

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", (data) => {


        // --------------- //
        // DATA //
        // --------------- //
        // Filter data
        data.features = data.features.filter((d) => {
            // console.log(d.properties.name);
            return d.properties.name == "USA"
        })

        // --------------- //
        // SCALE AND MAP //
        // --------------- //
        // Create a color scale
        let color = d3.scaleOrdinal()
            .domain(jsonData)
            .range(d3.schemePaired)

        let valueExtent = d3.extent(jsonData, (d) => {
            return +d.mag;
        })
        // console.log(valueExtent);

        // let size = d3.scaleSqrt()
        let size = d3.scaleLinear()
            .domain(valueExtent) // What's in the data
            .range([0, 11]) // Size in pixel

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "grey")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "none")

        // --------------- //
        // TOOLTIP //
        // --------------- //
        // -1- Create a tooltip div that is hidden by default:
        // var tooltip = d3.select("#chart")
        //     .append("div")
        //     .style("opacity", 0)
        //     .attr("class", "tooltip")
        //     .style("background-color", "black")
        //     .style("border-radius", "5px")
        //     .style("padding", "10px")
        //     .style("color", "white")

        // // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
        // var showTooltip = (d) => {
        //     console.log("mouseover on", this);
        //     tooltip
        //         .transition()
        //         .duration(200)
        //     tooltip
        //         .style("opacity", 1)
        //         .html("Mag.: " + d.mag + "<br>" + "long: " + d.long + "<br>" + "lat: " + d.lat)
        //         .style("left", (d3.mouse(this)[0] + 30) + "px")
        //         .style("top", (d3.mouse(this)[1] + 30) + "px")
        // }
        // var moveTooltip = (d) => {
        //     tooltip
        //         .style("left", (d3.mouse(this)[0] + 30) + "px")
        //         .style("top", (d3.mouse(this)[1] + 30) + "px")
        // }
        // var hideTooltip = (d) => {
        //     console.log("mouseout", this);
        //     tooltip
        //         .transition()
        //         .duration(200)
        //         .style("opacity", 0)
        // }

        // --------------- //
        // CIRCLES //
        // --------------- //
        svg
            .selectAll("myCircles")
            .data(jsonData)
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                return projection([d.long, d.lat])[0]
            })
            .attr("cy", (d) => {
                return projection([d.long, d.lat])[1]
            })
            .attr("r", (d) => {
                // console.log(size(Math.abs(d.mag)))
                return size(Math.abs(d.mag))
            })
            .style("fill", (d) => {
                return color(d.magType)
            })
            .attr("stroke", (d) => {
                if (d.mag > 4) {
                    return "brown"
                } else {
                    return color(d.magType)
                }
            })
            .attr("stroke-width", 1)
            .attr("fill-opacity", .4)
        // .on("mouseover", showTooltip)
        // .on("mousemove", moveTooltip)
        // .on("mouseleave", hideTooltip)

        // --------------- //
        // TITLE //
        // --------------- //
        svg
            .append("text")
            .attr("text-anchor", "end")
            .style("fill", "brown")
            .attr("transform", "translate(130, 380)")
            .attr("width", 90)
            .html("Magnitude size > 4")
            .style("font-size", 14)
            .style('font-family', 'arial')

        // --------------- //
        // LEGEND //
        // --------------- //
        svg.append("g")
            .attr("class", "legendSize")
            .style('color', 'grey')
            .attr("transform", "translate(20, 300)");

        let sizeLegend = d3.legendSize()
            .scale(size)
            .shape('circle')
            .shapePadding(15)
            .labelOffset(20)
            .orient('horizontal');

        svg.select(".legendSize")
            .call(sizeLegend);

        svg.append("g")
            .attr("class", "legendOrdinal")
            .attr("transform", "translate(20,40)");

        let colorLegend = d3.legendColor()
            .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
            .shapePadding(10)
            //use cellFilter to hide the "e" cell
            .cellFilter((d) => {
                return d.label !== "e"
            })
            .scale(color);

        svg.select(".legendOrdinal")
            .call(colorLegend);

        // --------------- //
        // UPDATE //
        // --------------- //
        // This function is gonna change the opacity and size of selected and unselected circles
        function update() {
            // For each check box:
            d3.selectAll(".checkbox").each((d) => {
                cb = d3.select(this);
                grp = cb.property("value")
                console.log(cb)
                console.log(grp)

                // If the box is check, I show the group
                if (cb.property("checked")) {
                    console.log(cb.property)
                    // svg.selectAll("." + grp).transition().duration(1000).style("opacity", 1).attr("r", (d) => {
                    //     return size(d.mag)
                    // })

                    // Otherwise I hide it
                } else {
                    svg.selectAll("." + grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
                }
            })
        }

        // When a button change, I run the update function
        d3.selectAll(".checkbox").on("change", console.log('click'));

        // And I initialize it at the beginning
        update()
    })
})