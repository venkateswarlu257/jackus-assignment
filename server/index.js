
import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userModel from './models/userModel.js';

const DBconnection = () => {
    mongoose.connect("mongodb://localhost:27017/myJackus")
    .then(() => console.log('DB connection established'))
    .catch(err => console.error('DB connection error:', err));
}
const app = express();

app.use(express.json());
app.use(cors());

DBconnection()

  app.post('/users',async(req,res) => {
    const {firstname,lastname,email,department} = req.body
        let newUser = new userModel({
            firstname:firstname,
            lastname:lastname,
            email:email,
            department:department,
            
        })
        try{
            const result = await newUser.save() 
        res.status(201).send({ message: 'Registered Successfully', status: 201, user: result });
        }catch(error){
            console.error(error);
            res.status(500).send({ message: 'Error creating user', error: error.message });
        }
  })

  app.get('/users', async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error retrieving users', error: error.message });
    }
  });

  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, department } = req.body;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        id,
        { firstname, lastname, email, department },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating user', error: error.message });
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await userModel.findByIdAndDelete({_id:id});
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  });
  
app.listen(5000, () => {
    console.log(`Server started at http://localhost:5000`);
});