import jwt from 'jsonwebtoken';
import config from '../configuration/config';

const { secret } = config;

const authenticate = (req, res, next) => {
  const token = req.headers.accesstoken;
  if (!token) {
    return res.status(401).json({
      message: 'Hi! You\'re not authorized to use this resource.',
    });
  }
  jwt.verify(token, secret, (error) => {
    if (error) {
      return res.status(401).json({
        message: 'Invalid authencation! Can you check and try again?',
        error: true,
      });
    }
    return next();
  });
};

const verifyAdmin = (req, res, next) => {
  const token = req.headers.accesstoken;
  jwt.verify(token, secret, (err, authdata) => {
    if (authdata.type !== 'admin') {
      return res.status(401).json({
        message: 'Hi! This resource can only be accessed by an admin',
        error: true,
      });
    }
    return next();
  });
};

const verifyAttendant = (req, res, next) => {
  const token = req.headers.accesstoken;
  jwt.verify(token, secret, (err, authdata) => {
    if (authdata.type !== 'attendant') {
      return res.status(401).json({
        message: 'Hi! This resource can only be accessed by an attendant',
        error: true,
      });
    }
    return next();
  });
};

export { authenticate, verifyAdmin, verifyAttendant };
