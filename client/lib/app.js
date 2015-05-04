angular.module('makeurteam',[
	'angular-meteor',
	'ui.router',
	'angularUtils.directives.dirPagination',
	'uiGmapgoogle-maps',
	'ngTagsInput',
	'angularFileUpload'
]);

function onReady() {
  angular.bootstrap(document, ['makeurteam']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);