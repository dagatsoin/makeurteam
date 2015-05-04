angular.module("makeurteam").filter('candidate', function () {
  return function (users, project) {
    if (!project)
      return false;

    return _.filter(users, function (user) {
      if (user._id == project.owner ||
          _.contains(project.members, user._id) || ! _.contains(project.candidates, user._id))
        return false;
      else
        return true;
    });
  }
});