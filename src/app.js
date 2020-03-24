const express = require('express');
const path = require('path');
const hbs = require('hbs');
//require('./db/mongodb');

const app = express();
const port = process.env.PORT || 3000;


var firebase = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://ursa-deb5a.firebaseio.com"
});


const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../public/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'URSA',
    });
});

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Santiago Monleon',
        errorMessage: 'Page Not Found'
    });
});

app.listen(port, () => {
    console.log('Server has started on port ' + port);
});
