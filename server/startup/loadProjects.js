Meteor.startup(function () {
  if (Projects.find().count() === 0) {
    var projects = [
      {'title': 'Dubstep-Free Zone',
        'description': 'Fast just got faster with Nexus S.'},
      {'title': 'All dubstep all the time',
        'description': 'Get it on!'},
      {'title': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.'}
    ];
    for (var i = 0; i < projects.length; i++)
      Projects.insert({title: projects[i].title, description: projects[i].description});
  }
});