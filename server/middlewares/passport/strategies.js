const { Strategy } = require("passport-strategy");

class GraphQlStrategy extends Strategy {
  constructor(verify) {
    super();

    if (!verify) throw new Error("GraphQL strategy require verify callback");

    this.verify = verify;
    this.name = "graphql-default";
  }

  authenticate(_, options) {
    const done = (error, user, info) => {
      if (error) return this.error(error);
      if (!user) return this.fail(401);

      return this.success(user, info);
    };

    this.verify(options, done);
  }
}
module.exports = GraphQlStrategy;

// Strategy get options(email, password) needed to authenticate user
// Strategy gets a callback function that will contain functionality to verify an user
// Strategy has to have "authenticate" function
// Strategy has access to "error" "fail" "success" functions
