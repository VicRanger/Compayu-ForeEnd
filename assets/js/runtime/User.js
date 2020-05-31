var User = new(function User() {
    this.checkLoginState = function () {
        let account = $.cookie('nickname');
        if(account){
            let nickname = $.cookie('nickname');
            let avator = $.cookie('avator');
            vm.user.hasCookie = true;
        }
    }
    this.loginWithPassword = function (account, password, isPasswordMd5 = false,autoLogin = false) {
        return new Promise((resolve, reject) => {
            password = isPasswordMd5 ? password : md5(password);
            console.log(account, password,autoLogin);
            network.post('/compayu/login/', {
                    account: account,
                    password: password,
                    auto_login: autoLogin
                })
                .then((res) => {
                    res = res['data']
                    if (res.code == 1) {
                        vm.user.isLogin = true;
                        vm.user.token = res.token;
                        vm.user.account = account;
                        vm.user.password = password;
                        resolve(res);
                    }else{
                        reject(res);
                    }
                }).catch((err) => {
                    reject();
                })
        })
    }
    this.loginWithToken = function () {

    }
})();