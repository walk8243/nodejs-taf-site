document.addEventListener('DOMContentLoaded', function() {
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
        testMember();
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

function testMember(){
  console.log('aaa');
}

// ぬるりとスクロール
function smoothScroll(){
  
}
