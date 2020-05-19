const express = require('express');
const path = require('path');
const hbs = require('hbs');
const nStatic = require('node-static');
const fs =  require('fs');


const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const csvFiles = path.join(__dirname, '..public/CSV');
const viewsPath = path.join(__dirname, '../public/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'URSA',
    });
});

app.get('/downloads', (req, res) => {
    const dir = fs.opendirSync('./public/CSV');
    var dirent; var fileNames = [];
    while((dirent = dir.readSync()) !== null){
        fileNames.unshift(String(dirent.name));
    }
    dir.closeSync();
    
    res.render('download.hbs', {
        csvFiles: JSON.stringify(fileNames),
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About'
    });
});

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Santiago Monleon',
        errorMessage: 'Page Not Found',
    });
});

app.listen(port, () => {
    console.log('Server has started on port ' + port);
});
