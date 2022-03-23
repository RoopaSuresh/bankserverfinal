//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import User
const db= require('./db')




database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }

}

// //register define
//  const register=(acno, pswd, uname)=> {

//     if (acno in database) {
//       return false
//     }
//     else {

//       database[acno] = {
//         acno,
//         uname,
//         password: pswd, //key:value
//         balance: 0,
//         transaction:[]
//       }
//       console.log(database)
//       return true
//     }
//   }


//register defining based on status
// const register = (acno, pswd, uname) => {

//   if (acno in database) {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "User already exist please login"
//     }
//   }
//   else {

//     database[acno] = {
//       acno,
//       uname,
//       password: pswd, //key:value
//       balance: 0,
//       transaction: []
//     }
//     console.log(database)
//     // return true
//     return {
//       statusCode: 200,
//       status: true,
//       message: "Successfully registered"

//     }
//   }
// }

//register using mongodb
const register = (acno, password, uname) => {

//asynchronous
  return db.User.findOne({
    //key:value key shouldbe the one defined in model and value should be the one which is inside register function bracket
    //since key and value are same just type it once
    acno
  })
  .then(user=>{
    console.log(user);
    if(user){
      return {
        statusCode: 422,
        status: false,
        message: "User already exist please login"
      }  
    }
    else{
      const newUser=new db.User({
        //since key and value are same just acno is enough
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      })
      newUser.save()
      return{
        statusCode: 200,
        status: true,
        message: "Successfully registered"
  
      }
    }
  })

}








// //login
// const login = (acno, password) => {

//   if (acno in database) {
//     if (password == database[acno]["password"]) {
//       currentAcno = acno
//       //storing uname into a variable
//       currentUname = database[acno]["uname"]
//       // return true
//       return {
//         statusCode: 200,
//         status: true,
//         message: "Successfully logged in",
//         currentAcno,
//         currentUname
//       }
//     }
//     else {
//       // return false
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Incorrect password"

//       }
//     }
//   }
//   else {
//     // return false
//     return {
//       statusCode: 422,
//       status: false,
//       message: "User does not exist"

//     }
//   }
// }


//login after jwt token generation
// const login = (acno, password) => {

//   if (acno in database) {
//     if (password == database[acno]["password"]) {
//       currentAcno = acno
//       //storing uname into a variable
//       currentUname = database[acno]["uname"]

//       //token generation
//       const token = jwt.sign({
//         currentAcno: acno
//       }, 'supersecretkey123')

//       return {
//         statusCode: 200,
//         status: true,
//         message: "Successfully logged in",
//         currentAcno,
//         currentUname,
//         token
//       }
//     }
//     else {
//       // return false
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Incorrect password"

//       }
//     }
//   }
//   else {
//     // return false
//     return {
//       statusCode: 422,
//       status: false,
//       message: "User does not exist"

//     }
//   }
// }



//login after mongo db
const login = (acno, password) => {
//asynchronous
return db.User.findOne({acno,password})
.then(user=>{
  if(user){
    currentAcno = acno
    //storing uname into a variable
    currentUname = user.uname
  
    //token generation
    const token = jwt.sign({
      currentAcno: acno
    }, 'supersecretkey123')
  
    return {
      statusCode: 200,
      status: true,
      message: "Successfully logged in",
      currentAcno,
      currentUname,
      token
    }
  }
  else {
    // return false
    return {
      statusCode: 422,
      status: false,
      message: "Incorrect password/Account number"
  
    }
  }
  
})
 
}










//deposit definition
const deposit = (acno, password, amt) => {
  var amount = parseInt(amt)

  if (acno in database) {
    if (password == database[acno]["password"]) {
      database[acno]["balance"] += amount
      database[acno]["transaction"].push({
        //key:value
        amount: amount,
        type: "CREDIT"
      })
      return {
        statusCode: 200,
        status: true,
        message: amount + " successfully deposited and new balance is " + database[acno]["balance"]
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Incorrect password"
      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "User does not exist"

    }
  }
}



// //withdraw definition
// const withdraw = (acno, password, amt) => {
//   var amount = parseInt(amt)

//   if (acno in database) {
//     if (password == database[acno]["password"]) {
//       if (database[acno]["balance"] > amount) {
//         database[acno]["balance"] -= amount
//         database[acno]["transaction"].push({
//           //key:value
//           amount: amount,
//           type: "DEBIT"
//         })
//         return {
//           statusCode: 200,
//           status: true,
//           message: "Amount is successfully debited and new amount is" + database[acno]["balance"],

//         }

//       }
//       else {
//         return {
//           statusCode: 422,
//           status: false,
//           message: "insufficient balance"

//         }
//       }
//     }
//     else {
//       return {
//         statusCode: 422,
//         status: false,
//         message: "Incorrect password"

//       }
//     }
//   }
//   else {
//     return {
//       statusCode: 422,
//       status: false,
//       message: "User does not exist"

//     }
//   }
// }


//withdraw definition after token and middleware
const withdraw = (req,acno, password, amt) => {
  var amount = parseInt(amt)

  var currentAcno=req.currentAcno

  if (acno in database) {

    if (password == database[acno]["password"]) {

if(currentAcno==acno){

  if (database[acno]["balance"] > amount) {
    database[acno]["balance"] -= amount
    database[acno]["transaction"].push({
      //key:value
      amount: amount,
      type: "DEBIT"
    })
    return {
      statusCode: 200,
      status: true,
      message: "Amount is successfully debited and new amount is" + database[acno]["balance"],

    }

  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "insufficient balance"

    }
  }
}
else{
  return {
    statusCode: 422,
    status: false,
    message: "operation denied"

  }
}


    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "Incorrect password"

      }
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "User does not exist"

    }
  }
}











//transaction history
const getTransaction = (acno) => {
  if (acno in database) {
    return {
      statusCode: 200,
      status: true,
      transaction: database[acno]["transaction"]
    }
  }
  else {
    return {
      statusCode: 422,
      status: false,
      message: "User does not exist"
    }
  }
}










//exporting
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}
