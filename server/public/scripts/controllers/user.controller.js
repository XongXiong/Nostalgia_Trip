myApp.controller('UserController', function(UserService, $mdSidenav) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userStatus = UserService.status;

  vm.toggleLeft = buildToggler('left');

  function buildToggler(componentId) {
    return function () {
      $mdSidenav(componentId).toggle();
    }
  };
});
