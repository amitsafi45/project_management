import schema from './schema/schema.js'
import 'dotenv/config'
import express from "express";
import {graphqlHTTP} from 'express-graphql'
import { GraphQLSchema } from 'graphql';

const app=express()
app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}))
app.listen(process.env.PORT,()=>{
    console.log(`listing at ${process.env.PORT}`);
})
