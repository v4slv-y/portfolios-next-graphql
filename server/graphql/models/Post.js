const uniqueSlug = require("unique-slug");
const moment = require("moment");

class Post {
  constructor(model, user) {
    this.Model = model;
    this.User = user;
  }

  async getAllByTopic(topic, pageNum = 1, pageSize = 5) {
    const skips = pageSize * (pageNum - 1);
    const count = await this.Model.countDocuments({ topic });
    const posts = await this.Model.find({ topic })
      .sort("createdAt")
      .skip(skips)
      .limit(pageSize)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });

    return { posts, count };
  }

  async create(post) {
    if (!this.User) throw new Error("You must be logged in to create post!");

    post.user = this.User;
    const createdAt = moment().toISOString();
    const slugPart = uniqueSlug();
    const fullSlugPart = createdAt + ":" + slugPart;

    if (post.parent) {
      const parent = await this.Model.findById(post.parent);
      post.slug = parent.slug + "/" + slugPart;
      post.fullSlug = parent.fullSlug + "/" + fullSlugPart;
    } else {
      post.slug = slugPart;
      post.fullSlug = fullSlugPart;
    }

    const createdPost = await this.Model.create(post);
    return this.Model.findById(createdPost._id)
      .populate("topic")
      .populate("user")
      .populate({ path: "parent", populate: "user" });
  }
}

module.exports = Post;
