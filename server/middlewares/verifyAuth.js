export const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.spilit(" ")[1];

    jwt.verify(token, getKey, options, function (err, decoded) {
      console.log(decoded.foo); // bar
    });
  }
};
