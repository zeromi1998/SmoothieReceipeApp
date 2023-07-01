const userAuthErrors = (err) => {
  let errors = { email: "", password: "" };
  console.log("this is utility error", err.code);

  // Incorrecct Email

  if (err.message === "Incorrect Email") {
    errors.email = "That email is not register!";
  }

  if (err.message === "Incorrect password") {
    errors.password = "Passoword you enter is wrong!";
  }

  if (err.code === 11000) {
    errors.email = "Email already registerd";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error) => {
      //   console.log("error objecct", error);
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};

module.exports = userAuthErrors;
