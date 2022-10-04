const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');
// const allRouter = require("./routes/routes");

const app = express();
// set port, listen for requests

const PORT = 5000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Harneet' });
});

// getting all routes
// app.use("/", allRouter);

// create the get request
app.get('/api/current/:city', cors(), async(req, res) => {
  // request from user for city name
  const cityName = req.params.city;
  console.log("cityName", cityName)

  // setting url according to user input city name
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  console.log("URL is", url)

  await fetch(url)
  .then((response) => { 
    // console.log(response)
    if (response.ok) { // Checks server response (if there is one) 
        return response.json();
    } else {
        res.send("Wrong City")
    }})
  .then(data => 
    {
        res.send(data)
    }) 
  })

app.get('/api/users', cors(), async (req, res) => {
    try {
      const { rows: users } = await db.query('SELECT * FROM users');
      res.send(users);
    } catch (e) {
      console.log(e)
      return res.status(400).json({ e });
    }
  });

app.get('/api/users/:email', cors(), async (req, res) => {
  const emailCheck = req.params.email
  console.log("check email" , emailCheck)
    try {
      const { rows: users } = await db.query('SELECT * FROM users WHERE email=$1' ,[emailCheck]);
  // setting url according to user favorite city name
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${users[0].favorite_city}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  console.log("URL is", url)

  await fetch(url)
  .then((response) => { 
    // console.log(response)
    if (response.ok) { // Checks server response (if there is one) 
        return response.json();
    } else {
        res.send("Wrong City")
    }})
  .then(data => 
    {
        res.send(data)
    }) 

    } catch (e) {
      console.log(e)
      return res.status(400).json({ e });
    }
  });

// create the POST request
app.post('/api/users', cors(), async (req, res) => {
  const newUser = {email: req.body.email, favorite_city: req.body.favorite_city}
  console.log([newUser.email, newUser.favorite_city]);

  const result = await db.query(
    'INSERT INTO users(email, favorite_city) VALUES($1, $2) RETURNING *',
    [newUser.email, newUser.favorite_city],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});


// delete request
app.delete('/api/users/:deleteEmail', cors(), async (req, res) => {
  const deleteEmail = req.params.deleteEmail;

  console.log("Delete City Name " ,deleteEmail);
  try {
    await db.query("DELETE FROM users WHERE email=$1", [deleteEmail]);
    res.send({ status: "success" });
    } catch (e) {
      console.log(e)
    return res.status(400).json({ e });
    }
    })

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
