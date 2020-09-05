// http client to collect app rating
module.exports = {
    collect
}
function collect(event) {

    return new Promise((resolve, reject) => {
        const req = event.http.request(event.options, res => {

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`statusCode: ${res.statusCode}`));
            }

            var jsonBody = {};
            res.on('data', body => {
                jsonBody = JSON.parse(body);
            });
            res.on('end', () => resolve(jsonBody));
        });

        req.on('error', reject);
        req.end();
    });
}