const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt');


module.exports = {
    create,
    login,
    checkToken
}


function checkToken(req, res){
  console.log('req.user', req.user)
  res.json(req.exp)
}

// Create jwt using jwt.sign
// send it back to the user using res.json
async function create(req, res) {
    try {
        // Add the user to the database
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user);
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        console.log(token)
        return res.json(token);
    } catch (err) {
        // Client will check for non-2xx status code 
        // 400 = Bad Request
        console.log('create ctrl error')
        res.status(401).json(err);
    }
}

async function login(req, res){
  console.log('login ctrl')
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error('user not found');
    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) throw new Error('password incorrect');
    res.json( createJWT(user) );
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad credentials')
  }
}

/*-- Helper Functions --*/
function createJWT(user) {
  return jwt.sign(
    // extra data for the payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}