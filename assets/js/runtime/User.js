var User = new(function User() {
    this.reset = function () {
        this.id = -1;
        this.token = -1;
        this.account = 'unknown';
        this.password = 'unknown';
        vm.user.useCookie = false;
        vm.user.isLogin = false;
    }
    this.checkLoginState = function () {
        this.reset();
        this.id = $.cookie('user_id')
        console.log(this.id)
        if (this.id && this.id != 'null') {
            console.log("cookie中存在token")
            this.getUserInfo('id', this.id).then((res) => {
                vm.user.useCookie = true;
            }).catch((err) => {
                if ('code' in err) {
                    $.cookie('user_id', null);
                    this.reset();
                }
                vm.msg(`自动登录信息失效，原因（${err['msg']})`, 'error')
            })
        }
    }
    this.loginOut = function () {
        return new Promise((resolve, reject) => {
            network.post('/compayu/logout/', {
                    token: this.token
                })
                .then((res) => {
                    res = res['data']
                    if (res.code == 1) {
                        vm.msg(res['msg'], 'success')
                        setTimeout(() => {
                            vm.msg('将于3秒后刷新页面', 'info', duration = 3000)
                            setTimeout(() => {
                                location.reload();
                            }, 3000)
                        }, 500)
                        vm.user.isLogin = false;
                        resolve(res);
                    } else {
                        vm.msg(res['msg'], 'error')
                        reject(res);
                    }
                }).catch((err) => {
                    vm.msg('登出失败，网络错误', 'error')
                    reject();
                })
        })
    }
    this.getUserInfo = (key, value) => {
        return new Promise((resolve, reject) => {
            query = {
                query: ['nickname', 'avatar']
            }
            query[key] = value
            if(key){
                console.log(key)
            }else{
                reject({
                    'msg': '获取用户信息失败，未指定方式'
                })
            }
            network.post('/compayu/user/', query).then((res) => {
                res = res['data']
                console.log(res)
                if (res.code == 1) {
                    vm.user.avatar = res.data.avatar;
                    vm.user.nickname = res.data.nickname;
                    this.nickname = res.data.nickname;
                    resolve(res);
                } else {
                    reject(res);
                }
            }).catch((err) => {
                reject({
                    'msg': '获取用户信息失败，网络错误'
                })
            })
        })
    }
    this.autoLogin = () => {
        return new Promise((resolve, reject) => {
            let account = $.cookie('account')
            let password = $.cookie('password')
            // if(/\w+[@]{1}\w+[.]\w+/.test(account)){
            //     account = account.substring(1,account.length-1)
            // }
            console.log(account);
            this.loginWithPassword(account, password, isPasswordMd5 = true, autoLogin = true, useAutoLogin = true)
            .then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        });
    }
    this.loginWithPassword = (account, password, isPasswordMd5 = false, autoLogin = false, useAutoLogin = false) => {
        return new Promise((resolve, reject) => {
            console.log('loginWithPassword')
            password = isPasswordMd5 ? password : md5(password);
            console.log(account, password, autoLogin);
            network.post('/compayu/login/', {
                    account: account,
                    password: password,
                    auto_login: autoLogin,
                    use_auto_login:useAutoLogin
                })
                .then((res) => {
                    res = res['data']
                    if (res.code == 1) {
                        vm.msg(res['msg'], 'success')
                        vm.user.isLogin = true;
                        this.token = res.data.token;
                        this.id = res.data.id;
                        this.getUserInfo('token',this.token);
                        resolve(res);
                    } else {
                        vm.msg(res['msg'], 'error')
                        reject(res);
                    }
                }).catch((err) => {
                    vm.msg('登录失败，网络错误', 'error')
                    reject();
                })
        });
    }
});