const jwt = require("jsonwebtoken"); 


// role : verify if user is authenticated or not with the jwt token provided by the user in the http request header

function isauth (req, res, next)  {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, "jwt-secret");
    // Add user from payload
    req.user = decoded;
    console.log("decoded user from token",decoded);
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = isauth