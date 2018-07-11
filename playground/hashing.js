const{SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt  = require('bcryptjs');

var password = '123abc!'
// bcrypt.genSalt(10, (err,salt)=>{
//   bcrypt.hash(password,salt, (err,hash)=>{
//     console.log(hash);
//   })
// })

var hashedpassword='$2a$10$oW1T3qJybPHzLK/kCNVaoOUUoOQoPz3.UHHBxvOdKzuPPWC7svWP2';

bcrypt.compare(password,hashedpassword,(err,res)=>{
  console.log(res);
})
// var data={
//   id:10
// };
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
//
// var decoded = jwt.verify(token,'123abc');
//
// console.log(decoded);

// var message = 'I am user number 3';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
//
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id : 4
// };
//
//
// var token = {
//   data : data,
//   hash: SHA256(JSON.stringify(data) +'somesecret').toString()
// };
//
// var resultHash = SHA256(JSO.stringify(token.data)+'somesecret');
//
// if (resultHash === token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('data is changed. do not trust');
//}
