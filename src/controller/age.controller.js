const { Router } = require("express");
const router = Router();
/**
 * @description Calculate user age
 * @returns {number}
 */

router.get("/howold", async (req, res) => {
  const { dob } = req.query;

  if (!dob || dob == "") {
    return res.status(400).json({
      error: "Please provide a date of birth",
    });
  }

   const today = new Date();
  const birthDate = new Date(dob);
   if (birthDate == "Invalid Date") {
    return res
  }
  
  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 0) {
     return res.status(400).json({
       error: `Birth year cannot be greater than the current year ${today.getFullYear()}`
     });
   }
  return res.status(200).json({
    success: true,
    data: {
      age,
    },
  });
});

module.exports = router;
