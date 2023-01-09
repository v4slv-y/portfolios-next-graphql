const uniqueSlug = require("unique-slug");
const slugify = require("slugify");

class Topic {
  constructor(model, user) {
    this.Model = model;
    this.User = user;
  }

  getAllByCategory(forumCategory) {
    return this.Model.find({ forumCategory })
      .populate("user")
      .populate("forumCategory");
  }

  async _create(data) {
    const createdTopic = await this.Model.create(data);
    return this.Model.findById(createdTopic._id)
      .populate("user")
      .populate("forumCategory");
  }

  async create(data) {
    console.log(this.User);
    if (!this.User) throw new Error("Only authenticated user can do this!");

    data.user = this.User;
    data.slug = slugify(data.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
    });

    try {
      const topic = await this._create(data);
      return topic;
    } catch (e) {
      if (e.code === 11000 && e.keyPattern && e.keyPattern.slug) {
        data.slug += `-${uniqueSlug()}`;
        const topic = await this._create(data);
        return topic;
      }
      return null;
    }
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug })
      .populate("user")
      .populate("forumCategory");
  }
}

module.exports = Topic;
