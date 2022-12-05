class User {
  constructor(model) {
    this.Model = model; // shema mongoose
  }

  singUp(singUpData) {
    if (singUpData.password !== singUpData.passwordConfirmation) {
      throw new Error("Password must be the same as confirmation password!");
    }
    return this.Model.create(singUpData);
  }

  async singIn(singInData, ctx) {
    try {
      const user = await ctx.authenticate(singInData);
      console.log(user);
      return user;
    } catch (error) {
      return error;
    }
  }

  singOut(ctx) {
    try {
      console.log("before logout.......");
      console.log("is Authenticacted, ", ctx.isAuthenticated());
      ctx.logout();
      console.log("after logout.......");
      console.log("is Authenticacted, ", ctx.isAuthenticated());

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = User;
