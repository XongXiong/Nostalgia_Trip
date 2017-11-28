myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  let vm = this;
  vm.userService = UserService;
});
