# mobile-web-ListScroll
 单页应用的列表滚动模块
1.说明
 @Listscroll   单页应用列表滚动模块
 
 @description  适合移动端（滚动条是属于body），保持列表dom个数一定以达到滚动流畅
 
 @dependencies 依赖zepto或JQuery，建议使用zepto
 
2.body滚动条事件绑定应用例子

  var wallList = new Listscroll(
  
      $listWrapper: $('.content'),
      listTagObj:{
          tagName: 'ul',
          className: 'wall-list'
      }
      
  });

  window.onscroll = function() {
  
      if (roll.isTop() && wallList.hasUpRemoved()) {
          wallList.prevRemoved();
      } else if (roll.isBottom() && wallList.getIsRemoving()) {
          if (this.hasBotRemoved()) {
              wallList.nextRemoved();
          } else if (列表数据请求没有正在进行 && 列表没有获取完毕) {
              发起获取列表请求操作
          }
      }
      
  }
