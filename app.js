const express = require('express');
var bodyParser = require('body-parser')
const { exec } = require("child_process");
const dotenv = require('dotenv');
const app = express();
// get config vars
dotenv.config();


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/create_account.html');
});


//Password reset Link generation
app.post('/create', urlencodedParser, (req, res) => {
    if(req.body.username.includes("@") || req.body.username.includes("/")){
        console.log('[' + new Date().toUTCString() + '] Invalid username');
        return res.status(500).send("<h4 style='text-align:center'>Please insert a username</h4>");
    }
    exec("../setup.sh email add " + req.body.username + "@" + process.env.DOMAIN + " " + req.body.password, function(err,stdout,stderr){
        console.log(stderr);
        if(stderr != ""){
            if(stderr.includes("already exists")){
                res.status(400).send("<h4 style='text-align:center; font-weight: bold; color: black;'>Error: this email account already exists</h4>");
                console.log('[' + new Date().toUTCString() + '] '+"Error while creating account of user", req.body.username+": The account already exists");
            }
            else{
                res.status(400).send("<h4 style='text-align:center; font-weight: bold; color: black;'>There was an error while creating the account</h4>");
                console.log('[' + new Date().toUTCString() + '] '+"Error while creating account of user", req.body.username);
            }
        }
        else{
            var output = "<h4 style='text-align:center; font-weight: bold; color: black;'>Account "
            + req.body.username + "@" + process.env.DOMAIN + " created. Get a mail client to use your new account immediately.</h4>"
            + "<h4 style='text-align:center; font-weight: bold; color: black;'>Put these credentials into your mail client</h4>"
            + "<p style='text-align:center; color: black;'>SMTP <br>Server name: "+ process.env.SMTP + 
            "<br>Ports: "+ process.env.SMTP_PORTS +"<br>Connection security: "+ process.env.SMTP_SEC + 
            "<br>Username: " + req.body.username + "@" + process.env.DOMAIN + "<br>Password: [your_password]</p>"
            
            + "<p style='text-align:center; color: black;'>IMAP <br> Server name: "+ process.env.IMAP + "<br>Ports: " + process.env.IMAP_PORTS + " <br>Connection security: " + 
            process.env.IMAP_SEC + "<br>Username: " + req.body.username + "@" + process.env.DOMAIN + "<br>Password: [your_password]</p>";

            res.status(200).send(output);
            console.log('[' + new Date().toUTCString() + '] '+"Created user", req.body.username);
        }
    });
})


app.listen(process.env.PORT);
console.log('[' + new Date().toUTCString() + '] Server started, listening to',process.env.PORT);