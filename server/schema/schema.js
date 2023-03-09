import {clients,projects} from '../sampleData.js'
import {GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
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

const mutation=new GraphQLObjectType({
    name:'mutation',
    fields:{
        addClient:{
            type:ClientType,
            args:{
               
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type: new GraphQLNonNull(GraphQLString)},
                phone:{type:new GraphQLNonNull(GraphQLString)}

            },
            resolve(parent,args){
                const cl=new Clients({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })
                return cl.save()
            }
        },
       deleteClient:{
        type:ClientType,
        args:{
            id:{type:new GraphQLNonNull(GraphQLID)}
        },
        resolve(parent,args){
          return Clients.findByIdAndRemove(args.id)
          
        }
       },
       addProject:{
        type:ProjectType,
        args:{
               
            name:{type:new GraphQLNonNull(GraphQLString)},
            description:{type: new GraphQLNonNull(GraphQLString)},
            status:{type:new GraphQLEnumType({
                name:"projectStatus",
                values:{
                    new:{value:'Not Started'},
                    progress:{value:'In Progress'},
                    completed:{value:'Completed'}
                }
                
            }),
            // defaultValue:'not started'
        },
        clientId:{type:new GraphQLNonNull(GraphQLID)}

        },
        resolve(parent,args){
            const pro=new Projects({
                name:args.name,
                description:args.description,
                status:args.status,  
            clientId:args.clientId          })
            return pro.save()
        }

       },

    deleteProject:{
    
        type:ProjectType,
        args:{
            id: {type:new GraphQLNonNull(GraphQLID)}
        },
        resolve(parent,args){
            return Projects.findByIdAndRemove(args.id)
        }
    },
    updateProject:{
        type:ProjectType,
        args:{
            id: {type:new GraphQLNonNull(GraphQLID)},
            description:{type:GraphQLString},
            status:{type:new GraphQLEnumType({
                name:"projectStatusUpdate",
                values:{
                    new:{value:'Not Started'},
                    progress:{value:'In Progress'},
                    completed:{value:'Completed'}
                }
                
            })
            
            
        }
        
    },
    resolve(parent,args){
        return Projects.findByIdAndUpdate(
            args.id,{
                $set:{
                    name:args.name,
                    description:args.description,
                    status:args.status
                }
            },
            {new:true}
        )
    }

}
    }
})

export default new GraphQLSchema({
    query:RootQuery,
    mutation
})
