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

        // Filter data
        data.features = data.features.filter((d) => {
            // console.log(d.properties.name);
            return d.properties.name == "USA"
        })

        // Create a color scale
        let color = d3.scaleOrdinal()
            .domain(jsonData)
            .range(d3.schemePaired)

        var valueExtent = d3.extent(jsonData, (d) => {
            return +d.mag;
        })
        // console.log(valueExtent);

        // let size = d3.scaleSqrt()
        let size = d3.scaleLinear()
            .domain(valueExtent) // What's in the data
            .range([0, 25]) // Size in pixel

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

        // Add circles:
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

        // --------------- //
        // TITLE //
        // --------------- //
        svg
            .append("text")
            .attr("text-anchor", "end")
            .style("fill", "brown")
            .attr("transform", "translate(130, 360)")
            .attr("width", 90)
            .html("Magnitude size > 4")
            .style("font-size", 14)
            .style('font-family', 'arial')

        // --------------- //
        // LEGEND //
        // --------------- //
        svg.append("g")
            .attr("class", "legendSize")
            .attr("transform", "translate(20, 280)");

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
            .attr("transform", "translate(20,20)");

        var colorLegend = d3.legendColor()
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
        // UPDATE GROUP SELECT //
        // --------------- //
        // This function is gonna change the opacity and size of selected and unselected circles
        function update() {

            // For each check box:
            d3.selectAll(".checkbox").each((d) => {
                cb = d3.select(this);
                grp = cb.property("value")

                // If the box is check, I show the group
                if (cb.property("checked")) {
                    svg.selectAll("." + grp).transition().duration(1000).style("opacity", 1).attr("r", (d) => {
                        return size(d.mag)
                    })

                    // Otherwise I hide it
                } else {
                    svg.selectAll("." + grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
                }
            })
        }

        // When a button change, I run the update function
        d3.selectAll(".checkbox").on("change", update);

        // And I initialize it at the beginning
        update()
    })
})