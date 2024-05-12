const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');

let open;

import('open').then((open) => {
    const app = express();
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.get('/title1', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'title1.html'));
      });

    app.get('/login_error', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'login_error.html'));
      });

      app.get('/where_to_go', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'where_to_go.html'));
      });
  
      app.get('/signup_success', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_success.html'));
      });

      app.get('/signup_email_exists', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_email_exists.html'));
      });

      app.get('/signup_error', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_error.html'));
      });

      app.get('/groceries', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'groceries.html'));
      } );

      app.get('/house', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'house.html'));
      });

      app.get('/airport', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'airport.html'));
      });

      app.get('/metro', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'metro.html'));
      });

      app.get('/on_campus', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'on_campus.html'));
      });

      app.get('/other', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'other.html'));
      });

      app.get('/create_group', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'create_group.html'));
      });

    app.use(bodyParser.urlencoded({ extended: true }));
  
    // Serve static files from the "public" directory
    app.use(express.static(path.join(__dirname, 'public')));
  
    mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  
    const userSchema = new mongoose.Schema({
      full_name: String,
      email: String,
      password: String,
      confirm_password: String,
      mobile_number: String,
      dob: Date,
      city: String,
      group_name: String,
      start_point: String,
      Destination: String,
      strat_time: Date,
      date: Date,
      max_people: Number,
      user_email: String,
    });
  
    const User = mongoose.model('User', userSchema);
    const Groceries = mongoose.model('Groceries', userSchema);
    const House = mongoose.model('House', userSchema);
    const Airport = mongoose.model('Airport', userSchema);
    const Metro = mongoose.model('Metro', userSchema);
    const On_campus = mongoose.model('On_campus', userSchema);
    const Other = mongoose.model('Other', userSchema);
  
    app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup.html'));
      });
      
      app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'title1.html'));
      });
  
      app.post('/submit_signup', function(req, res) {
        console.log(req.body.City);
        if (req.body.password !== req.body.confirm_password) {
            res.redirect('/signup_error');
        } else {
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        res.redirect('/signup_email_exists');
                    } else {
                        const newUser = new User(req.body);
                        newUser.save()
                            .then(() => res.redirect('/signup_success'))
                            .catch(err => res.status(400).send('Unable to save to database'));
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Error occurred while checking for existing email');
                });
        }
    });

    app.post('/login', function(req, res) {
      console.log(req.body.checkbox);
      if (!req.body.checkbox) {
          res.redirect('/login_error');
      } else {
          User.findOne({ email: req.body.email })
              .then(user => {
                  if (user && user.password === req.body.password) {
                    res.cookie('user_email', user.email);
                    console.log(user.email);  
                    res.redirect('/where_to_go');
                  } else {
                      res.redirect('/login_error');
                  }
              })
              .catch(err => {
                  console.error(err);
                  res.status(500).send('Error occurred while checking for existing email');
              });
      }
  });

app.post('/select_type', function(req, res) {
    switch(req.body.button) {
        case 'Groceries':
            res.cookie('group', 'Groceries');
            res.redirect('/groceries');
            break;
        case 'House':
            res.cookie('group', 'House');
            res.redirect('/house');
            break;
        case 'Airport':
            res.cookie('group', 'Airport');
            res.redirect('/airport');
            break;
        case 'Metro':
            res.cookie('group', 'Metro');
            res.redirect('/metro');
            break;
        case 'On_campus':
            res.cookie('group', 'On_campus');
            res.redirect('/on_campus');
            break;
        case 'Other':
            res.cookie('group', 'other');
            res.redirect('/other');
            break;
        default:
            res.status(500).send('Error occurred while checking for existing email');
    }
});
app.post('/create_group', function(req, res) {
  
  res.redirect('/create_group.html');
});

app.post('/submit_group', function(req, res) {
  const groupName = req.cookies.group; // get the group name from the cookie
  const user_email = req.cookies.user_email;
  const newEntry = req.body; // get the new entry data from the form

  const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection

  const newGroup = new Group({
    ...newEntry,
    user_email: user_email
  }); // create a new group with the new entry and the user email

  newGroup.save() // save the new group to the database
    .then(() => res.redirect('/title1'))
    .catch(err => {
      console.error(err);
      res.status(500).send('Error occurred while adding new entry');
    });
});

app.post('/search_groups', function(req, res) {
  const groupName = req.cookies.group; // get the group name from the cookie
  const email = req.body.email;

  const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
  Group.find({ user_email: email }) // find all groups with the user email in the database
    .then(groups => {
      const out = groups.map(group => group.Destination);
      console.log(process.cwd()); // log the current working directory
      console.log(out); // log the out array
      fs.writeFileSync('search_results.txt', out.join('\n'));

    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error occurred while searching for groups');
    });
});

  
    app.listen(3000, function() {
      console.log('Server started on port 3000');
      open.default('http://localhost:3000/title1');
    });
  });