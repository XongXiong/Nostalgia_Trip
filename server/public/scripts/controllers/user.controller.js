myApp.controller('UserController', function (UserService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userStatus = UserService.status;

});
