myApp.controller('PostController', function ($http, $mdDialog, $scope, UserService) {
    console.log('PostController created');
    let vm = this;
    vm.userService = UserService

    vm.posts = UserService.posts;
    vm.returnedUser = UserService.returnedUser;

    vm.postToAdd = {
        postname: '',
        postdesc: '',
        postpic: ''
    }
    
    let fsClient = filestack.init('AnXpCAZX8QyrKizqSb76Rz');
    vm.openPicker = (status) => {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "dropbox"]
        }).then(function (response) {
            // declare this function to handle response
            // handleFilestack(response);
            if (status === 'post') {
            if (UserService.isEditing === false) {
                $scope.$apply(
                vm.postToAdd.postpic = response.filesUploaded[0].url
                )
            } else {
                $scope.$apply(
                    UserService.editedPost.postpic = response.filesUploaded[0].url
                )
            };
        } else if(status === 'user') {
                $scope.$apply(
                    UserService.userToEdit.profilepic = response.filesUploaded[0].url
                )
        }
        });
    }

    UserService.getuser();

    vm.search = (postName) => {
        $http.get('/post/' + postName).then(function (response) {
            console.log(response);
            let lmgtfyUrl = response.data;
            window.open(lmgtfyUrl, "_blank");
        })
    }

    vm.addPost = () => {
        UserService.addPost(vm.postToAdd);
        vm.postToAdd = null;
    }

    vm.getUserInfo = (username) => {
        UserService.getSelectedUser(username);
    }

    UserService.getAllPosts();
});
