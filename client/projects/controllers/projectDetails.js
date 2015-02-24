 angular.module("makeurteam").controller("ProjectDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){

      $scope.project = $meteor.object(Projects, $stateParams.projectId).subscribe('projects');
      $scope.users 	 = $meteor.collection(Meteor.users, false).subscribe('users');
    }
]);