const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 12);
  }

  next();
})


//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
