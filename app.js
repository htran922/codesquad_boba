/***************************************************************************
 * Author: Helen Tran
 * Date: June 10, 2019
 * Boba Quest Webpage 
 ***************************************************************************/

// brings express into our program
const express = require('express');
const path = require('path');
// make express use body parser on all requests
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// calls the returned object to create an Express application
const app = express();
// add port variable
const PORT = 3001;

const connectionUrl = 'mongodb+srv://boba123:boba123@cluster0-8zgup.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionUrl, {useNewUrlParser: true})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, 'public')));


// middleware
app.set('view engine', 'ejs');

// mongoose Schema
const cafeSchema = new mongoose.Schema ({
	name: String,
	add1: String,
	add2: String,
	city: String,
	state: String,
	zip: String,
	phone: String,
	web: String
});

var cafes = [
	{
		name: "Tea Do",
		add1: "8 Tyler St",
		add2: "Floor 2",
		city: "Boston",
		state: "MA",
		zip: "02111",
		phone: "(617) 988-8002",
		web: "http://teado.com"
	}
]

// mongoose Model
const Cafe = mongoose.model('Cafe', cafeSchema);

// WEBSITE HOME PAGE
app.get('/', (req, res) => {
    res.render('index')
});

// WEBSITE ABOUT PAGE
app.get('/about', (req, res) => {
	res.render('about');
});

// WEBSITE VIEW ALL CAFES PAGE
app.get('/cafes', (req, res) => {
	Cafe.find({}, (err, allCafes) => {
		if(err){
			console.log("Error in loading database");
		} else {
			res.render('cafes/index', {cafes: allCafes});
		}
	});
});

// GET NEW BOBA CAFE FORM
app.get('/cafes/new', (req, res) => { res.render('cafes/new') });

// CREATE NEW CAFE IN DATABASE
app.post('/cafes', (req, res) => {
	// save user input from request body into individual variables
	// var name = req.body.business-name;
	// var add1 = req.body.address-line-1;
	// var add2 = req.body.address-line-2;
	// var city = req.body.city;
	// var state = req.body.state;
	// var zip = req.body.zip;
	// var phone = req.body.phone;
	// var web = req.body.web-address;

	const newCafe = new Cafe ({
		name: business-name,
		add1: address-line-1,
		add2: address-line-2,
		city: city,
		state: state,
		zip: zip,
		phone: phone,
		web: web-address
	});

	cafes.push(req.body.newCafe);

	newCafe.save(function (err, myObject) {
		if (err) return console.error(err);
		console.log(myObject);
	})

});

// prints a log once the server starts listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})