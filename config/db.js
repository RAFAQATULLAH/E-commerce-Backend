const mongoose=require('mongoose')


const dbConnected=()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected");
    
}

module.exports=dbConnected