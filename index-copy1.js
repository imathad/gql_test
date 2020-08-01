const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


// Construct a schema, using GraphQL schema language

let userArray = []
let userData = {
    name: "abd",
    email: "djkalsdfjl",
    address: "skdjksjkfdj"
}
// const { email, name, , address } = userData
const typeDefs = gql`
  type Query {
    hello: String,
    getUser:User

  }

  type Mutation{
      adduser(name:String,email:String!,address:String):User
  }


  type User{
      name:String
      email:String
      address:String
  }

`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world grpahql!',
        getUser: () => userData
    },

    Mutation: {
        adduser: (parent, args, { context }, info) => {

            const { name, email, address } = args;
            // let userDataObj = {
            //     name: name,
            //     email: email,
            //     address: address
            // }
            let userDataObj = {
                name,
                email,
                address
            }

            return userDataObj

        }
    }

};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log("success")
);