import passport from 'passport';
import { Strategy } from 'passport-local';
import { IUser, User } from './user-schema';
import { comparePassword } from './helpers';


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      console.log(email, password)
      const user = await User.findOne({ email });
      if (!user) throw new Error('User not found');
      console.log(user.password)
      if (password !== user.password)
        throw new Error('Invalid password');
      console.log('here')
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

