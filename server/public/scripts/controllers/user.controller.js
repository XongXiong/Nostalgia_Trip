myApp.controller('UserController', function ($mdDialog, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userStatus = UserService.status;
});
