const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      
      default:
        "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1709374493~exp=1709375093~hmac=5c2e80bb078111e8d1ea11fc3ff395dffba167bc457b492635b9c2fb27d78f19",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre("save", async function(next){
  if(!this.isModified){
    next();
  }

  const salt= await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
})


const User = mongoose.model("User", userSchema);

module.exports = User;