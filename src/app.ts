import "reflect-metadata";
import Express, { json, urlencoded } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User.resolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cookieParser from "cookie-parser";

const app = Express();

//config

app.use(json());
app.use(urlencoded({extended: false}));
app.use(cookieParser())

export const serverStart = async () => {

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
        // plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await server.start()

    server.applyMiddleware({app: app, path: '/graphql'})

    return app;
}

