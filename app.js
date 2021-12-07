const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const graphql_schema = require('./schema/schema.js');

const constants = require('./resources/constants');
const app = express();
const PORT = constants.PORT;

app.use('/graphql', graphqlHTTP({
    schema: graphql_schema,
    graphiql: true
}));

//db connection
mongoose.connect( constants.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true  } , (err) => {
    if(err){
        console.log("Error occured while connecting ot the Database !");
        throw err;
    }
    console.log("MongoDB : Connected to the Database successfully !");
});

app.listen(PORT, () => {
    console.log("Node.js Backend server started on port: " + PORT);
});