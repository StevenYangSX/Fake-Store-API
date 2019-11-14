const express = require('express');
const router = express.Router();


//@route        POST api/items
//@desc         Get all items
//@access       Public
router.get('/', (req, res) => {
    res.send("Get all items")
})


module.exports = router;