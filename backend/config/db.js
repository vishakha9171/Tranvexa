const mongoose=require('mongoose')


exports.connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(' Connected securely to MongoDB ...')
    }
    catch(err){
         console.error('Database connection failed:', err)
    };
}
