require('./config/config');

const _ = require('lodash');

const express=require('express');

const bodyParser = require('body-parser');

var{mongoose} = require('./db/mongoose');

var{Todo} = require ('./models/todo');


var{User} = require ('./models/user');

var {authenticate} = require ('./middleware/authenticate');

const {ObjectID}= require ('mongodb');


var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req,res)=>{

  var todo = new Todo ({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },
  (e)=>{ res.status(400).send(e);

  })
});


app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if (!todo){
      return res.status(404).send();
    }else{
      res.status(200).send({todo});
    }
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if (!todo){
      return res.status(404).send();
    }else{
      res.send(todo);
    }
  }).catch((e)=>{
    return res.status(400).send(e);
  })

})

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt=null;
  };

  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo)=>{
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
});

app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);


  var user=new User(body);

  //User.findByToken
  //user.generateAuthToken

  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    //console.log('Gelen token:', token);
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
      res.status(400).send(e);
  });

});


app.get('/users/me',authenticate, (req,res)=>{

  res.send(req.user);
  //var token = req.header('x-auth');

  // User.findByToken(token).then((user)=>{
  //   if (!user){
  //     return Promise.reject();
  //       //res.status(401).send();
  //   }
  //   res.send(user);
  // }).catch((e)=>{
  //   res.status(401).send();
  // });

})


app.listen(port, ()=>{
  console.log(`Started up on ${port}`);
});


module. exports = {app};
