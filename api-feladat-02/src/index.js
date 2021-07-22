const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swager.yaml');

app.use(bodyParser.json());

app.use('/person', require('./controllers/person/routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
