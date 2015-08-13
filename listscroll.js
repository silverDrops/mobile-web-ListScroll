/**
 * @Listscroll   单页应用列表滚动模块
 * @description  适合移动端（滚动条是属于body），保持列表dom个数一定以达到滚动流畅
 * @dependencies 依赖zepto或JQuery，建议使用zepto
 * @email  qianbenyingxia@gmail.com
 * @date   2015/08/12
 */

/**
 *  body滚动条事件绑定应用例子
 *  var wallList = new Listscroll({
 *      $listWrapper: $('.content'),
 *      listTagObj:{
 *          tagName: 'ul',
 *          className: 'wall-list'
 *      }
 *  });
 *
 *  window.onscroll = function() {
 *      if (roll.isTop() && wallList.hasUpRemoved()) {
 *          wallList.prevRemoved();
 *      } else if (roll.isBottom() && wallList.getIsRemoving()) {
 *          if (this.hasBotRemoved()) {
 *              wallList.nextRemoved();
 *          } else if (列表数据请求没有正在进行 && 列表没有获取完毕) {
 *              发起获取列表请求操作
 *          }
 *      }
 *  }
 */

!(function(window, $) {
    function Listscroll(opts) {
        var defaults = {
            $listWrapper: $('body'),
            listTagObj: {
                tagName: 'div',
                className: 'page'
            }
        };

        this.settings = $.extend(defaults, opts)
        this._init();
    }

    Listscroll.prototype = {
        _init: function() {
            this.$listWrapper = this.settings.$listWrapper;
            this.isRemoving = false;
            this.preRemovedArry = [];
            this.nextRemovedArry = [];
            this.pageAttrName = 'page';
        },
        /* 删除一个列表 ,$list: 移除的dom对象，prevBool: true则移除的dom属于顶部，否则属于底部*/
        _removeList: function($list, prevBool) {
            var obj = {};
            obj.key = $list.attr(this.pageAttrName);
            obj.value = $list.html();
            (prevBool ? this.preRemovedArry.push(obj) : this.nextRemovedArry.push(obj));
            $list.remove();
        },
        /* 获取一个删除的列表，加上自身的开始标记和结束标记重组listDomStr, prevBool: true则获取顶部，否则获取底部 */
        _getMovedListDom: function(prevBool) {
            var list = prevBool ? this.preRemovedArry.pop() : this.nextRemovedArry.pop(),
                tagObj = this.settings.listTagObj;

            return $('<' + tagObj.tagName + ' class="' + tagObj.className + ' ' + this.pageAttrName + '_' + list.key + '" ' + this.pageAttrName + '="' + list.key + '">' + list.value + '</' + tagObj.tagName + '>');
        },
        /* 添加底部dom后设置滚动位置 */
        setScrollTop: function() {
            this.isRemoving = true;
            var $pages = this.$listWrapper.find('.' + this.pageAttrName),
                $firstPage = $pages.first(),
                $lastPage = $pages.last();

            //移除顶部的dom
            this._removeList($firstPage, true);
            document.body.scrollTop = document.body.scrollTop - $lastPage.height();
            this.isRemoving = false;
        },
        /* 判断顶部是否还有隐藏列表 */
        hasUpRemoved: function() {
            return !!this.preRemovedArry[0];
        },
        /* 判断底部是否还有隐藏列表 */
        hasBotRemoved: function() {
            return !!this.nextRemovedArry[0];
        },
        /* 显示上部隐藏的列表 */
        prevRemoved: function() {
            var $lastPage = this.$listWrapper.find('.' + this.pageAttrName).last(),
                $prevDom = $lastPage.prev(),
                height = this._getMovedListDom(true).prependTo(this.$listWrapper).height();

            if ($prevDom.hasClass(this.pageAttrName)) {
                //移除底部的page
                this._removeList($lastPage, false);
                document.body.scrollTop = height;
            }
        },
        /* 显示底部隐藏的列表 */
        nextRemoved: function() {
            this._getMovedListDom(false).appendTo(this.$listWrapper);
            this.setScrollTop();
        },
        /* 判断是否在设置滚动位置 */
        getIsRemoving: function() {
            return this.isRemoving;
        }
    };
    var roll = {
        /* 判断滚动条是否滚动到页面顶部 */
        isTop: function() {
            return document.body.scrollTop == 0;
        },
        /* 判断滚动条是否滚动到页面底部  */
        isBottom: function() {
            return document.body.scrollTop + document.documentElement.clientHeight == document.body.scrollHeight
        }
    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports.Listscroll = Listscroll;
        module.exports.roll = roll;
    } else {
        window.Listscroll = Listscroll;
        window.roll = roll;
    }

})(window, $);
