var express=require('express');
var compression = require('compression')
const forceDomain = require('forcedomain');
path=require('path');
bodyParser=require('body-parser');
cors=require('cors');
passport=require('passport');
mongoose=require('mongoose');
config=require('./config/database');
app=express();
app.use(compression());
app.use(forceDomain({
  hostname: 'www.fysu.in',
  protocol: 'https'
}));
port=3700;
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
var users=require('./routes/users');
admin=require('./routes/admin');
app.use('/users',users);
app.use('/admin',admin);
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,function(){console.log('Server logged on '+port)});
mongoose.connect(config.database);
mongoose.connection.on('connected',function(){
  console.log('connected to database'+config.database)
});
mongoose.connection.on('error',function(a){
  a&&console.log('Error'+a)
});
app.get('*',function(a,b){
  b.sendFile(path.join(__dirname + '/public/index.html'))
});