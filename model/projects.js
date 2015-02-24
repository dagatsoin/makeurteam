Projects = new Mongo.Collection("projects");

Projects.allow({
  insert: function (userId, project) {
    return userId && project.owner === userId;
  },
  update: function (userId, project, fields, modifier) {
    if (userId !== project.owner)
      return false;

    return true;
  },
  remove: function (userId, project) {
    if (userId !== project.owner)
      return false;

    return true;
  }
});
