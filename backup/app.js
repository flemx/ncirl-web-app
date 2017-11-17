var http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    js2xmlparser = require('js2xmlparser'),
    libxslt = require('libxslt');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// GET request to dislay index.html located inside /views folder
router.get('/', function(req, res) {
  res.render('index');
});






//Adding express routing to test response on test.html
router.get('/get/test', function(req, res) {
   
 res.writeHead(200, { 'Content-Type': 'application/json' });
  
  var myObj = {
    name: 'Damien'
  };
  
  // Read in a JSON file
  // var JSONfile = fs.readFileSync('test.json', 'utf8');
    
  // var jFile = JSON.parse(JSONfile); 
   
  //res.end(jFile.game.gameTitle);
  
  res.end(JSON.stringify(myObj));
  
});




//Customer get router
router.get('/get/customer', function(req, res) {
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    var docSource = fs.readFileSync('Customers.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Customers.xsl', 'utf8');
    
    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);
    
    var result = stylesheet.apply(doc);
    
    res.end(result.toString());
  
});









// HTML produced by XSL Transformation
router.get('/get/html', function(req, res) {
  
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    var docSource = fs.readFileSync('Games.xml', 'utf8');
    var stylesheetSource = fs.readFileSync('Games.xsl', 'utf8');
    
    var doc = libxslt.libxmljs.parseXml(docSource);
    var stylesheet = libxslt.parse(stylesheetSource);
    
    var result = stylesheet.apply(doc);
    
    res.end(result.toString());
  
});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Games.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into country array within the JSON file    
    JSONparsed.Game.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Games.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("Games", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('Games.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});


//Customer post router
router.post('/post/customer', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {

    // Read in a JSON file
    var JSONfile = fs.readFileSync('Customers.json', 'utf8');

    // Parse the JSON file in order to be able to edit it 
    var JSONparsed = JSON.parse(JSONfile);

    // Add a new record into country array within the JSON file    
    JSONparsed.Customer.push(obj);

    // Beautify the resulting JSON file
    var JSONformated = JSON.stringify(JSONparsed, null, 4);

    // Write the updated JSON file back to the system 
    fs.writeFileSync('Customers.json', JSONformated);

    // Convert the updated JSON file to XML     
    var XMLformated = js2xmlparser.parse("Customers", JSON.parse(JSONformated));

    // Write the resulting XML back to the system
    fs.writeFileSync('Customers.xml', XMLformated);

  }

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);
  
  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});






server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});