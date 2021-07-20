import "reflect-metadata";
import Express, { json, urlencoded } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User.resolver";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cookieParser from "cookie-parser";
import { ContextI } from "./interfaces/context.interface";
import { RoomResolver } from "./resolvers/Room.resolver";
import { MessageResolver } from "./resolvers/Message.resolver";

import cors from "cors"

const app = Express();

//config
app.use(cors({
    origin: "http://localhost:4000",
    credentials: false,
  }))
app.use(cookieParser())

app.use(json());
app.use(urlencoded({extended: true}));

export const serverStart = async () => {

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, RoomResolver, MessageResolver],
        }),
        context: ({ req, res }):ContextI => ({ req, res }),
        plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await server.start()

    server.applyMiddleware({app: app, path: '/graphql'})

    return app;
}

