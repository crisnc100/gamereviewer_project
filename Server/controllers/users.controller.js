import User from '../models/users.model.js'; 
import bcrypt from 'bcrypt';

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
  }
};

export default UserController;
