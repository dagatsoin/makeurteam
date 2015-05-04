 angular.module("makeurteam").controller("ProjectDetailsCtrl", ['$scope', '$stateParams', '$meteor', 'FileUploader',
    function($scope, $stateParams, $meteor, FileUploader){
	    $scope.project = $meteor.object(Projects, $stateParams.projectId, false).subscribe('projects');
	    $scope.users 	 = $meteor.collection(Meteor.users, false).subscribe('users');
	    $scope.uploader = new FileUploader();
			$scope.map = {
			  center: {
			    latitude: $scope.project.location?$scope.project.location.latitude:46.724,
			    longitude: $scope.project.location?$scope.project.location.longitude: 2.117618,
			  },
			  zoom: 5,
			  events: {
			    click: function (mapModel, eventName, originalEventArgs) {
			      if (!$scope.project)
			        return;

			      if (!$scope.project.location)
			        $scope.project.location = {};

			      $scope.project.location.latitude = originalEventArgs[0].latLng.lat();
			      $scope.project.location.longitude = originalEventArgs[0].latLng.lng();
			      //scope apply required because this event handler is outside of the angular domain
			      $scope.$apply();
			    }
			  },
			  marker: {
			    options: { draggable: true },
			    events: {
			      dragend: function (marker, eventName, args) {
			        if (!$scope.project.location)
			          $scope.project.location = {};

			        $scope.project.location.latitude = marker.getPosition().lat();
			        $scope.project.location.longitude = marker.getPosition().lng();
			      }
			    }
			  }
			};

			var fileId; //store the id of the uploaded file
	    $scope.upload = function(file) {
	        Images.insert(file._file, function (err, fileObj) {
	            if (err) console.log(err);
	            else {
	                fileId = fileObj._id //get the id of the upload file
	            }
	        });
	    };
			//Some Reactive tracker to check when the file its ready
			Tracker.autorun(function (computation) {
			   var fileObj =  Images.findOne(fileId);
			   
			   if (fileObj) {
			   		
			   		$scope.project.teaserImg = "/cfs/files/images/" + fileId;
			   		$scope.$apply(); //Force the refresh
			      computation.stop();
			   }
			});

			$scope.save = function() {
			  $scope.project.save();
			};

			$scope.reset = function() {
			  $scope.project.reset();
			};
			$scope.removeMember = function(member){
			  $meteor.call('removeMember', $scope.project._id, member._id).then(
			    function(data){
			      console.log('member removed', data);
			    },
			    function(err){
			      console.log('failed', err);
			    }
			  );
			};
			$scope.acceptCandidate = function(candidate){
			  $meteor.call('acceptCandidate', $scope.project._id, candidate._id).then(
			    function(data){
			      console.log('member added', data);
			    },
			    function(err){
			      console.log('failed', err);
			    }
			  );
			};
			$scope.refuseCandidate = function(candidate){
			  $meteor.call('refuseCandidate', $scope.project._id, candidate._id).then(
			    function(data){
			      console.log('candidate refused', data);
			    },
			    function(err){
			      console.log('failed', err);
			    }
			  );
			};
			$scope.applyTo = function(project, user){
				console.log(user._id);
				$meteor.call('applyTo', project._id, user._id).then(
					function(data){
						console.log('Candidature sent!', data);
					},
					function(err){
						console.log('failed', err);
					}
				);
			};
    }
]);