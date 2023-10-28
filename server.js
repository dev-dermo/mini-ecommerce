const express = require('express');
const logger = require('morgan');
const { engine } = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = 3001;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(routes);

app.listen(PORT, () => {
	console.log(`App now running at http://localhost:${PORT}/`);
	sequelize.sync({ force: false });
});