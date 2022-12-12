class Portfolio {
  constructor(model, user) {
    this.Model = model;
    this.User = user;
    this.WriteRights = ["instructor", "admin"];
  }
  async getAll() {
    return await this.Model.find({});
  }
  async getById(id) {
    return await this.Model.findById(id);
  }
  async create(data) {
    if (!this.User || !this.WriteRights.includes(this.User.role))
      throw new Error("Not authorised!");

    data.user = this.User;
    return await this.Model.create(data);
  }
  async findAndUpdate(id, data) {
    return await this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
  async findAndDelete(id) {
    return await this.Model.findOneAndDelete({ _id: id });
  }
  async getAllByUser(ctx) {
    console.log("user from getAllByUser resolver: ", ctx.getUser());
    const realUser = ctx.getUser();
    return await this.Model.find({ user: realUser._id }).sort({
      startDate: "desc",
    });
  }
}

module.exports = Portfolio;
