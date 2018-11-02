const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine', 'hbs')
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append server.log')
        }
    });
   next();
});
// app.use((req, res, next) => {
// res.render('maintainence.hbs')
// });
app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('UpperCase', (Text) => {
    return Text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs',{
       pageTitle:'HomePage',
       welcomeMessage: 'welcome HOME HBS RENDER',
    });
    // res.send('<h1>HELLO EXPRESS</h1>');
    // res.send({
    //     Name: 'KS REDDY',
    //     Likes:[
    //         'Biking', 'Photography', 'Exploring'
    //     ]
    // });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'ABOUT Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
    ErrorMessage:   'About Page Routing'
    });
});


// app.listen(3000,() => {
//     console.log('Server is up on port 3000')
// });


app.listen(3000);