const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const config = require("config");
const auth = require("../middleware/auth");

//@route        POST api/users
//@desc         Register a user
//@access       Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6
    })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    //error checking
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          msg: "User already exists."
        });
      }

      //if user not exist
      user = new User({
        name,
        email,
        password
      });
      //hash the password by bcrypt
      //const salt = await bcrypt.genSalt(10);
      bcrypt.hash(user.password, 10, function(err, hash) {
        // Store hash in your password DB.
        if (err) {
          return console.error(err);
        }
        user.password = hash;

        user.save();

        //return jwt
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get("jwtsecret"),
          {
            expiresIn: 36000
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token
            });
          }
        );
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

//go to one user's cart
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});
//put item in the cart
router.post("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //const {itemID, }
    //console.log("req.body is :", req.body.id);
    if (req.body.id === null || req.body.id === undefined) {
      return res
        .status(401)
        .send("Bad request. Res.body must contain valid item id.");
    }
    await user.cart.push(req.body.id);
    //console.log("What is here??", user.cart);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

//remove item from cart
router.delete("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    //const {itemID, }
    //console.log("req.body is :", req.body.id);
    if (req.body.id === null || req.body.id === undefined) {
      return res
        .status(401)
        .send("Bad request. requset must contain valid item id.");
    }
    await user.cart.remove(req.body.id);
    //console.log("What is here??", user.cart);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
