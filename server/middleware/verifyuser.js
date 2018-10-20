import verifyToken from '../middleware/verifytoken';

class VerifyUser {
  static admin(req, res, next) {
    const { type } = req.authenticationData.type;
    if (type !== 'admin') {
      return res.status(401).json({
        message: 'Hi! This info can only be accessed by an admin',
        error: true
      });
    } else {
      return next();
    }
  }

  static attendant(req, res, next) {
    if (authData !== 'attendant') {
      return res.status(401).json({
        message: 'Hi! This info can only be accessed by an attendant',
        error: true
      });
    } else {
      return next();
    }
  }
}

export default VerifyUser;