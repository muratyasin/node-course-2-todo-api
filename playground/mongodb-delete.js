// const MongoClient = require ('mongodb').MongoClient;

const {MongoClient, ObjectID} = require ('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if (err){
    return console.log('Unable to connect to MongoDb Server');
  }

  console.log('Connected to MongoDB Server');

  const db =client.db('TodosApp');

  //deleteMany

  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then( (result)=>{
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( (result)=>{
  //    console.log(result);
  //  });


  //fingOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed :false}).then((result)=>{
  //   console.log(result);
  // });



  // db.collection('Users').deleteMany({name:'Murat' }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndDelete({_id : new ObjectID ('5b3c70a4713f2f2429c03285')}).then( (result)=>{
    console.log(result);
  });


});
