 angular.module("makeurteam").controller("ProjectDetailsCtrl", ['$scope', '$stateParams', '$meteor',
    function($scope, $stateParams, $meteor){

      $scope.project = $meteor.object(Projects, $stateParams.projectId);

    }]);