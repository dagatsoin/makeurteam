Projects = new Mongo.Collection("projects");

if (Meteor.isClient) {

  angular.module('makeurteam',['angular-meteor','ui.router']);

  angular.module("makeurteam").controller("ProjectsListCtrl", ['$scope', '$meteor',
    function($scope, $meteor){

      $scope.projects = $meteor.collection(Projects);

      $scope.remove = function(project){
        $scope.projects.splice( $scope.projects.indexOf(project), 1 );
      };

      $scope.removeAll = function(){
        $scope.projects.remove();
      };

    }]);

  angular.module("makeurteam").controller("ProjectDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){

      $scope.project = $meteor.object(Projects, $stateParams.projectId);

    }]);

  angular.module("makeurteam").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('projects', {
          url: '/projects',
          templateUrl: 'projects-list.ng.html',
          controller: 'ProjectsListCtrl'
        })
        .state('projectDetails', {
          url: '/projects/:projectId',
          templateUrl: 'project-details.ng.html',
          controller: 'ProjectDetailsCtrl'
        });

        $urlRouterProvider.otherwise("/projects");
  }]);
}

if (Meteor.isServer) {
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
}
