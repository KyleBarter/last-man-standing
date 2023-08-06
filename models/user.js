//! Signing up a user

// ? Lecture
// 1. JWT https://jwt.io
// JWT cryptographically signed
// contains 3 parts: a HEADER string (b64e), a payload string (b64e) & a secret
// Used to authenticate a user, and will contain a unique id for the user
// Secure as created using our secret that we store on the server (in a .env file)
// Token based allows for SSO (single-sign-on), for example log into google, gmail, docs etc
// Session based requires cookies and a browser, cant be used outside a browser

// ? Into the code
// Create a model file for users
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    // Even though it's hashed - don't serialize the password
    transform: function(doc, ret){
      delete ret.password;
      return ret;
    }
  }
})


// Add the model options:
// toJSON: https://mongoosejs.com/docs/api/document.html#Document.prototype.toJSON()
// All options for toJSON found on the toObject entry: https://mongoosejs.com/docs/api/document.html#Document.prototype.toObject()


// Add a pre save to hash password
// Doc link: https://mongoosejs.com/docs/middleware.html#pre
// Using Bcrypt: https://www.npmjs.com/package/bcrypt
// Wiki link for bcrypt: https://en.wikipedia.org/wiki/Bcrypt
// Bcrypt generator: https://bcrypt-generator.com/

// Bcrypt created in 1999
// Salts are added into a string to prevent against rainbow table attacks which is a table containing the outputs of cryptographic hashing functions, used to crack hashes
// Salts make the result of the function different each time making these attacks ineffective
// Salts are just a random string
// Rounds are used to increase the time it takes to compute, making it hard for brute force attacks. We can also fight this on a server level

// npm i bcrypt

const bcrypt = require('bcrypt')
const SALT_ROUNDS = 6;


userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model('User', userSchema);



