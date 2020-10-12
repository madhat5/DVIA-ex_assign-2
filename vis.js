// console.log('sim sim salabim');
// The svg
let svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
let projection = d3.geoMercator()
    .center([-100, 39]) // GPS of location to zoom on
    .scale(550) // This is like the zoom
    .translate([width / 2, height / 2])

// let checkMouse = function(obj){
//     console.log("D3 mouseOver" + obj.mouse(this));

//     return obj.mouse(this)[0] + 10
// }

// Load external data and boot÷…
$.getJSON("./data/cleanData.json", jsonData => {
    // console.log(jsonData[0].lat)
    console.log(jsonData[0].mag)
    
    let extent = d3.extent(jsonData);

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

        let size = d3.scaleOrdinal()
            .domain(jsonData) // What's in the data
            .range([5, 10]) // Size in pixel

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

        // =========
        // create a tooltip
        // let Tooltip = d3.select("#chart")
        //     .append("div")
        //         .attr("class", "tooltip")
        //         .style("opacity", 1)
        //         .style("background-color", "white")
        //         .style("border", "solid")
        //         .style("border-width", "2px")
        //         .style("border-radius", "5px")
        //         .style("padding", "5px")

        // // Three function that change the tooltip when user hover / move / leave a cell
        // let mouseover = (d) => {
        //     Tooltip.style("opacity", 1)
        // }
        // let mousemove = (d) => {
        //     Tooltip
        //         .html(d.place + "<br>" + "long: " + d.long + "<br>" + "lat: " + d.lat)
        //         .style("left", (d3.mouse(this)[0] + 10) + "px")
        //         .style("top", (d3.mouse(this)[1]) + "px")
        // }
        // let mouseleave = (d) => {
        //     Tooltip.style("opacity", 0)
        // }
        // =========  
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
                    return size(d.mag)
                })
                .style("fill", (d) => {
                    return color(d.magType)
                })
                .attr("stroke", (d) => {
                    return color(d.magType)
                })
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
                // .on("mouseover", mouseover)
                // .on("mousemove", mousemove)
                // .on("mouseleave", mouseleave)

                // This function is gonna change the opacity and size of selected and unselected circles
                // function update(){

                //     // For each check box:
                //     d3.selectAll(".checkbox").each(function(d){
                //     cb = d3.select(this);
                //     grp = cb.property("value")
            
                //     // If the box is check, I show the group
                //     if(cb.property("checked")){
                //         svg.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return size(d.size) })
            
                //     // Otherwise I hide it
                //     }else{
                //         svg.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
                //     }
                //     })
                // }
            
                // // When a button change, I run the update function
                // d3.selectAll(".checkbox").on("change",update);
            
                // // And I initialize it at the beginning
                // update()
    })
})