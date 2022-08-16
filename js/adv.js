(($)=>{
  
  class adv {
    init(){
      this.util();
      this.header();
      this.section1();    
      this.section3();
      this.section4();
      this.section5();
      this.section6();
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
      // 메인 버튼에 마우스 도달 시 
      // 네비에 온 클래스가 없으면 서브 메뉴 slideDown 블랙배경 fadeIn
      // 네비에 온 클래스가 있으면 서브 메뉴 show 
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
    section1(){
      let winW=$(window).width();
      let setId=0;
      let setId2=0;
      let cnt=0;
      let start='';
      let end='';
      let result='';
      let dragStart='';
      let dragEnd='';
      let mouseDown=false;

          // 반응형 너비
          $(window).resize(function(){
            winW=$(window).width();
            mainSlide();
            return winW
          });

          // 메인 슬라이드
          function mainSlide(){
            pageBtnfn();
            $('.slide-wrap').stop().animate({left:-winW*cnt}, 600, function(){
              cnt>6?cnt=0:cnt;
              cnt<0?cnt=6:cnt;
              $('.slide-wrap').stop().animate({left:-winW*cnt}, 0)
            })
          }

          function nextCount(){
            cnt++;
            mainSlide();
          }

          function prevCount(){
            cnt--;
            mainSlide();
          }

          function autoTimer(){
            setId=setInterval(nextCount,5000);
          }
          autoTimer();

          // next, prev 버튼 이벤트
          $('.prev-btn').on({
            click:function(){
              if($('.slide-wrap').is(':animated')){
                return;
              }
              prevCount();
              pausefn()
            }
          });

          $('.next-btn').on({
            click:function(){
              if($('.slide-wrap').is(':animated')){
                return;
              }
              nextCount();
              pausefn()
            }
          });

          // 페이지 버튼 클릭 시 슬라이드 이동
          $('.page-btn').each(function(idx){
            $(this).on({
              click:function(){
                clearInterval(setId);
                cnt=idx;
                mainSlide();
                pageBtnfn();
                pausefn();
              }
            })
          });

          // 재생-정지 버튼
          $('.play-pause-btn').on({
            click:function(){
              if(!$('.slide-wrap').is(':animated')){
                $(this).toggleClass('on');
                if($(this).hasClass('on')){
                  clearInterval(setId);
                }
                else{
                  autoTimer();
                }
              }
            }
          });

          // 정지 함수
          function pausefn(){
            $('.play-pause-btn').addClass('on');
            restartTimer();
          }

          // 페이지 버튼 재생 함수
          function pageBtnfn(){
            $('.page-btn').removeClass('on');
            $('.page-btn').eq(cnt>6?0:cnt).addClass('on');
          }

          // 재시작 타이머 함수
          function restartTimer(){
            let cnt2=0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2=setInterval(function(){
                  cnt2++;
                  if(cnt2>10){
                    clearInterval(setId2);
                    nextCount();
                    autoTimer();
                    pageBtnfn();
                    $('.play-pause-btn').removeClass('on');
                  }
                }, 1000);
          }

          // 드래그 앤 드롭
          $('.slide-container').on({
            mousedown:function(e){              
              start=e.clientX;              
              pausefn();
              dragStart=e.clientX-$('.slide-wrap').offset().left-1903;
              mouseDown=true;
            },
            mouseup:function(e){
              end=e.clientX;
              result=start-end>0?'NEXT':'PREV'

              if(start===end){
                mouseDown=false;
                return;
              }
              else {
                if(result==='NEXT'){
                  nextCount();
                }
                if(result==='PREV'){
                  prevCount();
                }
              }              

              mouseDown=false;
            },
            mouseleave:function(e){
              if(!mouseDown) return;
              end=e.clientX;
              result=start-end>0?'NEXT':'PREV'

              if(start===end){
                mouseDown=false;
                return;
              }
              else {
                if(result==='NEXT'){
                  nextCount();
                }
                if(result==='PREV'){
                  prevCount();
                }                
              }              

              mouseDown=false;
            },
            mousemove:function(e){
              if(!mouseDown) return;              
              dragEnd=e.clientX;
              $('.slide-wrap').css({left:dragEnd-dragStart});              
            }
          });

          // 드래그 앤 드롭 모바일
          $('.slide-container').on({
            touchstart:function(e){              
              pausefn();
              start=e.originalEvent.changedTouches[0].clientX;                            
              dragStart=e.originalEvent.changedTouches[0].clienX-$('.slide-wrap').offset().left-1903;
              mouseDown=true;
            },
            touchend:function(e){
              end=e.originalEvent.changedTouches[0].clientX;
              result=start-end>0?'NEXT':'PREV'

              if(start===end){
                mouseDown=false;
                return;
              }
              else {
                if(result==='NEXT'){
                  nextCount();
                }
                if(result==='PREV'){
                  prevCount();
                }
              }              

              mouseDown=false;
            },
            touchmove:function(e){
              if(!mouseDown) return;              
              dragEnd=e.originalEvent.changedTouches[0].clientX;
              $('.slide-wrap').css({left:dragEnd-dragStart});              
            }
          });
    }
    section3(){      
      const sec3Top=$('#section3').offset().top-$(window).height();
      
            // 스크롤 패럴럭스
            $(window).scroll(function(){
              if($(window).scrollTop()===0){
                $('#section3').removeClass('sec3Ani');
              }
              if($(window).scrollTop()>sec3Top){
                $('#section3').addClass('sec3Ani');
              }
            });
    }
    section4(){            
      const sec4Top=$('#section4').offset().top-$(window).height();
      let start='';
      let end='';
      let drag=false;
      let dragStart='';
      let dragEnd='';
      let swpStart='';      
      let mouseDown=false;
      let slideLeft=$('.sub-slide-wrap').offset().left;      
                  
            // 스크롤 패럴럭스
            $(window).scroll(function(){
              if($(window).scrollTop()===0){
                $('#section4').removeClass('sec4Ani');
              }
              if($(window).scrollTop()>sec4Top){
                $('#section4').addClass('sec4Ani');
              }
            });

            // 서브 슬라이드 드래그 앤 드롭
            $('.sub-slide-container').on({
              mousedown:function(e){
                start=e.clientX;
                dragStart=e.clientX-$('.sub-slide-wrap').offset().left;
                mouseDown=true;
              },
              mouseup:function(e){ 
                end=e.clientX;                     
                mouseDown=false;
                $('.swiper').css({width:46});                 
                if(start===end){
                  drag=false;
                }
                else{
                  drag=true;
                }
              },
              mouseleave:function(e){
                if(!mouseDown) return;
                mouseDown=false;
              },
              mousemove:function(e){
                if(!mouseDown) return;
                dragEnd=e.clientX;
                drag=true;

                slideLeft=$('.sub-slide-wrap').offset().left;

                if(slideLeft >= 250){
                  $('.sub-slide-wrap').stop().animate({left:0}, 800, 'swing');
                  $('.swiper').animate({width:40}, 200, 'swing');
                  return mouseDown=false ;
                }
                else if(slideLeft <= -1400){
                  $('.sub-slide-wrap').stop().animate({left:-1230}, 800, 'swing');
                  $('.swiper').animate({width:40}, 200, 'swing');
                  return mouseDown=false;
                }
                else {
                  $('.sub-slide-wrap').css({left:dragEnd-dragStart});
                  $('.swiper').css({width:46,left:( (dragEnd-dragStart) / -12.68 )});
                }                
              }
            });

            // 서브 슬라이드 드래그 앤 드롭 모바일
            $('.sub-slide-container').on({
              touchstart:function(e){
                start=e.originalEvent.changedTouches[0].clientX;
                dragStart=e.originalEvent.changedTouches[0].clientX-$('.sub-slide-wrap').offset().left;
                mouseDown=true;
              },
              touchend:function(e){ 
                end=e.originalEvent.changedTouches[0].clientX;                     
                mouseDown=false;
                $('.swiper').css({width:46});                 
                if(start===end){
                  drag=false;
                }
                else{
                  drag=true;
                }
              },
              touchmove:function(e){
                if(!mouseDown) return;
                dragEnd=e.originalEvent.changedTouches[0].clientX;
                drag=true;

                slideLeft=$('.sub-slide-wrap').offset().left;

                if(slideLeft >= 250){
                  $('.sub-slide-wrap').stop().animate({left:0}, 800, 'swing');
                  $('.swiper').animate({width:40}, 200, 'swing');
                  return mouseDown=false ;
                }
                else if(slideLeft <= -1380){
                  $('.sub-slide-wrap').stop().animate({left:-1250}, 800, 'swing');
                  $('.swiper').animate({width:40}, 200, 'swing');
                  return mouseDown=false;
                }
                else {
                  $('.sub-slide-wrap').css({left:dragEnd-dragStart});
                  $('.swiper').css({width:46,left:( (dragEnd-dragStart) / -12.68 )});
                }                
              }
            });
            
            // 스와이퍼로 슬라이드 움직이기
            $('.swiper-box').on({
              mousedown:function(e){
                mouseDown=true;
                swpStart=e.clientX-$('.swiper-box').offset().left; 
                $('.swiper').css({left:swpStart-23});         
                $('.sub-slide-wrap').css({left:( (swpStart-23) * -12.68 )});      
              },
              mouseup:function(){
                mouseDown=false;
              },
              mouseleave:function(){
                mouseDown=false;
              },
              mousemove:function(e){
                if(!mouseDown) return;
                swpStart=e.clientX-$('.swiper-box').offset().left;                
                
                if( $('.swiper').offset().left <= 875 ){
                  $('.swiper').css({left:-23});
                  $('.sub-slide-wrap').stop().animate({left:0});
                  return;
                }
                else if( $('.swiper').offset().left >= 978 ){
                  $('.swiper').css({left:105});              
                  $('.sub-slide-wrap').stop().animate({left:-1168});    
                  return;
                }
                else {
                  $('.swiper').css({left:swpStart-23});
                  $('.sub-slide-wrap').css({left:( (swpStart-23) * -12.68 )});
                }                
              }              
            });

            // 클릭 시 애니메이션
            $('.sub-slide').each(function(idx){      
              $(this).on({
                click:function(e){
                  e.preventDefault();                                    
                  if(drag===false){
                    if($('.sub-slide').hasClass('on')){
                      $('.sub-slide').removeClass('on');
                    }
                    else {
                      $('.sub-slide').eq(idx).toggleClass('on');
                    }                                    
                  }            
                }
              });             
            });          
    }
    section5(){
      const sec5Top=$('#section5').offset().top-$(window).height();

            // 스크롤 패럴럭스      
            $(window).scroll(function(){
              if($(window).scrollTop()===0){
              $('#section5').removeClass('sec5Ani');
              }
              if($(window).scrollTop()>sec5Top){
                $('#section5').addClass('sec5Ani');
              }
            });

            // 어트랙트 버튼 클릭 이벤트    
            $('.atract-btn').each(function(idx){
              $(this).on({
                click:function(e){
                  e.preventDefault();
                  $('.atract-btn').removeClass('on');
                  $('.atract-btn').eq(idx).addClass('on');
                  $('.list-wrap').hide();
                  $('.list-wrap').eq(idx).show();
                }
              });
            });
    }
    section6(){
      const sec6Top=$('#section6').offset().top-$(window).height();

            // 스크롤 패럴럭스
            $(window).scroll(function(){
              if($(window).scrollTop()===0){
                $('#section6').removeClass('sec6Ani');
              }
              if($(window).scrollTop()>sec6Top){
                $('#section6').addClass('sec6Ani');
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

  const newAdv=new adv;
  newAdv.init();

})(jQuery);