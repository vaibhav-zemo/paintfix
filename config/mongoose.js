const mongoose = require('mongoose');
const DB = 'mongodb+srv://vaibhavpathak:pathakvaibhav@cluster0.8lyrlym.mongodb.net/paintfix?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log("DB Connected");
}).catch((err)=> console.log(err));