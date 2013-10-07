var TodoApplication = angular.module("TodoApplication", ['ngResource']);

TodoApplication.controller("TodoController", function($scope, $resource) {

	$scope.newTodoTitle = "";

	var Todo = $resource('/todo', {}, {
		update: {
			method: 'PUT'
		}
	});

	$scope.todos = Todo.query();

	$scope.checkTodo = function(todo) {
		todo.checked = true;
		todo.$update();
	};
	$scope.uncheckTodo = function(todo) {
		todo.checked = false;
	};
	$scope.addTodo = function() {
		var newTodo = new Todo({
			title: $scope.newTodoTitle,
			checked: false
		});
		$scope.todos.push(newTodo);
		newTodo.$save();
		$scope.newTodoTitle = "";
	};
});