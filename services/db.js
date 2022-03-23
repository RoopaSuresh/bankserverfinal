//db.js - to give mongo db connection details

//mongoose import
const mongoose=require('mongoose')

//state connection string
mongoose.connect('mongodb://localhost:27017/bank',{
    useNewUrlParser:true
})

//model creation- model's name should be in singular and initial letter should be in capital letter
const User=mongoose.model('User',{
    acno: Number,
     uname: String,
      password: String,
       balance: Number,
        transaction: []
})


//export model ie User
module.exports={
    User
}
