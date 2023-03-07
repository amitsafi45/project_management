import mongoose from "mongoose";
const clientSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});
export default mongoose.model('Client',clientSchema)