var UI = {};
UI.setLoading = function () {
    $('#bottom-box').hide();
    $('#top-nav').hide();
    $('#login-mode').hide();
    $('#input-panel').hide();
}
UI.setLogin = function () {
    $('#login-panel').css({
        'background': "#fff"
    });
    $('#login-panel').delay(300).animate({
        'height': '18rem'
    }, 1000, 'easeOutQuint');
    $('#bottom-box').delay(1000).fadeIn(500);
    $('#top-nav').delay(1000).fadeIn(500);
    $('#login-mode').delay(500).fadeIn(500);
    $('#input-panel').delay(500).fadeIn(500);
    $('#initial-container').css({
        'z-index': '1'
    })
    $('#initial-container').delay(500).animate({
        'background-color': 'rgba(51,51,51,0)'
    }, 1500, 'easeOut')
    $('#compayu-title .title-desc').delay(1500).animate({
        'opacity': '1'
    }, 500, 'easeInQuint')
    $('#compayu-title .title-top-border').delay(1000).animate({
        'width': '100%'
    }, 1200, 'easeInOutQuint')
    $('#compayu-title .title-bottom-border').delay(1200).animate({
        'width': '100%'
    }, 1000, 'easeInOutQuint')
    G.isSetLogin = true;
    setTimeout(() => {
        UI.sendTopMsg('加载完成', '点击登录即可进入「空游」');
        User.checkLoginState();
        // UI.setEnter();
    }, 100);
}
UI.setEnter = function () {
    $('#bottom-box').addClass('bounce-down-nda')
    setTimeout(function () {
        $('#login-panel').addClass('bounce-down-nda')
    }, 100);
    $('#compayu-title').addClass('bounce-up-nda')
    // $('#top-nav').addClass('bounce-upright-nda')
    setTimeout(function () {
        $('#initial-container').fadeOut(0);
        var isVisited = $.cookie('isVisited');
        // G.isPlayTutorial = true;
        if (isVisited) {
            UI.playTutorial('亲爱的，欢迎来到「空游」', 5, 3);
            setTimeout(() => {
                G.isPlayTutorial = false;
            }, 6 * 1000);
        } else {
            UI.playTutorial('亲爱的，欢迎来到「空游」', 5, 5);
            UI.playTutorial('用鼠标移动来看看这个世界吧', 12, 4);
            setTimeout(() => {
                G.isPlayTutorial = false;
            }, 16 * 1000);
            $.cookie('isVisited', '1', {
                expires: 7
            });
        }
        TweenMax.to(T, 3, {
            timeScale: 1
        })
        doEnter();
        G.isEnterWorld = true;
    }, 1000);
    audioLoadDic.bg.player.loop = true;
    audioLoadDic.bg.player.fadeIn = 5;
    audioLoadDic.bg.player.start();
}
UI.showTutorial = function () {
    $('#tutorial').css({
        'z-index': '20'
    })
    $('#tutorial').removeClass('tutorial-hide');
    $('#tutorial').addClass('tutorial-show');
}
UI.hideTutorial = function () {
    $('#tutorial').removeClass('tutorial-show');
    $('#tutorial').addClass('tutorial-hide');
    setTimeout(() => {
        $('#tutorial').css({
            'z-index': '-10'
        })
    }, 1000)
}
UI.playTutorial = function (text, delay, duration) {
    setTimeout(() => {
        UI.fillInTutorial(text);
        UI.showTutorial();
        setTimeout(() => {
            UI.hideTutorial();
        }, duration * 1000);
    }, delay * 1000);
}
UI.fillInTutorial = function (text) {
    $('#tutorial').html(text);
}


UI.fillInThought = function (data) {
    console.log(data);
    vm.thought.face = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0ALQDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAEEBQMCB//EAC8QAQACAgEDAgQFAwUAAAAAAAABAgMRBBIhMUFREzJhcQUicqGxMzRCFCNSgZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+8AAAAAAAAAAAjcAkAAAAAAAAAAAAAAAAAAHTj4Lci3rFI8z7g8UrbJbppXcrWP8PmY/3Lz9qrlMdcdYrWIiHoHCOFgiPk395P8AR4J/w/d3AVb8DHPyzNZ+7hbhZqz2mtoaIDJnBmr5xWeem/8Awt/42FPm54ivwqz+afP0gFIAAAAAAAAAAAAAHrHjnLlikevn6Q1aUjHSK1jUQrcDHEY5yT5tK2AAAAAAAo87Bqfi1j9S8i9YvSaz4mAY4TXovak+YnQAAAAAAAAAAAifEpRb5ZBrYK9GClfaHRFP6dfskAAAAAAAAGZzKxXlW+sRLi787+6j9LgAAAAAAAAAAAiZ7TCZ8NDh4a1wVvrdrd9gsU/p1+yQAAAAAAAABm87+5j9Lg2LVraNWiJj6srNSMfIvWPEeAeAAAAAAAAAAF/g5OrBFfWvZQe8OX4OWLek9pBrbR3RW0WrExO4lIGzYAbNgBtO0AG5NgBM6hk5b/Ez3v6TPZb5mfpr8Ks/mnz9IUgAAAAAAAAAAAAd+LyJxWilu9Jnt9Gixp8NLi5vi4o380dpB3AAAAAAceTn+BSNRu0+HaZ1G5ZefL8bNM/4x2gHOZm1ptadzPkAAAAAAAAAAAAAB6xZZw5YvHj1h5Aa1L1yVi1Z3EvSj+HzPVkrvt2leAAAB5yTrFaY9IkFXmcjtOKk958z7KcRqER436ykAAAAAAAAAAAAAAAJnTrg41s1om0TFP5B3/D6zq9/Se0LiK1ilYrWNRCQAAEXjqpMe8aSAxo7TNZ8x2Svcni/E/PTtf8AlRncTMWiYmPSQAAAAAAAAAABEzp3xcTJl7z+SP3BwmYh7x4smX5K9vefC/j4mLHqdbn3l31oFTDwa1nqyT1z7ei34AAAAAAAByy4KZo1aO/v6uoDOycPLj+X89f3V5nU6mJifaWy8XxUyRq1YkGULeTga74rf9Sq2rbHbpvXUggAAABNKWy36aRuf4TixWzX6a9o9Z9mlixVw06awDng4tMURMx1X95WEbNgkRs2CRGzYJEbNgkRs2CRGzYJEbNgkRs2CXnJjrkr03rEwnZsGfn4lsU9VN2p+8OG2upcni9O8mOPvAKoR3gBpcalaYYisee7qAAAAAAAAAAAAAAAAAAAAAMzlY4pnmK7iJ7gA//Z'
    vm.thought.nickname = "匿名用户";
    vm.thought.textContent = data.text;
    vm.thought.imgSrc = '';
    $('#thought #content').scrollTop(0);
}
UI.showThought = function () {
    UI.hideExpress();
    // let unit = G.clickUnit;
    // UI.fillInThought(unit.thought);
    setTimeout(() => {
        vm.thought.show = true;
    }, 300)
}
UI.hideThought = function () {
    vm.thought.show = false;
}
UI.subtitle = {
    happy: '快乐',
    angry: '恼怒',
    worry: '担忧',
    disgust: '讨厌'
}
UI.showExpress = function () {
    if (vm.express.show) {
        return;
    }
    console.log('showExpress');
    vm.express.textContent = '';
    let base = G.clickBase;
    vm.express.typeText = UI.subtitle[base.name];
    setTimeout(() => {
        vm.express.show = true;
    }, 300)
}
UI.hideExpress = function () {
    vm.express.show = false;
}


UI.postExpress = function () {
    let text = String(vm.express.textContent);
    text = text.replace(/^\s*|\s*$/g, "");
    if (text.length <= 0) {
        console.log('add express failed with text 0')
        return false;
    }
    let data = {
        type_raw: G.clickBase.name,
        text: text,
    };
    network.wsPostThought(data, postThoughtCallback);
    return true;
}
UI.sendTopMsg = function (title, content, func = null, time = -1) {
    var data = {
        title: title,
        content: content,
        func: func
    }
    vm.topMsg.push(data)
    if (time > 0) {
        setTimeout(() => {
            vm.topMsg.remove(data);
        }, time);
    }

}

$('#user-mode').on('click', function () {
    $('#input-panel').css({
        'transform': 'translateX(0%)'
    })
    $('#random-mode').removeClass('mode-selected-random')
    $('#user-mode').addClass('mode-selected-user')
})
$('#random-mode').on('click', function () {
    $('#input-panel').css({
        'transform': 'translateX(-50%)'
    })
    $('#user-mode').removeClass('mode-selected-user')
    $('#random-mode').addClass('mode-selected-random')
})
$('#user-mode').trigger('click');
UI.setLoading();