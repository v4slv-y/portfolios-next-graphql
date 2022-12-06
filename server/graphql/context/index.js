const passport = require("passport");

const authenticateUser = (options, req) => {
  return new Promise((resolve, reject) => {
    const done = (err, user) => {
      if (err) return reject(new Error(err));
      if (user) {
        req.login(user, (err) => {
          if (err) return reject(new Error(err));
          return resolve(user);
        });
      } else return reject(new Error("Invalid Password or email"));
    };

    passport.authenticate("graphql-default", options, done)();
  });
};

exports.buildAuthContext = (req) => {
  const auth = {
    authenticate: (options) => authenticateUser(options, req),
    logout: () => {
      // console.log(req);
      req.logout();
    },
    isAuthenticated: () => req.isAuthenticated(),
    getUser: () => req.user,
  };

  return auth;
};
