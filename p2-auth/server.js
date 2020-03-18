const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000; // default port 8080

// Use cookies!
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

// logging to STDOUT
const morgan = require('morgan');

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'))
app.set("view engine", "ejs");

// APP LOGIC STARTS

// FAKE USER DB
const users = {
  "kv": { username: "kv", password: "123", firstName: "Khurram" },
  "al": { username: "al", password: "456", firstName: "Andy" }
};

// ROUTES

app.get("/", (req, res) => {
  res.render('home');
});

// Any user can view the treasure (as long as you are logged in)
app.get("/treasure", (req, res) => {
  // CHECK IF THE USER IS AUTHENTICATED
  const username = req.cookies.username // if undefined, they are not logged in
  if (username && users[username]) {
    // assume logged in
    res.render("treasure", { user: users[username] });
  } else {
    res.status(403).send('ACCESS NOT ALLOWED');
  }
  
});

// FORMS FOR AUTENTICATION
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

// AUTH POST ROUTES

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  // The above is same as doing this ...
  // const username = req.body.username;
  // const password = req.body.password;

  const user = users[username];

  if (user && user.password === password) {
    // SUCCESS - provided correct crendentials!
    // res.send('SUCCESS');
    res.cookie('username', username);
    res.redirect('/');
  } else {
    // FAIL - either the user was not found, or it was but the password didnt match
    res.send('FAIL');
  }

  console.log(user);

  res.send('yo');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
