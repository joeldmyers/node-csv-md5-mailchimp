var express = require('express');
var router = express.Router();
var csv = require("fast-csv");
var fs = require('fs');
var md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {

    var stream = fs.createReadStream("../update-to-active.csv");

    // creating string to put address hashes into
    var hashedAddresses = [];
    var hashedAddress = '';

    var csvStream = csv()
    .on("data", function(data){
        console.log(data[0]);
         console.log(md5(data[0]) + "\n");
        hashedAddress = md5(data[0]) + "\n";
         hashedAddresses += hashedAddress;
    })
    .on("end", function(){
        fs.writeFile('../hashed-addresses.csv', hashedAddresses, function(err) {
          if (err) return console.log(err);
        });
         console.log("done");
    });

    stream.pipe(csvStream);
    console.log('test');
    res.send('mailchimp');

  // OPEN CSV

  // FOREACH EMAIL

    // CONVERT TO LOWER CASE

    // COMPUTE MD5 HASH

    // SUBMIT PATCH REQUEST
    // e.g., https://us6.api.mailchimp.com/3.0/lists/bada47bbab/members/6df921a0eeb3266d9cb16f276c655e66

    // output response to make sure it went through ok
});

module.exports = router;
