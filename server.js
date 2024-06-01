const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

let open;

import('open').then((open) => {
    const app = express();
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    app.engine('html', require('ejs').renderFile);

    app.set('views', path.join(__dirname, 'public'));

    function checkLoggedIn(req, res, next) {
      if (req.cookies.loggedIn) {
          next();
      } else {
          res.redirect('/login_error');
      }
  }

    app.get('/login_error_terms', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'login_error_terms.html'));
      });

      app.get('/login_error_not_found', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'login_error_not_found.html'));
      });

      app.get('/login_error', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'login_error.html'));
      });

      app.get('/where_to_go', checkLoggedIn,  function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'where_to_go.html'));
      });
  
      app.get('/signup_success', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_success.html'));
      });

      app.get('/signup_email_exists', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_email_exists.html'));
      });

      app.get('/signup_error_email', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_error_email.html'));
      });

      app.get('/signup_error_password', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup_error_password.html'));
      });

      app.get('/create_group', checkLoggedIn,  function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'create_group.html'));
      });

      app.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'signup.html'));
      });
      
      app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
      });

      app.get('/groceries_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("groceries_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      app.get('/house_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("house_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      app.get('/airport_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("airport_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      app.get('/metro_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("metro_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      app.get('/on_campus_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("on_campus_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      app.get('/other_group', checkLoggedIn,  async function(req, res) {
        const groupName = req.cookies.group; // get the group name from the cookie
      
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
          const groups = await Group.find(); // find all documents in the collection
          res.render("other_group.html", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
          console.error(err);
          res.status(500).send('Error occurred while loading data');
        }
      });

      

    app.use(bodyParser.urlencoded({ extended: true }));
  
    // Serve static files from the "public" directory
    app.use(express.static(path.join(__dirname, 'public')));
  
    mongoose.connect('mongodb+srv://daniswayam3:RideShare@rideshare.grsdbio.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
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
    ig: String
  });

  const groupSchema = new mongoose.Schema({
      group_name: String,
      start_point: String,
      Destination: String,
      start_time: String,
      date: Date,
      max_people: Number,
      existing_people: { 
        type: Number, 
        default: 0 },
      user_email: String,
      mobile_number: String,
      user: [userSchema]
  });
  
    const User = mongoose.model('users', userSchema);
    const Groceries = mongoose.model('Groceries', groupSchema);
    const House = mongoose.model('House', groupSchema);
    const Airport = mongoose.model('Airport', groupSchema);
    const Metro = mongoose.model('Metro', groupSchema);
    const On_campus = mongoose.model('On_campus', groupSchema);
    const Other = mongoose.model('Other', groupSchema);

    
  
      app.post('/submit_signup', function(req, res) {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.edu)$/;
        if (req.body.password !== req.body.confirm_password) {
            res.redirect('/signup_error_password');
        } else if (!emailRegex.test(req.body.email)) {
            res.redirect('/signup_error_email');
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
      if (!req.body.checkbox) {
          res.redirect('/login_error_terms');
      } else {
          User.findOne({ email: req.body.email })
              .then(user => {
                  if (user && user.password === req.body.password) {
                    res.cookie('user_email', user.email);
                    res.cookie('loggedIn', true);
                    res.redirect('/where_to_go');
                  } else {
                      console.log('User not found');
                      res.redirect('/login_error_not_found');
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
            res.redirect('/groceries_group');
            break;
        case 'House':
            res.cookie('group', 'House');
            res.redirect('/house_group');
            break;
        case 'Airport':
            res.cookie('group', 'Airport');
            res.redirect('/airport_group');
            break;
        case 'Metro':
            res.cookie('group', 'Metro');
            res.redirect('/metro_group');
            break;
        case 'On_campus':
            res.cookie('group', 'On_campus');
            res.redirect('/on_campus_group');
            break;
        case 'Other':
            res.cookie('group', 'Other');
            res.redirect('/other_group');
            break;
        default:
            res.status(500).send('Error occurred while checking for existing email');
    }
});
app.post('/create_group', function(req, res) {
  
  res.redirect('/create_group.html');
});

app.post('/submit_group', async function(req, res) {
  const groupName = req.cookies.group; // get the group name from the cookie
  const user_email = req.cookies.user_email;
  const newEntry = req.body; // get the new entry data from the form

  const User = mongoose.model('users'); // get the Mongoose model for the users collection
  const Group = mongoose.model(groupName); // get the Mongoose model for the groupName

  try {
    const user = await User.findOne({ email: user_email }); // find the user in the User collection

    if (!user) {
      return res.status(500).send('Error occurred while searching for user');
    }

    console.log('User found');

    const newGroup = new Group({
      ...newEntry,
      user_email: user_email,
      user: user,
      existing_people: 1
    }); // create a new group with the new entry and the user email

    await newGroup.save(); // save the new group to the database

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error occurred while adding new entry');
  }
});

app.post('/search_groups', function(req, res) {});
  
app.get('/getInstagram/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOne({ full_name: name });
    if (user) {
      res.json({ instagram: user.ig });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
    app.listen(3000, function() {
      console.log('Server started on port 3000');
      open.default('http://localhost:3000/login');
    });
  });