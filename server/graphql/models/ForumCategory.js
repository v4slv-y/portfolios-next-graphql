class ForumCategory {
  constructor(model) {
    this.Model = model;
  }

  getBySlug(slug) {
    return this.Model.findOne({ slug });
    // return this.Model.findOne({slug}).populate('user');
  }

  getAll() {
    return this.Model.find({});
  }
}

module.exports = ForumCategory;
