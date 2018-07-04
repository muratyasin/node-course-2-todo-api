// const MongoClient = require ('mongodb').MongoClient;

const {MongoClient, ObjectID} = require ('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name : 'murat', age : 25};
//
// var {name} = user;
//
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if (err){
    return console.log('Unable to connect to MongoDb Server');
  }

  console.log('Connected to MongoDB Server');

  const db =client.db('TodosApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed:false
  //
  // }, (err ,result) =>{
  //   if (err) {
  //     return console.log('Unable to insert todo',err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //
  // });

  // db.collection('Users').insertOne({
  //   name : 'Murat',
  //   age : 25,
  //   location: 'Turkey'
  // }, (err,result)=> {
  //   if (err){
  //     return console.log('Unable to insert user',err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  //
  //   client.close();

});
