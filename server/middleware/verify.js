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
    jwt.verify(token, secret, (err, authdata) => {
      if (err) {
        return console.log('ERROR: ', err);
      }
      const authdataType = authdata.type;
      if (authdataType !== 'admin') {
        return res.status(401).json({
          message: 'Hi! You can only access this resource if you are an admin',
          error: true,
        });
      }
      return next();
    });
  }

  static Attendant(req, res, next) {
    const token = req.headers.accesstoken;
    jwt.verify(token, secret, (err, authdata) => {
      if (err) {
        return console.log('ERROR: ', err);
      }
      if (authdata.type !== 'attendant') {
        return res.status(401).json({
          message: 'Hi! This resource can only be accessed by an attendant',
          error: true,
        });
      }
      return next();
    });
  }
}

export default verify;
