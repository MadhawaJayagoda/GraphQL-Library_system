const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;


// Dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '2'},
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '1'},
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'}
];

var authors = [
    { name: 'Pathrick Rothfuss', age:44, id: '1' },
    { name: 'Brandon Snaderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parents, args) {
                console.log(parents);
                return _.find(authors, {id: parents.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    }) 
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID}},
            resolve(parents, args) {
                return _.find(books, { id: args.id });
            }
        },

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parents, args) {
                return _.find(authors, { id: args.id });
            }           
        } 
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});