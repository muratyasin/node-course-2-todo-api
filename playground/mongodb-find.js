// const MongoClient = require ('mongodb').MongoClient;

const {MongoClient, ObjectID} = require ('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if (err){
    return console.log('Unable to connect to MongoDb Server');
  }

  console.log('Connected to MongoDB Server');

  const db =client.db('TodosApp');

  // db.collection('Todos').find({
  //   _id:new ObjectID('5b3a2a67b7bbda79c18d3b98')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Unable to fetch todos',err);
  // });

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  // //  console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Unable to fetch todos',err);
  // });

db.collection('Users').find({name : 'Murat'}).count().then((count)=>{
  console.log(`Number of users is ${count}`);
}),(err)=>{
  console.log('Unable to fetch from users',err);
}
});
