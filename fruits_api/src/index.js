const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const res = require('express/lib/response');
const req = require('express/lib/request')
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

//Initilization
const app = express();
require('./database');
const { application } = require('express');
//config
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8085);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
//routers
app.use('/', require('./routes/index'));
require('./routes/index');
app.use(require('./routes/fruits'));
//iniciar server

app.listen(app.get('port'), () =>{
   console.log('servidor corriendo en el',
   app.get('port'));
   console.log('http://localhost:'+
   app.get('port'));
});