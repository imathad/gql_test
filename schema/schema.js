const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User{
    id:String
    name:String
    email:String
    password:String
} 

type Query{
    
    getUserById(id:String):User
    getAllUsers:[User]
}
type Mutation{
    addUser(name:String,email:String,password:String):User
    deleteUserById(id:String):User
    updateUser(id:String!,name:String,email:String):User
}
`;

module.exports = typeDefs