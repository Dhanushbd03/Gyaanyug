const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 
const port = process.env.PORT || 3000;
mongoose.connect("mongodb+srv://nikhilkulalk:gyaanyug@cluster0.5b0hobm.mongodb.net/gyaanyug",{useNewUrlParser:true},{useUnifiedTopology:true}
)
const contactus = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});
const CONTACT = mongoose.model('CONTACT', contactus);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.post('/', function (req, res) {

  let contactform = new CONTACT({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone, 
    message: req.body.message

  });

  contactform.save()
    .then(() => {
      res.redirect("./submitcomplete/submitted.html");
    })
    .catch((error) => {
      res.status(500).send('Error saving form data.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});