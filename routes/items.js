const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const {
    check,
    validationResult
} = require("express-validator");
const User = require("../models/User");

const config = require("config");
const auth = require("../middleware/auth");

//@route        Get api/items
//@desc         Get all items
//@access       Public
//for test auth, added some auth
router.get('/', async (req, res) => {
    try {
        let items = await Item.find();
        if (items) {
            res.json(items);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})



//@route  POST api/items
router.post('/', async (req, res) => {

    const items = req.body;
    items.map(async item => {
        try {
            const newTtem = new Item(item)
            const what = await newTtem.save();
            res.json(what)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error.")
        }
    })
})


//@route        Get api/items
//@desc         Get all items
//@access       private
//for test auth, added some auth
// router.put('/', auth, async (req, res) => {
//     try {
//         const items = req.body;
//         await 
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error.")
//     }
// })

module.exports = router;