# Introduction

JWT in React and Node.js for authentication and authorization.

# Learning outcomes

- JWT for authorization and authentication by creating register, login and logout routes.
- How to authorize users to use private routes by verifying JWT in the authorization header of the HTTP request .

# Import links

- https://www.npmjs.com/package/jsonwebtoken
- https://github.com/auth0/node-jsonwebtoken

  Allows to decode, verify and generate JWT.
  jwt.sign(payload, secretKey, [options, callback]) and jwt.verify(token, secretKey, [options, callback]) are the most important features.

- https://www.npmjs.com/package/cookie-parser

  The middleware will parse the Cookie header on the request and expose the cookie data as the property req.cookies along with provided secret token and options.

- https://www.npmjs.com/package/bcrypt

  A library to help to hash passwords.
