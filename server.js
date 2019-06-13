const express = require('express');
const bodyParser = require('body-parser');  // Tiene que ir ahí o aparece error Cannot read property
const app = express();
const router = express.Router();
const controlador = require('./api/routes/user');
const controladorRequest = require('./api/routes/requests');
//Handler de la db
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://admin:admin@cluster1-dnlpv.mongodb.net/test?retryWrites=true&w=majority"

//Permite que la app reconozca cosas del req.body en formato json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect(uri,{ useNewUrlParser:true});

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster1-dnlpv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/


app.listen(port);

app.get('/',(req,res)=>{
    res.status(200).json({
        status: 'ok',
        body: 'todo cool'
    })
})

app.use('/user',controlador);
app.use('/requests',controladorRequest);


module.exports = router;