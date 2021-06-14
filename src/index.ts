import express from "express";
import morgan from "morgan";
import BaseRouter from "./routes"
import passport from "passport";
import OAuth2Strategy from "passport-google-oauth2"
const app = express();
const PORT = Number(process.env.PORT || 3000);

// show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api', BaseRouter);


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user: any, cb: any) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb: any) {
    cb(null, obj);
});

const GOOGLE_CLIENT_ID = '808133427251-l0j60jnfll48vifs00ksa5nul792q8a9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'q4T4Y1tJaKowFzjpQpyShM3s';
passport.use(new OAuth2Strategy.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(refreshToken);

        return done(null, profile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/success');
    });

app.get('/error', (req, res) => res.send("error logging in"));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



