const expect = require ('expect');

const request = require('supertest');

const{app} = require ('./../server');

const{Todo} = require ('./../models/todo');

const{User} = require ('./../models/user');

const {ObjectID} = require ('mongodb');

const {todos,populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach( populateUsers);

beforeEach( populateTodos);

describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var text='Test todo text';

    request(app)
      .post('/todos')
      .send({ text})
      .expect(200)
      .expect( (res)=>{
        expect(res.body.text).toBe(text)
      })
      .end((err,res)=>{
        if (err){
          return done(err);
        }
        Todo.find({text}).then((todos) =>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })
  });

  it('should not create todo with invalid body data', (done)=>{
    var text='';

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
        if (err){
          return done(err);
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>done(e));
      })
  });

});

  describe('GET /todos', ()=>{
    it ('should get all todos', (done)=>{
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);

    });
  });

  describe('GET /todos/:id', ()=>{
    it('should return todo doc', (done)=>{
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      }).
      end(done);

    });

    it('should return 404 if todo not found', (done)=>{
      var hexId = new ObjectID().toHexString();
      request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);

    });

    it('should return 404 if non object id found', (done)=>{
      request(app)
      .get('/todo/123')
      .expect(404)
      .end(done);

    });

  });

  describe('DELETE /todos/:id', ()=>{
    it ('should remove a todo',(done)=>{
    //  console.log('List of todos',todos);
      //console.log(todos[1]._id);
      var hexId=todos[1]._id.toHexString();
    //  console.log('Hex ID', hexId);
      request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
      //    console.log('Hex ID', hexId);
      //    console.log(res.body);
        expect(res.body._id).toBe(hexId);
      }).end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.findById(hexId).then((todo)=>{
          expect(todo).toBeFalsy();
          done();

        }).catch((e)=>{done(e)});

      })
    });


      it('should  return 404 if todo not found',(done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);

      });

      it('should return return 404 if object id invalid', (done)=>{
        request(app)
        .delete('/todo/123')
        .expect(404)
        .end(done);

      });

  });

  describe('PATCH /todos/:id', ()=>{
    it ('should update the todo', (done)=>{
      var hexId=todos[0]._id.toHexString();
      var text = 'Patch from testing';
      request(app)
      .patch(`/todos/${hexId}`)
      .send({text,
            completed: true
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);

    });

    it ('should clear completedAt when todo is not completed', (done)=>{
      var hexId=todos[1]._id.toHexString();
      var text = 'Patch from testing!!';
      request(app)
      .patch(`/todos/${hexId}`)
      .send({text,
            completed: false
      })
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);

    });


  });

  describe('GET /users/me',()=>{

    it('should return user if authenticated',(done)=>{
    //  console.log(users[0]);

      request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      }).end(done);

    })
    it('should return 401 if  not authenticated',(done)=>{
      request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
        //console.log(res.body);
        expect(res.body).toEqual({});
      }).end(done);

    })

  });

  describe('Post /users', ()=>{
    it ('should create a user', (done)=>{
      var email ='example@example.com';
      var pass = '123mnb!';

      request(app)
      .post('/users')
      .send({email,pass})
      .expect(200)
      .expect((res)=>{
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);

      }).end((err)=>{
        if (err){
          return done(err);
        }
        User.findOne({email}).then((user)=>{
          //console.log(user);
          expect(user).toBeTruthy();
         expect(user.password).not.toBe(pass);
          done();
        });

      });

    });

    it ('should return validation errors  if validation invalid', (done)=>{
      var invalidemail='sd';
      var pass = 'asdasd';

      request(app)
      .post('/users')
      .send({invalidemail,pass})
      .expect(400)
      .end(done);

    });

    it ('should  not create a user if email is used', (done)=>{
      var duplicateemail='example@example.com';
      var pass = 'asdasd';

      request(app)
      .post('/users')
      .send({
          email :users[0].email,
          password: 'wefwf'})
      .expect(400)
      .end(done);

    })

  });
