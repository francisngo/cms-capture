import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';

const app = express();
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(morgan('dev'));
app.use(express.json());
const httpServer = http.createServer(app);

const typeDefs = gql`
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'world'
    },
};

(async () => {
    app.get('/', (req, res) => {
        res.json({ hello: 'world' });
    })

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();

    const PORT = process.env.PORT || 8080;
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

    console.log(`🚀 Server ready at http://localhost:${PORT}`);
})();
