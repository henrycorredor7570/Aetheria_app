import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../db.js";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//Configura la estrategia de google
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try{
        //busca o crea el usuario en la base de datos:
        let user = await User.findOne({ where: { email: profile.emails[0].value }});
        if(!user) {
            user = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                is_verified: true,
                //podemos guardar el id de google si lo deseamos:
                profile_picture: profile.photos[0]?.value,
                role: "user"
            });
        }
        return done(null, user);
    } catch (err){
        return done(err, null);
    }
}));

//serialización / desderialización para la sesión:
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

export default passport;

