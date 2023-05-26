
const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect("mongodb+srv://parnella:Rojo5677@cluster0.wewbbzc.mongodb.net/fruitsDBretryWrites=true&w=majority",
  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log("Connected with the db")
  });
  // await mongoose.connect("mongodb://localhost:27017/fruitsDB");

  console.log(mongoose.connection.readyState);

  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "no name!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });

  const Fruit = mongoose.model("Fruit",fruitSchema);

  const fruit = new Fruit({
    // name: "Pear",
    rating: 9,
    review: "delicious under ideal conditions, but if not ripe enough or overripte, can get real ugly."
  });
  //
  // const kiwi = new Fruit({
  //   name: "Kiwi",
  //   rating: 10,
  //   review: "The best fruit!"
  // });
  //
  // const orange = new Fruit({
  //   name: "Orange",
  //   rating: 7,
  //   review: "Hit or miss, the good ones are good."
  // });

  // const weird = new Fruit({
  //   name: "Weird",
  //   rating: 7,
  //   review: "This fruit suks, I'm a troll."
  // });

  // weird.save().then(function() {
  //   console.log(weird);
  // }).catch(function(err) {
  //   console.log(err);
  // });

  // Fruit.insertMany([kiwi,orange,fruit]).then(function() {
  //   console.log("success!");
  // }).catch(function(err) {
  //   console.log(err);
  // });

  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
  });

  const Person = new mongoose.model("Person",personSchema);

  const mango = new Fruit({
    name: "pineapple",
    score: 8,
    review: "Delicious, but ruins my taste buds."
  })

  mango.save();

  // const newKid = new Person({
  //   name: "Amy",
  //   age: 32,
  //   favoriteFruit: pineapple
  // });

  // newKid.save();

  // fruit.save()

  Person.updateOne({_id:"646ff1b2a9c801fadcae9302"},{favoriteFruit: mango});

  Fruit.deleteOne({name:"Weird"});

  Fruit.find().then((fruits)=>{
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })

  }).catch((err) => {
    console.log(err);
  });

  Fruit.updateOne({_id:"646fdb69f73ea51121ebf47b"}, {name: "Peach"}).then((fruit)=>{
    console.log("Success");
  }).catch((err)=>{
    console.log(err);
  })

  Fruit.deleteOne({name:"Weird"}).then((obj)=>{
    console.log(obj);
    mongoose.connection.close();
  }).catch((err)=>{
    console.log(err);
  })

  // Person.deleteMany({name:"Me"}).then((person)=>{
  //   console.log("good?");
  // }).err((err)=>{
  //   console.log(err);
  // })

}










/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://parnella:Rojo5677@cluster0.wewbbzc.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// declare database & collection working with
const db = "fruitsDB";
const coll = "fruits";

async function main() {
  try {
    // connect
    await client.connect();
    console.log("Successfully connected to MongoDB.");

    // insert a fruit
    await addFruits(client,[
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great stuff!"
      }
    ])

    // find and log all fruit in the database
    await findAllFruits(client);

  } catch (e) {
    console.log("Error caught: " + e)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.dir);

async function addFruit(client, newFruit){
  const result = await client.db(db).collection(coll).insertOne(newFruit);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function addFruits(client, newFruitsArray){
  const result = await client.db(db).collection(coll).insertMany(newFruitsArray);
  console.log(`${result.insertedCount} listing(s) created with the following ID(s):`);
  console.log(`${result.insertedIds}`)
}

async function findAllFruits(client){
  const results = await client.db(db).collection(coll).find().toArray();
  console.log("Found the following fruits");
  console.log(results);
}
 */
