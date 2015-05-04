angular.module("makeurteam").filter('member', function () {
  return function (users, project) {
    if (!project)
      return false;

    return _.filter(users, function (user) {
      if (user._id == project.owner ||
          ! _.contains(project.members, user._id))
        return false;
      else
        return true;
    });
  }
});