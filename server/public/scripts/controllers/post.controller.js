myApp.controller('PostController', function (UserService) {
    console.log('PostController created');
    var vm = this;
    vm.posts = [{ name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, { name: 'Shoua', url: 'https://scontent.ffar1-1.fna.fbcdn.net/v/t31.0-8/22555659_1727158440629943_40649371309642927_o.jpg?oh=1fad174b1e41ed40d5ec9f5d6eb8d3b6&oe=5A617EB0', desc: 'The most', ref: 'http://lmgtfy.com/?q=Prime+Digital+Academy', votes: 1000000 }, ];

    UserService.getuser();


});
