import jwt from 'jsonwebtoken';
import config from '../configuration/config';

const secret = config.secret;

class verify {
  static authentication(req, res, next) {
    const token = req.headers.accesstoken;
    if (!token) {
      jwt.verify(token, secret,
        (error, authenticationData) => {
          if (error) {
            return res.status(401).json({
              message: 'sign in please',
              error: true,
            });
          }
          req.authenticationData = authenticationData;
          return true;
        });
    }
    return next();
  }
  static Admin(req, res, next) {
    const token = req.headers.accesstoken;
    jwt.verify(token, secret, function (err, authdata) {
      if (err) {
        return console.log('ERROR: ', err);
      }
      if (authdata.type !== 'admin') {
        return res.status(401).json({
          message: 'Hi! This resource can only be accessed by an admin',
          error: true
        });
      } else {
        return next();
      }
    });
  }

  static Attendant(req, res, next) {
    const token = req.headers.accesstoken;
    jwt.verify(token, secret, function (err, authdata) {
      if (err) {
        return console.log('ERROR: ', err);
      }
      if (authdata.type !== 'admin') {
        return res.status(401).json({
          message: 'Hi! This resource can only be accessed by an attendant',
          error: true
        });
      } else {
        return next();
      }
    });
  }
}

export default verify;