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

Meteor.methods({
  applyTo: function (projectId, userId) {
    check(projectId, String);
    check(userId, String);
    var project = Projects.findOne(projectId);
    if (!project)
      throw new Meteor.Error(404, "No such project");
    
    if (userId !== project.owner && ! _.contains(project.members, userId) && ! _.contains(project.candidates, userId)) {
      Projects.update(projectId, { $addToSet: { candidates: userId } });

      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(userId));
    }
  },

  acceptCandidate: function (projectId, candidateId) {
    check(projectId, String);
    check(candidateId, String);
    var project = Projects.findOne(projectId);
    if (!project)
      throw new Meteor.Error(404, "No such project");
    if (project.owner !== this.userId)
      throw new Meteor.Error(404, "Tss tss...");

    if (candidateId !== project.owner && ! _.contains(project.members, candidateId) && _.contains(project.candidates, candidateId)) {
      Projects.update(projectId, { $addToSet: { members: candidateId } });
      Projects.update(projectId, { $pull: { candidates: candidateId } });

      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(candidateId));
    }
  },

  refuseCandidate: function (projectId, candidateId) {
    check(projectId, String);
    check(candidateId, String);
    var project = Projects.findOne(projectId);
    if (!project)
      throw new Meteor.Error(404, "No such project");
    if (project.owner !== this.userId)
      throw new Meteor.Error(404, "Tss tss...");

    if (candidateId !== project.owner && ! _.contains(project.members, candidateId) && _.contains(project.candidates, candidateId)) {
      Projects.update(projectId, { $pull: { candidates: candidateId } });

      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(candidateId));
    }
  },

  removeMember: function (projectId, memberId) {
    check(projectId, String);
    check(memberId, String);
    var project = Projects.findOne(projectId);
    if (!project)
      throw new Meteor.Error(404, "No such project");
    if (project.owner !== this.userId)
      throw new Meteor.Error(404, "No such project");

    if (memberId !== project.owner && _.contains(project.members, memberId)) {
      Projects.update(projectId, { $pull: { members: memberId } });

      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(memberId));
/*
      if (Meteor.isServer && to) {
        // This code only runs on the server. If you didn't want clients
        // to be able to see it, you could move it to a separate file.
        Email.send({
        from: "noreply@socially.com",
        to: to,
        replyTo: from || undefined,
        subject: "PARTY: " + project.title,
        text: "Hey, I just invited you to '" + project.title + "' on Socially." +
        "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
        });
      }*/
    }
  },

  fileUpload: function (fileInfo, fileData) {
        console.log("received file " + fileInfo.name + " data: " + fileData);
        fs.writeFile(fileInfo.name, fileData);
  }
});

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};


Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});

Images.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});