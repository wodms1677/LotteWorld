(($)=>{

  class atr {
    init(){
      this.util();
      this.header();
      this.section();
      this.footer();
      this.quickBox();
      this.goTop();
    }
    util(){
      // 언어 버튼
      $('.lan-btn').on({
        click:function(){
          if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $('.lan-list').slideDown('100');
          }
          else {
            $(this).removeClass('on');
            $('.lan-list').slideUp('100');
          }
        }
      });
    }
    header(){
      let month=new Date().getMonth()+1;
      let date=new Date().getDate();
      let day=new Date().getDay();

      if(day===0){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(일)');
      }
      else if(day===1){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(월)');
      }
      else if(day===2){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(화)');
      }
      else if(day===3){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(수)');
      }
      else if(day===4){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(목)');
      }
      else if(day===5){
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(금)');
      }
      else {
        $('.date').text(_pad(new String(month), 2) + "." + _pad(new String(date), 2) + ' ' + '(토)');
      }

      // 두 자리로 바꾸는 함수
      function _pad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
      }

      
      // 스크롤 시 포지션 변경
      $(window).scroll(function(){
        if($(window).scrollTop()>100){
          $('.lan-btn').removeClass('on');
          $('.lan-list').slideUp('100');
          $('#header').addClass('on');
          return;
        }
        if($(window).scrollTop()===0){
          $('#header').removeClass('on');
        }
      });
      // 네비
      $('.main-btn').on({ 
        mouseenter:function(){
          $('.main-btn').removeClass('on');
          $(this).addClass('on');

          if(!$('#nav').hasClass('on')){
            $('sub-box').hide();
            $(this).next().slideDown(300);
            $('#blackBg').css({zIndex:2}).fadeIn(300);
            $('#nav').addClass('on');
          }
          else {
            $('#blackBg').css({zIndex:2}).show();
            $('.sub-box').hide();
            $(this).next().show();
          }

        },
        focusin:function(){
          $('.main-btn').removeClass('on');
          $(this).addClass('on');

          if(!$('#nav').hasClass('on')){
            $('sub-box').hide();
            $(this).next().slideDown(300);
            $('#blackBg').css({zIndex:2}).fadeIn(300);
            $('#nav').addClass('on');
          }
          else {
            $('#blackBg').css({zIndex:2}).show();
            $('.sub-box').hide();
            $(this).next().show();
          }

        }
      })

      $('#nav').on({
        mouseleave:function(){
          $('#nav').removeClass('on');
          $('.main-btn').removeClass('on');
          $('#blackBg').fadeOut(300);
          $('.sub-box').slideUp(300);
        }
      })

      // 서브-서브 메뉴
      $('.sub-btn').on({
        mouseenter:function(){
          $('.sub-btn').removeClass('on');
          $(this).addClass('on');
          $('.sub-sub').hide();
          $(this).next().show();
        },
        focusin:function(){
          $('.sub-btn').removeClass('on');
          $(this).addClass('on');
          $('.sub-sub').hide();
          $(this).next().show();
        }
      });

      $('.sub-menu').on({
        mouseleave:function(){
          $('.sub-btn').removeClass('on');
          $('.sub-sub').hide();
        }
      });

    }
    footer(){      
      // 푸터 도달 시 퀵박스, 고탑 버튼 위치 조정
      $(window).scroll(function(){
        quickBoxGoTop();
      });

      $(window).resize(function(){
        quickBoxGoTop();
      })

      function quickBoxGoTop(){
        if($(window).scrollTop() + $(window).height() >= $('#footer').offset().top){
          $("#goTop").css({"position":"absolute", "bottom":$("#footer").outerHeight(true)});          
          $('#quickBox').css({"position":"absolute", "bottom":$("#footer").outerHeight(true)+100});
        }
        else {
          $("#goTop").css({"position":"fixed", "bottom":0});          
          $('#quickBox').css({"position":"fixed", "bottom":100});
        }
      } 

      // 패밀리사이트 이동
      $('#familySite').on({
        change:function(){
          window.open($(this).val());
        }
      });
    }
    section(){
      $('.menu1-btn').on({
        click:function(){
          if(!$(this).hasClass('on')){
            $('.more-menu2').slideUp(300);
            $('.menu2-btn').removeClass('on');
            $('.more-menu1').slideDown(300);
            $(this).addClass('on');
          }
          else{
            $('.more-menu1').slideUp(300);
            $(this).removeClass('on');
          }
        }
      })
      
      $('.menu2-btn').on({
        click:function(){
          if(!$(this).hasClass('on')){
            $('.more-menu1').slideUp(300);
            $('.menu1-btn').removeClass('on');
            $('.more-menu2').slideDown(300);
            $(this).addClass('on');
          }
          else {
            $('.more-menu2').slideUp(300);
            $(this).removeClass('on');
          }
        }
      })
    }
    quickBox(){
      // 퀵 모달 열기
      $('.quick-menu-btn').on({
        click:function(e){
          e.preventDefault();
          if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $('#quickModal').fadeIn(300);
            $('#blackBg').css({zIndex:5}).fadeIn(300);
          }
          else {
            $(this).removeClass('on');
            $('#quickModal').fadeOut(200);
            $('#blackBg').fadeOut(300).css({zIndex:2});
          }
        }
      });
    }
    goTop(){
      // 탑 버튼 클릭 이벤트
      $('#goTop').on({
        click:function(){
          $('html, body').stop().animate({scrollTop:0}, 500);
        }
      });
    }
  }

  const newAtr = new atr;
  newAtr.init();

})(jQuery);