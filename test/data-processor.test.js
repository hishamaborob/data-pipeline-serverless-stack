var chai = require('chai');
var expect = chai.expect;
const dataProcessor = require("../lambda/data-processor");

describe('Data Processor Test', () => {
    it('should map platform name and convert numbers', () => {
        var dataArray = [
            {
                "1": 3359,
                "2": 776,
                "3": 1008,
                "4": 6174,
                "5": 32313,
                "total": 43630,
                "avg": 4.451
            }
        ];
        var dataArrayMapped = dataProcessor.mapPlatform(dataArray, 'ios');
        expect(dataArrayMapped).to.eql([
            {
                platform: 'ios',
                one: 3359,
                two: 776,
                three: 1008,
                four: 6174,
                five: 32313
            }
        ])
    });
    it('should aggregate ratings and get averages', () => {
        var dataArray = [
            {
                platform: 'ios',
                one: 3359,
                two: 776,
                three: 1008,
                four: 6174,
                five: 32313
            },
            {
                platform: 'ios',
                one: 34223,
                two: 454,
                three: 45345,
                four: 4545,
                five: 6633
            }
        ];
        var dataAggregated = dataProcessor.aggregate(dataArray);
        expect(dataAggregated).to.eql([
            { "five": 19473, "four": 5360, "one": 18791, "platform": "ios", "three": 23177, "two": 615 }])
    });
    it('should calculate percentage difference', () => {
        var currentData = {
            platform: 'ios',
            one: 3359,
            two: 776,
            three: 1008,
            four: 6174,
            five: 32313
        };
        var historicalData = {
            platform: 'ios',
            one: 2359,
            two: 576,
            three: 208,
            four: 7174,
            five: 43313
        };
        var dataDifference =
            dataProcessor.calculatePercentageDifference(historicalData, currentData, 'ios', '2020-03-01', '2020-03-08');
        expect(dataDifference).to.eql({
            "currentDate": "2020-03-08", "fiveRating": "-25.40%",
            "fourRating": "-13.94%", "oneRating": "42.39%", "pastDate": "2020-03-01",
            "platform": "ios", "threeRating": "384.62%", "twoRating": "34.72%"
        })
    });
});