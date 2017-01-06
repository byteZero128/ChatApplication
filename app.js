var express = require ('express'); //import npm express dependencies to app
var app = express();// 'app' signals express function, 'app' is then used to handle the requests and routing.


app.use(express.static('public')); // static is a function that creates middlewear(plugin the ability to serve up static assets from the public folder, app.use registers the middlewear with app
// THE ABOVE LINE AUTOMATICALLY GOES TO THE STANDARD index.html because that is the arbitrary home page name
//you can change the directory to anything else in the public folder by doing localhost3000/XXX.html in the browser, otherwise its always in the index.html
//As a result of the above line, the app.get output is not displayed the app only outputs the external static assets! Because the other line handles the root, which is already being used as index.htmln with app.use
//with out this special express.static function you would have to do app.get('every directory requested',....) and use fs to read the file... its tedious
app.use(express.static('node_modules/bootstrap/dist'));
app.get('/', function(req, res){  //'app'.get, handles requests at the '/' =(root of the app)ex *youtube.com/* call function, create a request and response object, use res(response) to send mssg
    res.send('A SAW DUDE')

});


app.listen(3000)//server will restart if the port is changed

//have the app listen to a port that we specify, second param can specify to IP, but we use local host by default
console.log('APP listening at port 3000');

