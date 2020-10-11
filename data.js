// console.log('sim sim salabim');
/*
fetch
    - request? + csvtojson
        - From CSV File to JSON Array
            - https://www.npmjs.com/package/convert-csv-to-json
            - https://www.npmjs.com/package/csvtojson
        - Asynchronously process each line from csv url
            - do I need download.js? http://danml.com/download.html
        - https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv
        - https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv
        - https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv
    - setup daily cron job to hit URL?
        - https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/
    - transfer from downloads to /data if needed?

clean (parse, filter)
- fs writeFile JSON (from csv)
- keep only type = earthquake
- cols
    - id
    - updated
    - lat
    - long
    - mag
    - magType?
    - place
*/

// "use strict"

// const csv = require('csvtojson')
// let csvToJson = require('convert-csv-to-json');
const fs = require('fs');

// Data model
var dataModel = [{
    id: 'nn00777949',
    updated: '2020-10-09T16:14:53.709Z',
    lat: 39.8795,
    long: -118.406,
    mag: 1.1,
    magType: 'ml',
    place: '33 km S of Lovelock, Nevada'
}];

// CSV TO JSON
/*
let dayCSV = require('./data/all_day.csv');
let weekCSV = require('./data/all_week.csv');
let monthCSV = require('./data/all_month.csv');

let dayJson = require('./data/all_day.json');
let weekJson = require('./data/all_week.json');
let monthJson = require('./data/all_month.json');

csvToJson.generateJsonFileFromCsv(dayCSV,dayJson);
csvToJson.generateJsonFileFromCsv(weekCSV,weekJson);
csvToJson.generateJsonFileFromCsv(monthCSV,monthJson);
*/

// CLEAN JSON 
let dayJson = require('./data/all_day.json');
let weekJson = require('./data/all_week.json');
let monthJson = require('./data/all_month.json');

// clean data
let cleanData = [];

// build combine for each data set?

dayJson.forEach((el, i) => {
    // console.log(el)
    // console.log(i)

    cleanData.push({
        id: el.id,
        updated: el.updated,
        place: el.place,
        lat: el.latitude,
        long: el.longitude,
        mag: el.mag,
        magType: el.magType
    });
});

function writeFile(fsName, fsData) {
    fs.writeFileSync('data/' + fsName + '.json', JSON.stringify(fsData));
    console.log('*** *** *** *** ***');
    console.log('writeFile complete for', fsName);
};

writeFile('cleanData', cleanData);