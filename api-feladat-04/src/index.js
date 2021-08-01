const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swager.yaml');

app.use(bodyParser.json());

app.use('/person', require('./controllers/person/routes'));

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
