const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

app.use(express.urlencoded({  extended: true  }));

//Used this to authorize communication between two ports
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//connect to mongoDB
const dbURI = 'mongodb+srv://glumac:test123@cluster0-xsmdw.mongodb.net/blogDb?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = 5000;

    app.listen(port, () => `Server running on port ${port}`);

    console.log("connected to the database!");
  })
  .catch((err) => {console.log(err);
  });

/*app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my great blog'
  })

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
})*/

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('http://localhost:3000');
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

/*
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});*/