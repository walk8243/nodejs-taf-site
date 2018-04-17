document.addEventListener('DOMContentLoaded', function(){
  scroll: {
    const scrollTags = document.getElementsByClassName('scroll_tag');
    // console.log(scrollTags);
    for(let scrollTag of scrollTags){
      // console.log(scrollTag.getAttribute('scroll'));
      let scrollTagAttr = scrollTag.getAttribute('scroll'),
          scrollTarget,
          scrollTargetTop;

      // console.log(scrollTagAttr.substring(0,1));
      switch(scrollTagAttr.substring(0,1)){
        case '#':
          scrollTarget = document.getElementById(scrollTagAttr.substring(1));
          break;
        case '.':
          scrollTarget = document.getElementsByClassName(scrollTagAttr.substring(1));
          break;
        default:
          scrollTarget = document.getElementsByTagName(scrollTagAttr.substring(1));
          break;
      }
      scrollTargetTop = scrollTarget.getBoundingClientRect().top;

      scrollTag.addEventListener('click', function(event){
        // console.log(scrollTarget);
        // console.log(scrollTargetTop);
        window.scroll(0, scrollTargetTop);
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function(){
  const main = document.getElementsByTagName('main');
  if(main.length > 0){
    const pageId = main[0].classList[0].substring(6);
    console.log(pageId);
    switch(pageId){
      case 'index':
        // console.log('index');
        break;
      case 'competition':
        // console.log('competition');
        break;
      case 'competition/year':
        // console.log('competition/year');
        break;
      case 'competition/competition':
        // console.log('competition/competition');
        break;
      case 'member':
        // console.log('member');
        break;
      case 'member/member':
        // console.log('member/member');
        break;
      default: break;
    }
  }
});
// document.addEventListener('DOMContentLoaded', function() {
//   console.log('DOMContentLoaded');
// });

// ぬるりとスクロール
function smoothScroll(){

}
