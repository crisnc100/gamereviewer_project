import User from '../models/users.model.js'; 
import bcrypt from 'bcrypt';

//All CRUD Logic Here:
const UserController = {
  registerUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const newUser = await User.create({ firstName, lastName, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Logged in successfully', user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try{
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  getOneUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({message: "User not found"});
      res.json(user);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },
  updateUser: async (req, res) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
        individualHooks: true
      });
      if (!updated) return res.status(404).json({ message: 'User not found' });
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      await User.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default UserController;
