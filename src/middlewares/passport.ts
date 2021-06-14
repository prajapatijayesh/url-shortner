/**
 * 
 */

import bcrypt from 'bcrypt';
import passport from 'passport';
import OAuth2Strategy from "passport-google-oauth2";
import { Strategy as LocalStrategy } from 'passport-local';
import * as _ from 'lodash';

import config from 'config';
import DB from '../databases';

const users = DB.Users;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } = config.get('google');

passport.serializeUser<any, any>((req, user, done) => {
    done(undefined, user);
});

passport.deserializeUser((id, done) => {
    users.findOne({ where: { id: id } }).then(user => {
        done(undefined, user);
    })
});

/**
 * LocalStrategy
 * username & password
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    users.findOne({ where: { email: email } }).then(async (user: any) => {
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        const isPasswordMatching: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) return done(409, "You're password not matching");

        return done(undefined, user);
    });
}));

/**
 * Google OAuth 2.0
 */
passport.use(new OAuth2Strategy.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    passReqToCallback: true
}, async function (req, accessToken, refreshToken, profile, done) {
    const profile_json = profile._json;
    console.log('profile_json', profile_json);
    const [user, created] = await users.findOrCreate({
        where: {
            profile_id: _.get(profile_json, 'sub'),
            provider: _.get(profile, 'provider'),
            givenName: _.get(profile_json, 'given_name'),
            familyName: _.get(profile_json, 'family_name'),
            email: _.get(profile_json, 'email')
        }
    });
    console.log('user', user.toJSON());
    console.log('profile', profile);
    req.currentUser = user.toJSON();
    return done(undefined, profile);
}));

export default passport;