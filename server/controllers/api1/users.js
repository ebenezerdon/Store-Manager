import users from '../../models/users';

class Users {
    static getAll(req, res) {
        return (
            res.status(200).json(users)
        );
    }
    static getOne(req, res) {
        if ((req.params.id) > users.length ) {
            return (
                res.status(404).json
                ('Hi! Can you check again? There\'s no user with that id')
            );
        } else {
        return (
            res.status(200).json(users[req.params.id - 1])
        );}
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

        return (
            res.status(201).json({
                message: 'New user added!',
                user
            })
        );
    }
}
  
export default Users;