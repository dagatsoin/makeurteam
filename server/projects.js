Meteor.publish("projects", function (options, searchString) {
  if (searchString == null)
    searchString = ''; 

  Counts.publish(this, 'numberOfProjects', Projects.find({
    'title' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
    $or:[
      {$and:[
        {"published": true},
        {"published": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
  ]}), { noReady: true });
  return Projects.find({
    'title' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },    
    $or:[
      {$and:[
        {"published": true},
        {"published": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]}, options);
});