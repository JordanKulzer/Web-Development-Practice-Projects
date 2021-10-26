const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const units = "imperial"
    const apiKey = "5712a4027adc765b793055e2cd71894a#";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descr = weatherData.weather[0].description;
            const feels = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather in " + query + " is currently " + descr + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.write("<h1>The Temperature in " + query + " is " + temp + " degrees Fahrenheit.</h1>");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("Server running on port 3000.");
})