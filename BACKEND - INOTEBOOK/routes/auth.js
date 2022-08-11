const express = require("express");
const User = require("../models/Usermodel");
const db = require("../db");
const { body, validationResult, check } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();
const jwt_secret = "hellothere!";

//create a user using post request, Route : /auth/addUser
// start ...
router.post(
  "/addUser",
  [
    body("name","Enter a valid name").isLength({ min: 5 }),
    body("email","Enter a valid email").notEmpty().isEmail(),
    body("phone","Enter a valid phone").isLength({ min: 10, max: 10 }),
    body("password","Enter a valid password").notEmpty(),
  ],
  async (req, res) => {
    let success = false;
    // if a user maked bad request check for that
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
      });
      // console.log(user);
      if (user) {
        return res.status(400).json({ success,error: "same email or phone found!!" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, jwt_secret);
      return res.json({success, authToken });
    } catch (e) {
      console.log(e);
      res.status(500).send("some error occured!!");
    }
  }
);
//end post user i.e. signup..


//login the user, creating post request, no login required, Route:- /auth/login
//start...
router.post(
  "/login",
  [body("email").notEmpty().isEmail(), check("password").notEmpty()],
  async (req, res) => {
    // if a user maked bad request check for that
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ error: "email does not exists!" });

      //bcrypt compare will compare the password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({success, error: "passwrod does not match!" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authToken = jwt.sign(data, jwt_secret);
      return res.json({success, authToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ e });
    }
  }
);
//end ...

//ROUTE 3 : logged in user details using middleware fetchUser with route /auth/getUser
router.get('/getUser',fetchUser, async (req,res)=>{

  try{
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    return res.status(400).json(user);
  }catch(e){
    console.log(e);
    res.status(500).json({e});
  }

})


module.exports = router;
