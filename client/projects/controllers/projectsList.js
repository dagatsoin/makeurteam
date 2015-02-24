angular.module("makeurteam").controller("ProjectsListCtrl", ['$scope', '$meteor', '$rootScope',
  function($scope, $meteor, $rootScope){

	$scope.page = 1;
	$scope.perPage = 3;
	$scope.sort = { title: 1 };
	$scope.orderProperty = '1';

    $scope.projects = $meteor.collection(function() {
    	return Projects.find({}, {
  			sort : $scope.getReactively('sort')
  		});
    });

    $meteor.autorun($scope, function() {
	    $meteor.subscribe('projects', {
				limit: parseInt($scope.getReactively('perPage')),
				skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
				sort: $scope.getReactively('sort')
			}, $scope.getReactively('search')).then(function(){
				$scope.projectsCount = $meteor.object(Counts ,'numberOfProjects', false);
			});
		});

		$scope.pageChanged = function(newPage) {
		  $scope.page = newPage;
		};

    $scope.remove = function(project){
      $scope.projects.splice( $scope.projects.indexOf(project), 1 );
    };

    $scope.$watch('orderProperty', function(){
      if ($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $meteor.subscribe('users');

	$scope.getUserById = function(userId){
	  return Meteor.users.findOne(userId);
	};

	$scope.creator = function(project) {

		if(!project) return;

		var owner = $scope.getUserById(project.owner);
		
		if(!owner) return "nobody";

		if($rootScope.currentUser)
			if($rootScope.currentUser._id)
				if(owner._id === $rootScope.currentUser._id)
					return "me";

		return owner;
	}

}]);