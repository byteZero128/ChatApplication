



var express = require ('express'); //import npm express dependencies to app
var app = express();// 'app' signals express function, 'app' is then used to handle the requests and routing.
var rooms = require('./Data/rooms.json'); // Access the rooms from the json file, stored as an array node js is good at interpreting json
var bodyParser = require("body-parser"); //read form data coming from app.post
var uuid = require ('node-uuid');
var _ = require("lodash"); //work with collections of data, add lodash to json package
app.use(express.static('public')); // static is a function that creates middlewear(plugin the ability to serve up static assets from the public folder, app.use registers the middlewear with app

// THE ABOVE LINE AUTOMATICALLY GOES TO THE STANDARD index.html because that is the arbitrary home page name
//you can change the directory to anything else in the public folder by doing localhost3000/XXX.html in the browser, otherwise its always in the index.html
//As a result of the above line, the app.get output is not displayed the app only outputs the external static assets! Because the other line handles the root, which is already being used as index.htmln with app.use
//with out this special express.static function you would have to do app.get('every directory requested',....) and use fs to read the file... its tedious
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));//create middlewear to parse out the body of a form submission from app.post
app.get('/saw', function(req, res){  //'app'.get, handles requests at the '/' =(root of the app)ex *youtube.com/* call function, create a request and response object, use res(response) to send mssg
    res.send('A SAW DUDE');

});

//renders a view that transforms template engine to html (view = template) dont forget jade npm module (npm install jade save)
//NOTICE the render function looks for a views folder by default, or you can app.set('views',./view), takes strings to specify location.
//This template engine is for organization/packaging benefits/ real time changes to html
app.get('/admin/rooms', function(req, res){
    res.render('rooms.jade',{
        title: "Admin Rooms",
        rooms: rooms
    } );//second parameter to pass rooms into rooms.jade

});
app.get('/admin/rooms/add', function(req, res){
    res.render('add.jade');//second parameter to pass rooms into rooms.jade

});
app.post('/admin/rooms/add', function(req, res){//use app.post to reference the same route but handle it with different requests and response
    var room ={
        name: req.body.name, //request object body property
        id: uuid.v4() //create unique identifiers with uuid for each new chat room
    };

    rooms.push(room); //save the chat room by pushing it into the array in the json file
    res.redirect('/admin/rooms'); //redirect back to chatroom page after the chat room has been created
});
app.get("/admin/admin/rooms/delete/:id", function(req, res){ //put :id to define a route parameter named id for us, express will parse that for us and could send it back to the client.
   var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);//rooms array is set to a new array removing a particular room, for ecah room will only accept the room if the roomId !== the roomid we delete, js es6 syntax
    res.redirect('/admin/rooms'); //redirect back to chatroom page to reload the rooms

}); //filter() method removes elements
app.get("/admin/rooms/edit/:id", function(req, res) { //put :id to define a route parameter named id for us, express will parse that for us and could send it back to the client.
    var roomId = req.params.id;
    var room = _.find(rooms,r=> r.id === roomId) ;//Using low dash methods with _ , we use find to take collection(array), and filter to find the room where its id matches the id we are trying to edit.
    res.render("edit",{room}); // dont redirect but render an edit to the name within room
}); //_find(collection, function that filters to find the item we want in the array);
    app.get('/',function(req,res ){//home page fro root of directory
    res.render('index.jade');
});

app.listen(3000);//server will restart if the port is changed

//have the app listen to a port that we specify, second param can specify to IP, but we use local host by default
console.log('APP listening at port 3000');

