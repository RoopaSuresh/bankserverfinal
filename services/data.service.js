database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1000, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1000, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }

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
const register = (acno, pswd, uname) => {

  if (acno in database) {
    return {
      statusCode: 422,
      status: false,
      message: "User already exist please login"
    }
  }
  else {

    database[acno] = {
      acno,
      uname,
      password: pswd, //key:value
      balance: 0,
      transaction: []
    }
    console.log(database)
    // return true
    return {
      statusCode: 200,
      status: true,
      message: "Successfully registered"

    }
  }
}




//login
const login = (acno, password) => {

  if (acno in database) {
    if (password == database[acno]["password"]) {
      currentAcno = acno
      //storing uname into a variable
      currentUname = database[acno]["uname"]
      // return true
      return {
        statusCode: 200,
        status: true,
        message: "Successfully logged in",
        currentAcno,
        currentUname
      }
    }
    else {
      // return false
      return {
        statusCode: 422,
        status: false,
        message: "Incorrect password"

      }
    }
  }
  else {
    // return false
    return {
      statusCode: 422,
      status: false,
      message: "User does not exist"

    }
  }
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







//exporting
module.exports = {
  register,
  login,
  deposit
}
