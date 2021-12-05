const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
const graphql_schema = require('./schema/schema.js');

const app = express();
const PORT = process.env.PORT || 4000

app.use('/graphql', graphqlHTTP({
    schema: graphql_schema
}));

app.listen(PORT, () => {
    console.log("Node.js Backend server started on port: " + PORT);
});