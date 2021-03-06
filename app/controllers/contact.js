
module.exports = function (app, fs, bodyParser, js2xmlparser) {
    var contactData = require('../models/contacts.js');


    myContacts = new contactData(fs);


    //Render contact.ejs when opening /contacts URL
    app.get('/contacts', function (req, res) {
        console.log("Controller router '/contacts' is executing");
        var data = myContacts.getContacts();
        res.render('contacts', {contacts: data});
    });






    // Exports function which parses contacts JSON file to XML format and write it to the public folder for download
    app.get('/export/contacts',function(req,res){
        var data = myContacts.getContacts();
        var JSONformated = JSON.stringify(data.contact, null, 4);
        var XMLformated = js2xmlparser.parse("Contacts", JSON.parse(JSONformated));
        fs.writeFileSync('./public/exports/Contacts-export.xml', XMLformated);
        res.send("Exported succesfully to: /public/exports/Contacts-export.xml");
    });




    // Get Contact by id
    app.get('/get/contact/:id', function (req, res) {
        //Calling getContact() function from models which returns the contact object by id
        console.log("Controller router '/get/contact/:id' is executing ");

        var result = myContacts.getContact(req.params.id);
        console.log("Will send Contact to client: " + result.Id);
        //Sending requested account back to client
        res.send(result);

    });


    // Update Contact
    app.post('/contact/update', function (req, res) {
        console.log("Controller router '/contact/update' is executing ");
        var data = myContacts.getContacts();
        var updateData = req.body;

        //Finds the record to update by the id and updates with new account object
        console.log("Looking for contact id: " + updateData.Id);
        for (var j in data.contact) {
            if (updateData.Id === data.contact[j].Id) {
                console.log("Updating account: " + data.contact[j].Id);
                data.contact[j] = updateData;
                console.log("Successfully updated contact: " + data.contact[j].Id);
            }
        }
        myContacts.setContacts(data);
        res.send(data);
    });




    //Router to send contacts JSON object when called
    app.get('/get/contacts', function (req, res) {
        console.log("Controller router '/get/contacts' is executing ");
        var data = myContacts.getContacts();
        res.send(data);
    });


    //Open contact ID
    app.get('/contact/:id', function (req, res) {
        var data = myContacts.getContacts();
        var result;
        console.log("Id is: " + req.params.id);

        for (var i in data.contact) {
            if (data.contact[i].Id === req.params.id) {
                console.log("Found name: " + data.contact[i].FirstName);
                result = data.contact[i];
            }
        }
        console.log("Opening Contact: " + result.FirstName);
        res.render('contact', {contact: result});
    });


    //Router to send contacts JSON object when called
    app.get('/get/contacts', function (req, res) {
        var data = myContacts.getContacts();
        console.log("Controller router '/get/contacts' is executing ");
        res.send(data);
    });



    // Post router to add new record to contacts.json
    app.post('/post/contact', function (req, res) {
        var data = myContacts.getContacts();
        var postData = req.body;

        // Add unique Id to record from index integer in JSON file
        postData.Id = "con" + (data.index + 1);
        data.index = data.index + 1;
        console.log("Adding new record with ID: " + postData.Id);

        //add new data to JSON and write it to the file
        data.contact.push(postData);
        myContacts.setContacts(data);
        console.log("Controller router '/post/contacts' is executing ");
        res.send(data);
    });


    //Post route to delete contact records from the deleteContacts() ajax function
    app.post('/delete/contacts', function (req, res) {
        console.log("/delete/contacts is executing");
        var data = myContacts.getContacts();
        var toDel = req.body;

        for (var j in data.contact) {
            //console.log("var J = " + data.account[j].Id);
            for (var i in toDel.$data) {
                //console.log("var i = " + test.$data[i]);
                if (toDel.$data[i] == data.contact[j].Id) {
                    console.log("\n Deleting account: " + data.contact[j].Id);
                    try {
                        data.contact.splice(j, 1);
                    } catch (err) {
                        console.log("Error while deleting contact: \n" + err);
                    }
                }
            }
        }
        myContacts.setContacts(data);
        res.send(data);
    });


};