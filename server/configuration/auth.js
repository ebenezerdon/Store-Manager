import express from 'express';
import jwt from 'jsonwebtoken';
import config from './config';
import users from '../models/users';

const app = express();
app.set('Secret', config.secret);

const ProtectedRoutes = express.Router();
app.use('/api', ProtectedRoutes);

const auth = app.post('/authenticate', (req, res, next) => {

    users.map((user) => {
        if (req.body.emailAdress === user.emailAdress) {
          if (req.body.password === user.password) {
              const payload = {
                  check: true
              };
              let token = jwt.sign(payload, app.get('Secret'), {
                  expiresIn: 1440 // expires in 24 hours
              });
              res.status(200).json({
                  message: 'authentication done ',
                  token: token
              });
  
          } else {
              res.json({
                  message: "please check your password !"
              });
          }
      } else {
          res.json({
              message: "user not found !"
          });
      }
  
      ProtectedRoutes.use((req, res, next) => {
          // check header for the token
          var token = req.headers['access-token'];
  
          // decode token
          if (token) {
              // verifies secret and checks if the token is expired
              jwt.verify(token, app.get('Secret'), (err, decoded) => {
                  if (err) {
                      return res.json({
                          message: 'invalid token'
                      });
                  } else {
                      // if everything is good, save to request for use in other routes
                      req.decoded = decoded;
                      next();
                  }
              });
  
          } else {
              // if there is no token  
              res.send({
                  message: 'No token provided.'
              });
          }
      });
      });
    }

);

export default auth;