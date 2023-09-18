const express = require('express')
const app = express();
const port = 2023;

app.use(express.static('Real Estate 360'))

// HOME
app.get('/Home', (req, res)=> {
    res.sendFile(__dirname + '/Real Estate 360/index.html');
});

// PROPERTY LIST
app.get('/Propertylist', (req, res)=> {
    res.sendFile(__dirname + '/Real Estate 360/property-list.html');
});

// Property Type
app.get('/Propertytype', (req, res)=>{
    res.sendFile(__dirname + 'Real Estate 360/property-type.html');
});

// PROPERTY AGENT
app.get('/Propertyagent', (req, res)=>{
    res.sendFile(__dirname + '/Real Estate 360/property-agent.html');
});

//Testimonial
app.get('/Testimonial', (req, res)=>{
    res.sendFile(__dirname + 'Real Estate 360/property-type.html');
});

// Contact
app.get('/Contact', (req, res)=>{
    res.sendFile(__dirname + '/Real Estate 360/contact.html');
});

// Add Property
app.get('/AddProperty', (req, res)=>{
    res.sendFile(__dirname + '/Real Estate 360/add-property.html');
});

// About
app.get('/About', (req, res)=>{
    res.sendFile(__dirname + '/Real Estate 360/add-property.html');
});





app.listen(port, () =>console.log(`Server has started on port: ${port}`))