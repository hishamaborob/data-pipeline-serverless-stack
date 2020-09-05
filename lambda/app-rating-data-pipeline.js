const { format } = require('date-fns');
const addDays = require('date-fns/addDays');
const dataCollector = require("./data-collector");
const dataProcessor = require("./data-processor");
const dataStore = require("./data-store");
const https = require('https');
const host = 'api.apptweak.com';
const method = 'GET';
const key = 'pUHwX3lvYlbhP8jZ1mv1XzEUCMg';
const iosPath = '/ios/applications/568839295/ratings.json';
const androidPath = '/android/applications/com.xxxxx.android/ratings-history.json';

exports.handler = async function (event) {

    console.log("event:", JSON.stringify(event, undefined, 2));

    const currentDate = new Date(event.time);
    const currentDay = format(currentDate, 'yyyy-MM-dd');
    const past7DaysAgo = format(addDays(currentDate, -7), 'yyyy-MM-dd');

    console.log('call android collector - current data ');
    const androidCurrentData = await collectData(androidPath, currentDay, currentDay);

    console.log('call android collector - historical data ');
    const androidHistoricalData = await collectData(androidPath, past7DaysAgo, currentDay);

    console.log('call ios collector - current data ');
    const iosCurrentData = await collectData(iosPath, currentDay, currentDay);

    console.log('call ios collector - historical data ');
    const iosHistoricalData = await collectData(iosPath, past7DaysAgo, currentDay);

    const androidResults = processData('android', androidCurrentData.content.ratings, 
    androidHistoricalData.content.ratings, past7DaysAgo, currentDay);
    console.log('Android Results:', JSON.stringify(androidResults, undefined, 2));

    console.log('load android results to database');
    dataStore.store(androidResults);

    const iosResults =
        processData('ios', iosCurrentData.content.ratings, 
        iosHistoricalData.content.ratings, past7DaysAgo, currentDay);
    console.log('IOS Results:', JSON.stringify(iosResults, undefined, 2));

    console.log('load android results to database');
    dataStore.store(iosResults);
}

function processData(platform, currentData, historicalData, pastDate, currentDate) {

    const currentDataClean = dataProcessor.mapPlatform(currentData, platform)[0];
    const historicalDataClean = dataProcessor.mapPlatform(historicalData, platform);
    const historicalDataAggregated = dataProcessor.aggregate(historicalDataClean)[0];
    const dataDifference = dataProcessor.calculatePercentageDifference(
        historicalDataAggregated, currentDataClean, platform, pastDate, currentDate);
    return {
        currentRatings: currentDataClean,
        historicalRatings: historicalDataAggregated,
        ratingsDifference: dataDifference
    };
}

async function collectData(platformPath, startDate, endDate) {

    const data = await dataCollector.collect({
        http: https,
        options: {
            hostname: host,
            path: platformPath + '?start_date=' + startDate + "&end_date=" + endDate,
            method: method,
            headers: {
                'X-Apptweak-Key': key
            }
        }
    });
    console.log('data:', JSON.stringify(data, undefined, 2));
    return data;
}