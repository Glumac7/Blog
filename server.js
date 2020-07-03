const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const User = require('./models/Users');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

  app.post('/signup', (req, res, next) => {
    const { body } = req;
    const {password, firstName, lastName} = body;
    let {email} = body;
    
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({

      email: email

    }, (err, previousUsers) => {
      if (err) 
      {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } 
      else if (previousUsers.length > 0) 
      {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) 
        {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      })
    });
  }); // end of sign up endpoint


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