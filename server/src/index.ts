import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import './user-schema'
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { User } from './user-schema';

mongoose
  .connect('mongodb://127.0.0.1/visa_coach')
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(`Error: ${err}`));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(session({
  secret: 'temp key',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 60000 * 60 },
  store: MongoStore.create({
    client: mongoose.connection.getClient()
  })

}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (request, response) => {
  response.json({ message: 'Sign In' });
})

app.post('/api/auth', passport.authenticate('local'), (request, response) => {
  response.sendStatus(200);
})

app.post('/api/register', async (request, response) => {
  const newUser = new User(request.body);
  try {
      const savedUser = await newUser.save();
      response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      response.sendStatus(400);
    }
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})