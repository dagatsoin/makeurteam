angular.module("makeurteam").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'client/projects/views/projects-list.ng.html',
        controller: 'ProjectsListCtrl'
      })
      .state('projectDetails', {
        url: '/projects/:projectId',
        templateUrl: 'client/projects/views/project-details.ng.html',
        controller: 'ProjectDetailsCtrl'
      });

      $urlRouterProvider.otherwise("/projects");
}]);