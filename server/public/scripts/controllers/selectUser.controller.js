myApp.controller('SelectUserController', function (UserService) {
    console.log('SelectUserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.userStatus = UserService.status;
    var loggedUser = UserService.userObject.userName;

    // UserService.getSelectedUser(loggedUser);
});