import jwt from 'jsonwebtoken';
import verifyToken from './verifytoken';

const authData = verifyToken.authenticationData;

class VerifyUser {
  static admin(req, res, next) {
    if (authData !== 'admin') {
      return res.status(300).json({
        message: 'Hi! This info can only be accessed by an admin',
        error: true
      });
    } else {
      return next();
    }
  }

  static attendant(req, res, next) {
    if (authData !== 'attendant') {
      return res.status(300).json({
        message: 'Hi! This info can only be accessed by a user',
        error: true
      });
    } else {
      return next();
    }
  }
}

export default VerifyUser;