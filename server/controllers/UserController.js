import jwt from 'jsonwebtoken';
import users from '../../models/users';
import config from '../../configuration/config';

const secret = config.secret;
class Users {
  static getAll(req, res) {
    return (
      res.status(200).json(users)
    );
  }

  static getOne(req, res) {
    if ((req.params.id) > users.length) {
      return (
        res.status(404).json('Hi! Can you check again? There\'s no user with that id')
      );
    }

    return (
      res.status(200).json(users[req.params.id - 1])
    );
  }

  /* Adds a new user */
  static addUser(req, res) {
    const user = new Users(); // creates a new instance of Products model
    user.id = users.length + 1;
    user.fullName = req.body.fullName;
    user.emailAdress = req.body.emailAdress;
    user.password = req.body.password;
    user.type = req.body.type;
    user.createdAt = new Date();
    users.push(user);

    if (!req.body.fullName && !req.body.emailAdress &&
      !req.body.password) {
      return (
        res.status(400).json('Hi! Can you try again? Your input is invalid')
      );
    }
    return (
      res.status(201).json({
        message: 'New user added!',
        user,
      })
    );
  }

  static loginUser(req, res) {
    const { emailAdress, password, type } = req.body;
    let authDetail;
    let userFound = false;
    users.map((user) => {
      if (emailAdress === user.emailAdress &&
        password === user.password && type === user.type) {
        userFound = true;
        authDetail = user;
      }
    });
    if (userFound) {
      const token = jwt.sign(authDetail, secret, {
        expiresIn: '24hr',
      });
      return (
        res.status(200).json({ token })
      );
    }
    return (
      res.status(404).json({
        message: 'Hi! Can you check again? Ther\'s no user with that id',
      }));
  }
}

export default Users;
