const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000; // default port 8080

const cookieParser = require('cookie-parser');
app.use(cookieParser()); // add middleware

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // if user prefers en render english.ejs
  // else if user prefers fr render french.ejs
  // else render home (choice)
  if (req.cookies.lang === 'en') {
    res.render('english');
  } else if (req.cookies.lang === 'fr') {
    res.render('french');
  } else {
    res.render('home');
  }
  
});

// This should be a POST but I'm being lazy. 
// Why: because this a state change even though I'm not updating my db
app.get("/lang/en", (req, res) => {
  // Set the cookie lang to en
  res.cookie('lang', 'en');
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
