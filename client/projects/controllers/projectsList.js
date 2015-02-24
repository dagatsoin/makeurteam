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