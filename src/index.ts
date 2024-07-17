import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

await mongoose.connect("mongodb://localhost:27017/gif-searcher");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
});

const BooksModel = mongoose.model("Books", booksSchema);

const book1 = new BooksModel({ name: "The Awakening", author: "Kate Chopin" });

book1
  .save()
  .then((doc) => {
    console.log(
      "books -------------------------------------------------l",
      doc
    );
  })
  .catch((error) => {
    console.log(error);
  });

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Pau Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
});

// console.log("books -------------------------------------------------l", book1);

console.log(`🚀  Server ready at: ${url}`);
