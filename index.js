const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());



// Mongo DB

console.log(process.env.DB_PASS);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4hg5zjk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Collections
    const toysCollection = client.db('babyToys').collection('toysCollection');


    // Insert data from Add a toys form
    app.post('/toysCollection', async(req, res) => {
        const toysList = req.body;
        console.log(toysList);

        const result = await toysCollection.insertOne(toysList);
        res.send(result);

    });

    // All Toys Data show
    app.get('/allToys', async(req, res) =>{
        const result = await toysCollection.find({}).limit(20).toArray();
        res.send(result);

    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Baby Toys is Running');

})


app.listen(port, () =>{
    console.log(`Baby Toys running on Port : ${port}`);
})