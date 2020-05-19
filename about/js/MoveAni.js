//顶部导航栏横线移动
function moveNavPointer(i){
	var moveWin = document.getElementById("nav_pointer");
	var li1 = document.getElementById("nav1");
	var li2 = document.getElementById("nav2");
	var li3 = document.getElementById("nav3");
	var li4 = document.getElementById("nav4");
	var temp = 0;

	switch (i){
		case 1:
			temp = li1.getBoundingClientRect();
			moveWin.style.marginLeft = temp.x+18+"px";
			moveWin.style.opacity = 1;
			break;
		case 2:
			temp = li2.getBoundingClientRect();
			moveWin.style.marginLeft = temp.x+18+"px";
			moveWin.style.opacity = 1;
			break;
		case 3:
			temp = li3.getBoundingClientRect();
			moveWin.style.marginLeft = temp.x+18+"px";
			moveWin.style.opacity = 1;
			break;
		case 4:
			temp = li4.getBoundingClientRect();
			moveWin.style.marginLeft = temp.x+18+"px";
			moveWin.style.opacity = 1;
			break;
		case -1:
			moveWin.style.opacity = 0;
		default:
			break;
	}
}

//顶部导航栏跟随
var p=0;t=0;
$(window).scroll(function(e) {
    p = $(this).scrollTop();
	// console.log(p);
    if (t <= p) {
		//console.log("DOWN");
		isShowTopbar(-1);
		checkScroll();
    } else {
		//console.log("UP");
		isShowTopbar(1);
		checkScroll();
    }
    setTimeout(function() {
      t = p;
    }, 0);
 });
 
function isShowTopbar(i){
	var tb = document.getElementById("Topbar");
	var q = $(window).scrollTop();
	//console.log(q);
	if (i==1){
		tb.style.marginTop = q+58+"px";
		tb.style.opacity = 1;
	}
	else if(i==-1){
		tb.style.opacity = 0;
	}
}
 
//部分追踪
var isFirstPlay = true;
function checkScroll(){
	var m = $(window).scrollTop();
	var p1 = document.getElementById("Part1");
	var p2 = document.getElementById("Part2");
	var p3 = document.getElementById("Part3");
	var p4 = document.getElementById("Part4");

	if (m<724){
		p1.style.marginTop = 0;
		p2.style.marginTop = 3700+"px";
	}
	//进入第一部分
	if (m>=724 && m<3900){
		p1.style.marginTop = m-715+"px";
		p2.style.marginTop = 3700+"px";
	}
	//进入第二部分过渡
	else if (m>=3900 && m<4580){
		p1.style.display = "block";
		p2.style.display = "block";
		p2.style.marginTop = 3700+"px";
		if (m>=4500){
			//第一次出现动图,播放
			if (isFirstPlay){
				document.getElementById('P2_gif').src = document.getElementById('P2_gif').src;
				isFirstPlay = false;
			}
		}
	}
	//第二部分
	else if(m>=4580&&m<6000){
		p2.style.marginTop = m-882+"px";
	}
	//第三部分过渡
	else if(m>6000&&m<6800){
		p2.style.display = "block";
		p3.style.display = "block";
	}
	//第三部分
	else if(m>=6800&&m<7400){
		p3.style.marginTop = m-800+"px";
	}
	//第四部分过渡
	else if(m>7400 && m<8000){
		p3.style.display = "block";
		p4.style.display = "block";
	}
	//第四部分
	else if(m>=8300){
		p4.style.marginTop = m-700+"px";
	}
}

function gifPlayAgain(i){
	document.getElementById('P2_gif').src = document.getElementById('P2_gif').src;
}

//p3卡片
function showStaffInfo(i){
	var p1 = document.getElementById("staff_1_p");
	var p2 = document.getElementById("staff_2_p");
	var p3 = document.getElementById("staff_3_p");
	if (i==1){
		p1.style.opacity = 1;
		p2.style.opacity = 0;
		p3.style.opacity = 0;
	}else if (i==2){
		p1.style.opacity = 0;
		p2.style.opacity = 1;
		p3.style.opacity = 0;
	}else if (i==3){
		p1.style.opacity = 0;
		p2.style.opacity = 0;
		p3.style.opacity = 1;
	}
}

function getCursorX(e){
	  var e = event || window.event;
	  var x = e.screenX;
	  return x;
}

//实现页面内跳转
function JumpToPos(i){
	switch (i){
		case 1:
		//跳转到700
			Move(700);
			break;
		case 2:
		//跳转到700
			Move(4600);
			break;
		case 3:
		//跳转到700
			Move(7300);
			break;
		case 4:
		//跳转到700
			Move(11700);
			break;
		default:
			break;
	}
}
function Move(pos){
	window.scrollTo(0, pos);
}