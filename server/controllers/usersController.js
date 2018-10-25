import jwt from 'jsonwebtoken';
import users from '../models/usersModel';
import config from '../configuration/config';

const { secret } = config;

const getAllUsers = (req, res) => {
  return (
    res.status(200).json(users)
  );
};

const getOneUser = (req, res) => {
  if (!Number(req.params.id)) {
    return (
      res.status(400).json('The id has to be a number!')
    );
  }
  if ((req.params.id) > users.length) {
    return (
      res.status(404).json('Hi! Can you check again? There\'s no user with that id')
    );
  }
  return (
    res.status(200).json(users[req.params.id - 1])
  );
};

/* Adds a new user */
const addUser = (req, res) => {
  const user = {
    id: users.length + 1,
    fullName: req.body.fullName,
    emailAdress: req.body.emailAddress,
    password: req.body.password,
    type: req.body.type,
    createdAt: new Date(),
  };
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
};

const loginUser = (req, res) => {
  const {
    emailAdress,
    password,
    type,
  } = req.body;
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
};

export {
  getAllUsers, getOneUser, addUser, loginUser,
};
