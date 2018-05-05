const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys           = require('../config/keys');
const mongoose       = require('mongoose');

const User = mongoose.model('users');


passport.serializeUser((user,done) => {
	done(null,user.id);
});


passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
	});
});

passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
  	User.findOne({ googleID: profile.id })
  		.then((existingUser) =>{
  			if(existingUser){
  				//we already have a record within given profile id
  				done(null,existingUser);
  			}else{
  				// we don't have a user record with this id make a new record
   				new User({googleID : profile.id})
   					.save()
   					.then(user => done(null, user));
  			}
  		})
  })
);