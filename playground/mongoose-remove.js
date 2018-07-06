
const {ObjectID}= require ('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove()

Todo.findOneAndRemove({_id: '5b3f645b6cd908a249887452'}).then((todo)=>{
  console.log(todo);
});

Todo.findByIdAndRemove('5b3f645b6cd908a249887452').then((todo)=>{
  console.log(todo);
});
