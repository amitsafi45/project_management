import {clients,projects} from '../sampleData.js'
import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
import Clients from '../model/client.js'
import Projects from '../model/project.js'
//client Type
const ClientType=new GraphQLObjectType({
    name:'Client',
    fields:()=>({
      id:{type: GraphQLID},
      name:{type:GraphQLString},
      email:{type:GraphQLString},
      phone:{type:GraphQLString}


    }),
})


//project Type
const ProjectType=new GraphQLObjectType({
    name:'Project',
    fields:()=>({
      id:{type:GraphQLID},
      name:{type:GraphQLString},
      description:{type:GraphQLString},
      status:{type:GraphQLString},
      client:{
        type:ClientType,
        resolve(parent,args){
          return Clients.findById(parent.clientId)
        }
      }
    }),
})


  const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Projects.findById(args.id);
            }
        },
        allProject:{
            type:new GraphQLList(ProjectType),
            resolve(parent,arg){
                return Projects.find()
            }
        },
        allClient:{
            type:new GraphQLList(ClientType),
            resolve(parent,arg){
                return Clients.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Clients.findById(args.id);
            }
        }
    }
})


export default new GraphQLSchema({
    query:RootQuery
})
