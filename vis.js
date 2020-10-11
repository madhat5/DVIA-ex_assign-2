// console.log('sim sim salabim');
// The svg
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
let projection = d3.geoMercator()
    .center([-100, 40]) // GPS of location to zoom on
    .scale(500) // This is like the zoom
    .translate([width / 2, height / 2])


    
// Load external data and boot÷…
$.getJSON("./data/cleanData.json", jsonData => {
    // console.log(jsonData[0].lat)

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", (data) => {

        // Filter data
        data.features = data.features.filter((d) => {
            // console.log(d.properties.name);
            return d.properties.name == "USA"
        })

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
            .attr("r", 14)
            .style("fill", "69b3a2")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 3)
            .attr("fill-opacity", .4)
    })
})