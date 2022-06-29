const db = require("../db")
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async(req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
      email
    ]);

    if (userExists.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );

    const jwtToken = generateToken(newUser.rows[0].id);

    res.status(200).json({ 
      token: jwtToken,
      user: newUser.rows[0]
    
     });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

const login = async (req, res) => {

  const { username, password} = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [
      username
    ]); 

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = generateToken(user.rows[0].id);
    res.status(200).json({ 
      token: jwtToken,
      user: user.rows[0]    
     });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }   
}

module.exports = { registerUser, login };