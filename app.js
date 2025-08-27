const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const { title } = require('process');




app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>{

  fs.readdir(`./Files`, (err,files) => {
    res.render('index', {files: files});
  })
})

app.post('/create', (req, res) =>{

    const title = req.body.title.trim().split(' ').join('');
    const details = req.body.details.trim();

    if (!title || !details) {
      return res.redirect('/');
    }

    fs.writeFile(`./Files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
    res.redirect('/');
  } );
  
})

app.get('/Files/:fileName', (req, res) =>{

  fs.readFile(`./Files/${req.params.fileName}`,"utf-8", (err,data) => {
    res.render('show', {fileName: req.params.fileName, fileData: data});
  })
  
})

app.get('/edit/:fileName', (req, res) =>{

  fs.readFile(`./Files/${req.params.fileName}`,"utf-8", (err,data) => {
    res.render('edit', {fileName: req.params.fileName, fileData: data});
  })
})

app.post('/edit', (req, res) =>{
  fs.rename(`./Files/${req.body.previousName}`, `./Files/${req.body.newName}`, err => {
    res.redirect('/');
  })
})


app.listen(3000);