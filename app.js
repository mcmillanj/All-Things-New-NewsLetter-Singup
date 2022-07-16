

const express = require("express");

const bodyParser = require('body-parser')
// const jsonParser = express.json()
const request = require("request");
const { Http2ServerRequest } = require("http2");
const { urlToHttpOptions } = require("url");
const https = require("https")
const app = express();






// app.use(jsonParser);
app.use(express.static('public'))
 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())





app.get("/", (req, res) => {
    
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    // if (firstName && lastName < 1) {
    //     res.sendFile(__dirname + "/failure.html");

    // }
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
            
        ]
    };
    var jsonData = JSON.stringify(data);
    const url="https://us17.api.mailchimp.com/3.0/lists/b66c9b7bd7"
    
        const options = {
            method: "POST",
             auth: "june:7f8f01859c2b4f1d3806aa50fb7abfdf"
      }  
    const request = https.request(url, options, function (response) {
      
        if (response.statusCode === 200) {
            
            res.sendFile(__dirname + "/success.html");
            
        } else {
            res.sendFile(__dirname + "/failure.html");
          }
        response.on(data, function(data) {
            console.log(JSON.parse.data);
         })
    })
    request.write(jsonData)
    request.end();
});

app.post('/failure', (req, res) => {
res.redirect("/")    
})

app.post('/success', (req, res) => {
    res.redirect("/")
})



app.listen(5000, () => {
    console.log("Server listening on port 5000")
})

// API KEY
// 7f8f01859c2b4f1d3806aa50fb7abfdf - us17
//list or  audience id: b66c9b7bd7