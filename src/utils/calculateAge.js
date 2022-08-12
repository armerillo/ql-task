const ErrorResponse = require("./error.response");



async function calculateAge(dob) {

  if (!dob || dob == "") {
    throw new ErrorResponse("Please provide a date of birth", 400);
    // return res.status(400).json({
    //   error: "Please provide a date of birth",
    // });
  }

  const today = new Date();
  const birthDate = new Date(dob);
  if (birthDate == "Invalid Date") {
    throw new ErrorResponse("Only date format yyyy-mm-dd is allowed", 400);
    //return res.status(400).json({ error: "Only date format yyy-mm-dd is allowed" });
  }

  const age = today.getFullYear() - birthDate.getFullYear();
  if (age < 0) {
    throw new ErrorResponse(`Birth year cannot be greater than the current year ${today.getFullYear()}`, 400);
    // return res.status(400).json({
    //   error: `Birth year cannot be greater than the current year ${today.getFullYear()}`,
    // });
  }
  return age;
}

module.exports = calculateAge;
