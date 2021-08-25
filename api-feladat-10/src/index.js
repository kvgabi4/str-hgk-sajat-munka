const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swager.yaml');

const morgan = require("morgan");
const logger = require('./config/logger');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Database connection. 
mongoose
    .connect('mongodb+srv://kvgabi4:NodeJS API@cluster0.38e5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // .connect('mongodb+srv://kvgabi4:NodeJSAPI@cluster0.qgcdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => logger.info('MongoDB connection has been established successfully.'))
    .catch( err => {
        logger.error(err);
        process.exit();
});

// Authenctication.
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

// Router.
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use(bodyParser.json());

app.use('/person', authenticateJwt, require('./controllers/person/routes'));
app.use('/vaccine', require('./controllers/vaccine/routes'));
app.use('/user', require('./controllers/user/routes'));

// Swagger.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling.
app.use((err, req, res, next) => {
	console.error(`ERR ${err.statusCode}: ${err.message}`);
	res.status(err.statusCode);
	res.json({
		hasError: true,
		message: err.message
	});
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
