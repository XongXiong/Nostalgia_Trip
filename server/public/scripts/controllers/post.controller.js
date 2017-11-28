myApp.controller('PostController', function ($http, $mdDialog, UserService) {
    console.log('PostController created');
    var vm = this;
    vm.userService = UserService

    vm.posts = UserService.posts;
    vm.returnedUser = UserService.returnedUser;

    vm.postToAdd = {
        postname: '',
        postdesc: '',
        postpic: ''
    }
    
    var fsClient = filestack.init('AnXpCAZX8QyrKizqSb76Rz');
    vm.openPicker = (status) => {
        fsClient.pick({
            fromSources: ["local_file_system", "url", "imagesearch", "facebook", "instagram", "dropbox"]
        }).then(function (response) {
            // declare this function to handle response
            // handleFilestack(response);
            if (status === 'post') {
            if (UserService.isEditing === false) {
                vm.postToAdd.postpic = response.filesUploaded[0].url;
            } else {
                UserService.editedPost.postpic = response.filesUploaded[0].url;
                console.log(UserService.editedPost);
            };
        } else if(status === 'user') {
            UserService.userToEdit.profilepic = response.filesUploaded[0].url;
        }
        });
    }

    UserService.getuser();

    vm.search = (postName) => {
        $http.get('/post/' + postName).then(function (response) {
            console.log(response);
            var lmgtfyUrl = response.data;
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
