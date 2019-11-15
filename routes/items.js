const express = require("express");
const router = express.Router();


const Item = require("../models/Item");
//@route        Get api/items
//@desc         Get all items
//@access       Public
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


module.exports = router;