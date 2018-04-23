var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var path = require('path');
var Feed = require('rss-to-json');
var request = require('request');
var cheerio = require('cheerio');
var schedule = require('node-schedule');
var where = require('node-where');
var cities = require('cities');
var geoip = require('geoip-lite');

var getRemoteIP = function(request) {
    var ip = request.headers['x-forwarded-for'] ||
             request.connection.remoteAddress ||
             request.socket.remoteAddress ||             
             request.connection.socket.remoteAddress;
    return ip;
    }

app.use(express.static( __dirname + '/showers/dist' ));
app.use(express.static(path.join(__dirname, './static')));

app.get('/', function(req, res) {
})

// app.get('/test', function(req, res) {
//     // console.log(geoip.lookup(getRemoteIP(req)));
//     res.json({data: geoip.lookup(getRemoteIP(req))});
//     // where.is(req.body.city, function(err, result) {
//     //     if (result) {
//     //         console.log('result', result);
//     //       Feed.load('https://in-the-sky.org/rss.php?feed=meteors&latitude=' + result.attributes.lat + '&longitude=' + result.attributes.lng + '&timezone=America/Los_Angeles', function(err, rss){
//     //         // console.log(rss.items);   
//     //         request(rss.items[0].url, function(err, resp, html) {
//     //             if (!err){
//     //                 const $ = cheerio.load(html);
//     //                 res.json({long: result.attributes.lng, lat: result.attributes.lat, feed: rss, message: $('.newsbody').find('p').text()});
//     //           }
//     //         });
//     //     });
//     //     }
//     //   });
// })

app.post('/test', function(req, res) {
    var result = cities.zip_lookup(req.body.city);
    Feed.load('https://in-the-sky.org/rss.php?feed=meteors&latitude=' + result.latitude + '&longitude=' + result.longitude + '&timezone=America/Los_Angeles', function(err, rss){
    // console.log(rss.items);   
    request(rss.items[0].url, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            // Intro and basic info
            var introStr = $('.newsbody p:nth-child(1)').text();
            var introIdx = introStr.indexOf('.');
            var introStatement = introStr.slice(0, introIdx+1);
            var introAfter = introStr.slice(introIdx + 1);
            var introIdx2 = introAfter.indexOf('.');
            introStatement += introAfter.slice(0, introIdx2 + 1);
            // console.log(introStatement);

            // Rate per hour
            var hourStr = $('.newsbody p:nth-child(5)').text();
            var hourIdx = hourStr.indexOf('.');
            var hourStatement = hourStr.slice(0, hourIdx+1);
            // console.log(hourStatement);

            // Where to look
            var viewStr = $('.newsbody p:nth-child(6)').text();
            viewStr = viewStr.replace("(click to change)", "");
            viewStr = viewStr.replace(/\s*,\s*/g, ",").split(',').join(', ');
            // console.log(viewStr);
            res.json({long: result.longitude, lat: result.latitude, feed: rss.items, intro: introStatement, hour: hourStatement, view: viewStr});
        }
    });
});
})

app.post('/testanother', function(req, res) {
    var result = cities.zip_lookup(req.body.city);
    Feed.load('https://in-the-sky.org/rss.php?feed=meteors&latitude=' + result.latitude + '&longitude=' + result.longitude + '&timezone=America/Los_Angeles', function(err, rss){
    // console.log(rss.items);   
    request(rss.items[req.body.id].url, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            // Intro and basic info
            var introStr = $('.newsbody p:nth-child(1)').text();
            var introIdx = introStr.indexOf('.');
            var introStatement = introStr.slice(0, introIdx+1);
            var introAfter = introStr.slice(introIdx + 1);
            var introIdx2 = introAfter.indexOf('.');
            introStatement += introAfter.slice(0, introIdx2 + 1);
            // console.log(introStatement);

            // Rate per hour
            var hourStr = $('.newsbody p:nth-child(5)').text();
            var hourIdx = hourStr.indexOf('.');
            var hourStatement = hourStr.slice(0, hourIdx+1);
            // console.log(hourStatement);

            // Where to look
            var viewStr = $('.newsbody p:nth-child(6)').text();
            viewStr = viewStr.replace("(click to change)", "");
            viewStr = viewStr.replace(/\s*,\s*/g, ",").split(',').join(', ');
            // console.log(viewStr);

            // Get title and data of current meteor shower
            var titleStr = rss.items[req.body.id].title;
            var titleIdx = titleStr.indexOf(':');
            var dateStatement = titleStr.slice(0, titleIdx);
            var titleAfter = titleStr.slice(titleIdx + 1);
            var titleIdx2 = titleAfter.indexOf('r');
            var title = titleAfter.slice(0, -1);
            title += 'r';
            res.json({title: title, date: dateStatement, long: result.longitude, lat: result.latitude, feed: rss.items, intro: introStatement, hour: hourStatement, view: viewStr});
        }
    });
});
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./showers/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})
