const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const { resolvers } = require('./resolvers/resolvers')
const { pool, client } = require('./utils/db_conections')
require('dotenv').config()


client.connect((err, res) => {
    if (err) {
        console.error('error connecting', err.stack)
    } else {
        console.log('connected')
        client.end()
    }
})
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ request }) => ({
        request,
        pool,
    })

});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log("success")
);