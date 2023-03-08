const UserModel = require("./index");

async function Auth({ email, password }){
  const user = await UserModel.getUserByEmail(email);
  if(user && user.password === password){
    return { ...user, success: true };
  }else{
    return { success: false }
  }
}

module.exports = Auth;
