const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
let open;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('view cache', false);

app.set('views', path.join(__dirname, 'public'));
  
mongoose.connect('mongodb+srv://daniswayam3:RideShare@rideshare.grsdbio.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('Connection error', err));

const userSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    password: String,
    confirm_password: String,
    mobile_number: String,
    college_name: String
  });

  const groupSchema = new mongoose.Schema({
    start_point: String,
    Destination: String,
    start_time: String,
    date: Date,
    max_people: Number,
    existing_people: { 
      type: Number, 
      default: 0 },
    type: String,
    user_data: [userSchema]
});

groupSchema.virtual('seats_remaining').get(function() {
    return this.max_people - this.existing_people;
  });

const user = mongoose.model('user', userSchema);
const groceries = mongoose.model('groceries', groupSchema);
const house = mongoose.model('house', groupSchema);
const airport = mongoose.model('airport', groupSchema);
const metro = mongoose.model('metro', groupSchema);
const on_campus = mongoose.model('on_campus', groupSchema);
const other = mongoose.model('other', groupSchema);

app.get('/', function(req, res) {
    res.render('index', {groups: []});
});

app.get('/login', function(req, res) {
    res.render('index', {groups: []});
});

app.post('/submit_signup', function(req, res) {
    console.log(req.body);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.edu)$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
    if (req.body.password !== req.body.confirmPassword) {
        res.send('Passwords do not match');
    } else if (!emailRegex.test(req.body.email)) {
        res.send('Invalid email');
    } else if (!passwordRegex.test(req.body.password)) {
        res.send('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    } else {
        user.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    res.send('Email already exists');
                } else {
                    const newUser = new user(req.body);
                    newUser.save()
                        .then(() => res.send('User added successfully'))
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
    console.log(req.body);
    user.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                if (user.password === req.body.password) {
                    res.cookie('user_email', user.email);
                    res.cookie('loggedIn', true);
                    res.send('Login successful');
                } else {
                    res.send('Incorrect password');
                }
            } else {
                res.send('User not found');
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error occurred while checking for existing email');
        });
});

app.post('/select_type', function(req, res) {
    const buttonValue = req.body.button;
    switch(buttonValue) {
        case 'Groceries':
            res.cookie('group', 'groceries');
            console.log('Groceries');
            res.status(200).send('Success');
            break;
        case 'House':
            res.cookie('group', 'house');
            console.log('House');
            res.status(200).send('Success');
            break;
        case 'Airport':
            res.cookie('group', 'airport');
            console.log('Airport');
            res.status(200).send('Success');
            break;
        case 'Metro':
            res.cookie('group', 'metro');o
            console.log('Metro');
            res.status(200).send('Success');
            break;
        case 'On_campus':
            res.cookie('group', 'on_campus');
            console.log('On_campus');
            res.status(200).send('Success');
            break;
        case 'Other':
            res.cookie('group', 'other');
            console.log('Other');
            res.status(200).send('Success');
            break;
        default:
            res.status(500).send('Error occurred while checking for existing email');
            return; // Stop the function here
    }
});

app.get('/select_group', async function(req, res) {
    const groupName = req.cookies.group; // get the group name from the cookie
    console.log(groupName);
  
        const Group = mongoose.model(groupName); // get the Mongoose model for the groupName collection
        try {
        const groups = await Group.find(); // find all documents in the collection
        res.render("index", {groups:groups}); // send the groups as a JSON response
        } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while loading data');
        }
  });

  app.post('/create_group', async function(req, res) {
    const groupName = req.body.group_type; // get the group name from the cookie
    const newEntry = req.body; // get the new entry data from the form
    const user_email = req.cookies.user_email; // get the user email from the cookie
  
    const Group = mongoose.model(groupName); // get the Mongoose model for the groupName
  
    try {
      const current_user = await user.findOne({ email: user_email }); // find the user in the User collection
  
      if (!current_user) {
        return res.send('Error occurred while searching for user');
      }
  
      console.log('User found');
  
      const newGroup = new Group({
        ...newEntry,
        user_email: user_email,
        user_data: current_user,
        existing_people: 1
      }); // create a new group with the new entry and the user email
  
      await newGroup.save(); // save the new group to the database
  
      res.send('Group created successfully');
    } catch (err) {
      console.error(err);
      res.send('Error occurred while adding new entry');
    }
  });

import('open').then((module) => {
    open = module.default;
  
    app.listen(3000, function() {
        console.log('Server started on port 3000');
        open('http://localhost:3000');
    });
  });