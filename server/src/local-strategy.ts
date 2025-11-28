import passport from 'passport';
import { Strategy } from 'passport-local';
import { IUser, User } from './user-schema';
import { comparePassword } from './utils/helpers';


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
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Invalid credentials' });
      if (!comparePassword(password, user.password)) return done(null, false, { message: 'Invalid credentials' });
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

