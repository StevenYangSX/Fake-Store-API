const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
    check,
    validationResult
} = require("express-validator");
const User = require("../models/User");

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

        const {
            name,
            email,
            password
        } = req.body;

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
            bcrypt.hash(user.password, 10, function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return console.error(err);
                }
                user.password = hash;
                user.save();
                res.send("User Saved.");
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error.");
        }
    }
);

module.exports = router;