/**
 * Created by hebo on 15/9/25
 */

(function(){
    window.onload= function(){
        animateLogo();
        animateRobot();
        addSmoothScrolling();
        updateSliderControl();
        changeIntroBg();
    };
    window.onscroll = function(){
        updateSliderControl();
    };
    function animateLogo(){
        var t = new TimelineMax({yoyo: true, repeat: -1,ease: Power2.easeInOut});
        t.to('#react-logo', 2,{rotation:'180deg'})
            .to('#react-logo', 2,{rotation:'-180deg'});
        return;
        var $logo = document.getElementById('react-logo');
        TweenMax.fromTo("#react-logo",1, {
            // from
            css: {
                transform: 'translate(0,-40px)'
            }
        },{
            // to
            css: {
                transform: 'translate(0,40px)'
            },

            // 永久重复动画的选项
            repeat: -1,

            // 反转、重新运行动画的选项
            yoyo: true,

            // 改变 easing 类型
            ease: Power2.easeInOut
        });
    }
    function animateRobot(){
        var t = new TimelineMax({yoyo: true, repeat: -1,ease: Power2.easeInOut});
        t.to('#android-robot', 1,{rotation:'30deg'})
            .to('#android-robot', 1,{rotation:'-30deg'})

    }
    function updateSliderControl(){
        var links = document.querySelectorAll('#slider-control a');
        for(var i=0;i<links.length;i++){
            var item = links[i];
            var section = document.querySelector(item.getAttribute('href'));
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.scrollHeight ;
            // 检查 window.scrollY 是否在这部分中
            if(window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                item.className = "active";
            } else {
                item.className = "";
            }
        }
    }
    function scrollToElement(element){
        var topOfElement = element.offsetTop;
        TweenMax.to(window,1,{
            scrollTo: {
                y: topOfElement
            },
            ease: Power2.easeInOut
        });
    }
    function addSmoothScrolling() {
        var links = [].slice.call(document.querySelectorAll('#slider-control a'));
        var navLinks = [].slice.call(document.querySelectorAll('.nav a'));

        links = links.concat(navLinks);
        for(var i=0;i<links.length;i++){
            var link = links[i];
            (function(item){
                item.addEventListener("click",function(event) {
                    // `event` 是鼠标点击事件
                    event.preventDefault();
                    if (document.querySelector(item.getAttribute('href'))){
                        scrollToElement(document.querySelector(item.getAttribute('href')));
                    }
                    return false;
                });
            })(link);
        }
    }
    function changeIntroBg(){
        var controller = new ScrollMagic.Controller();
        var screenHeight = window.screen.height;
        var scene = new ScrollMagic.Scene({
            triggerElement: "#native",
            triggerHook:'onEnter',
            duration: '100%'
        })
            .setTween("#intro-bg", 1, {opacity:1}) // trigger a TweenMax.to tween
            .addTo(controller);

        var scene2 = new ScrollMagic.Scene({
            triggerElement: "#native",
            triggerHook:'onEnter',
            duration: '100%'
        })
            .setTween('#iphone-overlay',1,{width:'50%',y:0}) // trigger a TweenMax.to tween
            .addTo(controller);
        var scene3 = new ScrollMagic.Scene({
            triggerElement: "#native",
            triggerHook:'onLeave',
            duration: '100%'
        })
            .addTo(controller)
            .setPin('#iphone-overlay');
        scene3.on("enter leave end", function(event){
            var appImg = document.querySelector('.app');
            if (event.type=='enter'){
                appImg.src = 'img/swype-demo.jpg'
            }else {
                appImg.src = 'img/tumblr-demo.jpg'
            }
        });

    }
}());
