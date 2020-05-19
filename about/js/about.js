// 实现可动文字
var isBanner = false;
var isBannerI = 0;

$('#video1')[0].onplaying = function (){
    $('.banner-text').addClass('animation');
    isBanner = true;
}
setInterval(function (){
    
    if(isBanner){
        if($('#video1')[0].currentTime < 0.5){
            if(isBannerI){
                $('.banner-text .aniword-area').addClass('animation1');
            }
            $('.banner-text .aniword-area').removeClass('animation2');
            $('.banner-text .aniword-area').removeClass('animation3');
            $('.banner-text .aniword-area').removeClass('animation4');
        }
        
        if($('#video1')[0].currentTime > 3){
            isBannerI = 1;
            $('.banner-text .aniword-area').addClass('animation2');
        }
        if($('#video1')[0].currentTime > 6){
            $('.banner-text .aniword-area').addClass('animation3');
        }
        if($('#video1')[0].currentTime > 9){
            $('.banner-text .aniword-area').addClass('animation4');
        }
    }
},1000/24);
