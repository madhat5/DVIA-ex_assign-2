# DVIA - Visualize Quantities, Categories, and Summarized Data

### Reqs
- Dataset: 
    > http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.phpz
- Choose one of the following live data sources (1-hour, 1-day, 7-day, or 30-day)
- Use *text, magnitude, time* to design a visualization that reflects *current earthquake activity* in terms of *magnitude and recency*. Consider quantitative differences in 1-hour, 1-day, 7-day, or 30-day data set
- (Optional: latitude and longitude, no world map necessary to this exercise)
- *Alternate dataset if you choose - Census data

============================================================

**Project Approach**
Answer project questions as you go along
1. Audience questions
2. Check + prep data (acquire, parse, filter)
3. Mine/explore/sketch/iterate several simple graphics, re: stories (same or diff?), pick one
4. Code initial draft (pseudo first?)
5. Refine/declutter/clean/annotate/clarify (color, labels, titles, legend, summary, etc)
6. Interactivity
7. Share

**Project Questions**
- Why are we doing this?
    - What are questions that you want to explore with this visualization?
- What are you hoping to achieve?
    - What will I be looking at(title)?
- Who are we targeting?
    - How is the end product going to be used?
    - How are we publishing?
*_____________________*
- What data do we have available? 
    - Which quantitative dataset is used? 
    - What are the properties of the data set? 
    - How many data points
    - What's the quality of the data? 
    - Which other existing materials should we take into account?
    - Which constraints do we have?
*_____________________*
- Which visualization method is used and why?
    - What does the visualization enable?
    - Is this a static visualization? Is it interactive?
    - color: Is it intentional and intuitive? data decodable by audience?
        - legends, annotations
            > https://d3-legend.susielu.com/
    - clear text hierarchy?
    - link to data?
    - links
        > https://www.data-to-viz.com/
        > https://www.d3-graph-gallery.com/
        > https://observablehq.com/@d3/gallery
*_____________________*
- Who else is doing something similar?
- Abstract/summary/about, re: methodolgy? (1-2 pars)
    - What were your considerations? 
    - What tools did you explore? 
    - What challenges did you run into? 
    - How did you iterate?

============================================================

**Project Concept**
1. Audience q's
    - where are earthquakes happening?
    - How large?
    - How often?
    - Hoping to provide audience with a mapped representation of earthquakes, for them to draw conclusions from re: earthquake activity
2. > http://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.phpz
3. Mine/explore
    - visual
        - maps
    - data
        - id
        - updated
        - lat
        - long
        - mag
        - magType?
        - place
4. code notes
    - setup chron job, every 24hrs visit site > hit links for each increment period (1, 7, 30)
    - sliders
        - setup horiz slider for interact
        - setup vert slider for magnitude
        - add all button for each
    - set switch for mag type?


============================================================
##### Refs
> https://www.d3-graph-gallery.com/
> https://python-graph-gallery.com/
> https://www.r-graph-gallery.com/
> https://bl.ocks.org/
> https://observablehq.com/@d3/bubble-map
> https://bost.ocks.org/mike/bubble-map/
> https://www.d3indepth.com/scales/
> https://d3-legend.susielu.com/