const { Router } = require("express");
const router = Router();


/**
 * @description Calculate user age
 * @returns {number}
 */


router.get("/howold", async (req, res) => {
  return res.json({ message: "Welcome" });
});


module.exports = router;