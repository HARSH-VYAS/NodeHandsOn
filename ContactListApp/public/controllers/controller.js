var myApp = angular.module('myApp',[]);

myApp.controller('appControl', ['$scope','$http', function($scope,$http){

	$scope.contactList =[];

	var refresh = function(){
	$http.get('/contactList').then(function successCallBack(response){
		console.log("Data Recieved get");
		console.log(response);
		$scope.contactList = response;
	},
	function errCallBack(){
		console.log("Error received in myApp controller");
	});
	};
	refresh();
	$scope.addContact = function(){

		$http.post('/contactList',$scope.contact).then(function successCallBack(response){
		console.log("Data Recieved post");
		console.log(response);
		refresh();
		},
		function errCallBack(){
			console.log("Error received in myApp controller");
		});
		};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactList/'+id).then(function successCallBack(response){
			console.log("Data Recieved delete");
			console.log(response);
			refresh();
		},
		function errCallBack(){
			console.log("Error received in myApp controller");
		});
	};

	$scope.edit = function(id){

		console.log(id);
		$http.get('/contactList/'+id).then(function successCallBack(response){
			console.log("Data Recieved edit");
			console.log(response);
			$scope.contact = response.data;
		},
		function errCallBack(){
			console.log("Error received in myApp controller");
		});

	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id,$scope.contact).then(function successCallBack(response){
			refresh();
		},
		function errCallBack(){
			console.log("Error received in myApp controller");
		});

	};

	$scope.deSelect = function(){
		$scope.contact="";
	};
}]);