import jwt from 'jsonwebtoken';
import config from '../configuration/config';

const secret = config.secret;

class verifyToken {
  static authentication(req, res, next) {
    const token = req.headers.accesstoken;
    if(!token) {
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
}

export default verifyToken;