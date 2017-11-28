let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let passport = require('./strategies/sql.localstrategy');
let sessionConfig = require('./modules/session.config');

// Route includes
let indexRouter = require('./routes/index.router');
let userRouter = require('./routes/user.router');
let registerRouter = require('./routes/register.router');
let postRouter = require('./routes/post.router');

let port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
