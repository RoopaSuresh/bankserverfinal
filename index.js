//first step is to import express.
//for this require is used. require is a function or method.
//its format inside bracket is id:string ie, give name of the library to be imported in single quotes
//assign it to a constant
const express=require('express')
//importing dataservice.js
const dataService=require('./services/data.service')
//import jsonwebtoken
const jwt = require('jsonwebtoken')




//step 2 to create a server app using express
//(here we have named the server application as app)
//its format is const app=the variable in which express has been assigned to with function call ie()
const app=express()



//to parse json
app.use(express.json())





//step 4 resolve http request from client (using express)
//GET-to read data
//    / means- in which url its output should be resolved and shown.if it is to be shown in localhost 3000 use /
//the steps used for resolving that request should be given in a callback function
//CALLBACK FUNCTION SHOULD ALWAYS BE IN ARROW FUNCTION
//request and response are the two variables inside callback function. you should always use that
app.get('/',(req,res)=>{
    // res.send("It's a get method")
    //every response has a status. status decides if the request is a success or not
    //response with a status in the range 200 means its a success
       //response with a status in the range 100 means its a information
     //response with a status in the range 300 means its a redirection
    //response with a status in the range 400 means its a error from client
     //response with a status in the range 500 means its a error in server side
   
    //to change the status forcefully(usually it is 200 ok . you can change it to any value)
    res.status(401).send("It's a get method")
})


//POST-to create data
app.post('/',(req,res)=>{
    res.send("It's a post method")
})


//PuT-to update/modify data
app.put('/',(req,res)=>{
    res.send("It's a put method")
})


//PATCH-to update partially data
app.patch('/',(req,res)=>{
    res.send("It's a patch method")
})


//delete-to delete data
app.delete('/',(req,res)=>{
    res.send("It's a delete method")
})


//application specific middleware
const appMiddleware=(req,res,next)=>{
    console.log("Application specific middleware");
next()
}

//giving appMiddleware to the entire server application ie, app
app.use(appMiddleware)


// //middleware to verify token
// const jwtMiddleware=(req,res,next)=>{

//     const token=req.body.token

//     //verify token
//     jwtMiddleware.verify(token,'supersecretkey123')
// }

//middleware to verify token using try and catch for error
const jwtMiddleware=(req,res,next)=>{

  try
  {  
    //   const token=req.body.token
      //normally token is given in headers.so instead ogf body give header and in square brackets give the name
      const token=req.headers["x-access-token"]

    //verify token
    const data=jwt.verify(token,'supersecretkey123')
    req.currentAcno=data.currentAcno
next()
}
catch
{
    res.status(422).json({
        statuscode:422,
        status:false,
        message:"please login"
    })
}
}







// //bank app- API
// //1 register API
// //req has 2 parts.head angd body. the one from client will be in request's body. authentication etc will be in req's head
// app.post('/register',(req,res)=>{
//     //calling register function(first import dataservice.js in index.js)
// const result=dataService.register(req.body.acno,req.body.pswd,req.body.uname) //variable name can be different during calling but it should be in the same order as that of function definition
// //this variable should be same as that in json of thunderclient
// if(result){
// res.send("Registered successfully")
// }
// else{
//     res.send("Already exist please log in")
// }

// })


// //bank app- API
// //1 register API (after defining register function based on status)
// //req has 2 parts.head angd body. the one from client will be in request's body. authentication etc will be in req's head
// app.post('/register',(req,res)=>{
//     //calling register function(first import dataservice.js in index.js)
// const result=dataService.register(req.body.acno,req.body.pswd,req.body.uname) //variable name can be different during calling but it should be in the same order as that of function definition
// //this variable should be same as that in json of thunderclient
// //now no need of this if and else case(ie next steps) since we have already defined it based on status in regiser definition

// // if(result){
// // res.send("Registered successfully")
// // }
// // else{
// //     res.send("Already exist please log in")
// // }

// instead we can give the entire result as response to client. also we should give the status
// res.status(result.statusCode).json(result)
// })


//bank app- API
//1 register API (after defining register function based on status)
app.post('/register',(req,res)=>{
const result=dataService.register(req.body.acno,req.body.pswd,req.body.uname)  
//we can give the entire result as response to client. also we should give the status
res.status(result.statusCode).json(result)
})

//2 login API 
app.post('/login',(req,res)=>{
    const result=dataService.login(req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)
})

//3 deposit API
// app.post('/deposit',(req,res)=>{
//     const result=dataService.deposit(req.body.acno,req.body.password,req.body.amt)
//     res.status(result.statusCode).json(result)
// })

//3deposit api after jwt token
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result=dataService.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
})


// //4 withdraw API
// app.post('/withdraw',(req,res)=>{
//     const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
//     res.status(result.statusCode).json(result)
// })

// //5 transaction API
// app.post('/transaction',(req,res)=>{
//     const result=dataService.getTransaction(req.body.acno,req.body.password,req.body.amt)
//     res.status(result.statusCode).json(result)
// })

// //4 withdraw API after jwt token
// app.post('/withdraw',jwtMiddleware,(req,res)=>{
//     const result=dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
//     res.status(result.statusCode).json(result)
// })

//4 withdraw API after jwt token and after login
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    const result=dataService.withdraw(req,req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
})





//5 transaction API after jwt token
app.post('/transaction',jwtMiddleware,(req,res)=>{
    const result=dataService.getTransaction(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
})






//step 3 setup the port number
///give the port number from 3000 and dont give 4200 as it has been already used. 
//if 4200 is used again it will show the msg port already in use
//the bracket after 3000 is callback function ie, function inside a function.it is usually not necessary. only the port no is enough
//format is app.listen(port no,(callback function)=>what you need to show)
app.listen(3000,()=>{
    console.log("server started at port no: 3000");
})