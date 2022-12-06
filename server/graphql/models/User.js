class User {
  constructor(model) {
    this.Model = model; // shema mongoose
  }

  async singUp(singUpData) {
    if (singUpData.password !== singUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }

    try {
      return await this.Model.create(singUpData);
    } catch (err) {
      if (err.code && err.code === 11000)
        throw new Error("User with this email already exists.");

      throw err;
    }
  }

  async singIn(singInData, ctx) {
    try {
      const user = await ctx.authenticate(singInData);
      console.log("is Authenticacted, ", ctx.isAuthenticated());
      console.log("User: ", ctx.getUser());
      // console.log(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  singOut(ctx) {
    try {
      console.log("User: ", ctx.getUser());
      console.log("before logout.......");
      console.log("is Authenticacted, ", ctx.isAuthenticated());
      ctx.logout();
      console.log("after logout.......");
      console.log("is Authenticacted, ", ctx.isAuthenticated());
      console.log("User: ", ctx.getUser());

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = User;
