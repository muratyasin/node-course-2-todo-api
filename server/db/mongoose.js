var mongoose= require('mongoose');

mongoose.Promise=global.Promise;

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

mongoose.connect('mongodb://heroku_t414lbrp:grtvkugducqc04vrh4ml9kktbv@ds229771.mlab.com:29771/heroku_t414lbrp');
//mongodb://heroku_t414lbrp:grtvkugducqc04vrh4ml9kktbv@ds229771.mlab.com:29771/heroku_t414lbrp
module.exports = {mongoose};
