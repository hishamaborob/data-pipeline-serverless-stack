var alasql = require('alasql');
// data mapping and aggregation
module.exports = {
    mapPlatform, aggregate, percentageDifference, calculatePercentageDifference
}
function mapPlatform(dataArray, platformName) {

    return dataArray.map(r => ({
        platform: platformName,
        one: r['1'],
        two: r['2'],
        three: r['3'],
        four: r['4'],
        five: r['5']
    }));
}

function aggregate(dataArray) {

    return alasql(
        'SELECT platform, ROUND(AVG(one), 0) AS one, ROUND(AVG(two), 0) AS two, ' +
        'ROUND(AVG(three), 0) AS three, ROUND(AVG(four), 0) AS four, ROUND(AVG(five), 0) AS five FROM ? ' +
        'GROUP BY platform', [dataArray]);
}

function calculatePercentageDifference(historicalData, currentNumberData, platform, pastDate, currentDate) {

    return {
        platform: platform,
        pastDate: pastDate,
        currentDate: currentDate,
        oneRating: percentageDifference(historicalData.one, currentNumberData.one),
        twoRating: percentageDifference(historicalData.two, currentNumberData.two),
        threeRating: percentageDifference(historicalData.three, currentNumberData.three),
        fourRating: percentageDifference(historicalData.four, currentNumberData.four),
        fiveRating: percentageDifference(historicalData.five, currentNumberData.five)
    };
}

function percentageDifference(historicalNumber, currentNumber) {
    var num = (currentNumber - historicalNumber) / historicalNumber * 100;
    return num.toFixed(2) + "%";
}