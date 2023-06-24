import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { gql } from 'graphql-tag';
import models from './models';

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
        hello: () => 'world',
    },
};

(async () => {
    try {
        await models.sequelize.authenticate();
        console.log('Connected to the database');

        await models.sequelize.sync({ force: true });
        console.log('Models synced with the database');

        app.get('/', (req, res) => {
            res.json({ message: 'Welcome to CMS Capture' });
        });

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        await server.start();

        app.use('/graphql', express.json(), expressMiddleware(server));

        const PORT = process.env.PORT || 8080;
        await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));

        console.log(`🚀 Server ready at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
})();
