const events = require('../controllers/events.js')
const partnerships = require('../controllers/partnerships.js')
const places = require('../controllers/places.js')
const users = require('../controllers/users.js')

module.exports = function(app) {

app.get('/data/users', function(req, res) {
	users.showUsers(req,res);
})

app.get('/data/users/:id', function(req, res) {
	users.showUser(req,res,req.params.id);
})

app.post('/data/users', function(req, res) {
	users.newUser(req,res);
})

app.post('/data/login', function(req, res) {
	users.loginUser(req,res);
})

app.put('/data/users/edit/:id', function(req, res) {
	users.updateUser(req,res,req.params.id);
})

app.delete('/data/users/remove/:id', function(req, res) {
	users.removeUser(req,res,req.params.id);
})

app.get('/data/events', function(req, res) {
	events.showEvents(req,res);
})

app.get('/data/events/:id', function(req, res) {
	events.showEvent(req,res,req.params.id);
})

app.post('/data/events', function(req, res) {
	events.newEvent(req,res);
})

app.get('/data/events/users/:id', function(req, res) {
	events.showUserEvents(req,res);
})

app.put('/data/events/edit/:id', function(req, res) {
	events.updateEvent(req,res,req.params.id);
})

app.delete('/data/events/remove/:id', function(req, res) {
	events.removeEvent(req,res,req.params.id);
})

app.get('/data/partnerships', function(req, res) {
	partnerships.showPartnerships(req,res);
})

app.get('/data/partnerships/:id', function(req, res) {
	partnerships.showPartnership(req,res,req.params.id);
})

app.post('/data/partnerships', function(req, res) {
	partnerships.newPartnership(req,res);
})

app.put('/data/partnerships/edit/:id', function(req, res) {
	partnerships.updatePartnership(req,res,req.params.id);
})

app.delete('/data/partnerships/remove/:id', function(req, res) {
	partnerships.removePartnership(req,res,req.params.id);
})

app.get('/data/places', function(req, res) {
	places.showPlaces(req,res);
})

app.get('/data/places/:id', function(req, res) {
	places.showPlace(req,res,req.params.id);
})

app.post('/data/places', function(req, res) {
	places.newPlace(req,res);
})

app.put('/data/places/edit/:id', function(req, res) {
	places.updatePlace(req,res,req.params.id);
})

app.delete('/data/places/remove/:id', function(req, res) {
	places.removePlace(req,res,req.params.id);
})

}