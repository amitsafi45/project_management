import {clients,projects} from '../sampleData.js'
import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
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
      status:{type:GraphQLString}
    }),
})


  const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return projects.find(project=>project.id===args.id);
            }
        },
        allProject:{
            type:new GraphQLList(ProjectType),
            resolve(parent,arg){
                return projects
            }
        },
        allClient:{
            type:new GraphQLList(ClientType),
            resolve(parent,arg){
                return clients
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client=>client.id===args.id);
            }
        }
    }
})


export default new GraphQLSchema({
    query:RootQuery
})
