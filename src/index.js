/*
 *document:
 * 	pluginName:  v-scroller
 * 	version: 1.2.4
 * 	author:	Alan Chen
 * 	github:	alanchenchen@github.com
 * 	date:	2018/08/14
 * * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * 
 *Usage:
 * @props params:
 * 	 @snapping (Boolean) 非必选，默认为false 控制滚动的过渡效果，ture为强弹力回弹
 * 	 @smooth (Boolean) 非必选，默认为true 平滑滚动模式，为true，可以惯性滚动
 * 	 @isDownFresh  (Boolean) 非必选，默认为false 是否开启下拉刷新容器
 * 	 @isUpLoad	(Boolean) 非必选，默认为false 是否开启上拉加载容器或者右滑刷新
 * 	 @horizonalMode	(Boolean) 非必选，默认为false 是否为水平滑动模式，true表示自动禁用垂直滚动和下拉刷新
 * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * 
 * @emit events:
 * 	 @downFresh：下拉刷新的自定义事件，必须在isDownFresh为true才有效，直接在事件函数里写业务逻辑
 *   @upLoad：上拉加载的自定义事件，必须在isUpLoad为true才有效，直接在事件函数里写业务逻辑，可以手动结束上拉加载
 * /--以下是插件的生命周期钩子--/
 *   @beforeScroll：滑动前，即手指刚触摸滑动区域，还未移动手指
 *   @scroll：手指滑动中，不包括手指抬起后的滚动动画状态
 *   @afterScroll：手指抬起，一般在此钩子结束后，滑动区域开启滚动动画
 * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * 
 * @static methods apis:
 *   @closeLoad (Function) 此函数不传参，调用后禁止上拉加载动画，一般用在upLoad函数里请求数据结束时调用
 * 	 @refreshLoad(Function) 此函数不传参，调用后重置上拉加载功能
 *   @getPosition (Function) 此函数不传参，获取滑动区域的位移坐标值，返回一个对象,如{x:0,y:0}，可以在 钩子函数里调用，实时获取
 *   @scrollTo (Function(Number,Boolean)) 两个参数，第一个是需要位移的终点坐标值，调用后自动判断是x位移还是y位置，第二个参数可选，默认为false，true表示滚动动画
 * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * *  * * * * * * * * * * * * * * * * * 
 * @slots:
 *  @[name] downfresh:  显示下拉刷新过程中的动画，建议用svg，建议加上spinner类名
 * 	@[name] downfreshText:  下拉刷新的提示文本，默认为'下拉刷新'。
 *  @[name] upload:  显示上拉加载过程中的动画，建议用svg，建议加上spinner类名
 *  @[name] nomore:  禁止上拉加载后显示的内容，建议用文字，建议加上nomore类名
 * 
 * 版本更新log：
 * 
 * v-1.2.0
 * 1.优化生命周期钩子函数
 * 2.解决滚动中位移到边界没有阻尼留出一大片空白的问题
 * 3.(重要)优化多个不同模式scroller嵌套中的滚动影响问题，现在会自动计算是垂直滚动还是水平滚动
 * 4.(重要)模仿原生移动端app滚动，添加位移状态监测，确保每次位移过程中只会做一种方向的滚动(手指触摸过程),避免滚动重叠混乱
 * 5.(重要)解决嵌套scroller中下次滚动继承上次反向滚动运动的bug，现在不会出现突然位移飘的情况
 * 
 * v-1.2.2
 * 1.修正实时滚动的坐标值
 * 2.去除不必要的代码
 * 3.去除禁止滚动层浏览器默认事件的设置，scroller层可以有其它的事件了，避免了scroller内路由跳转失效
 * 4.新增refreshLoad方法，用来刷新上拉加载，重置刷新容器功能
 * 
 * v-1.2.3
 * 1.(重要)解决当滚动层高度小于滚动容器高度时边界滚动出现的bug，现在会自动计算边界值
 * 2.优化上拉加载loading的开关状态
 * 3.优化snapping模式正常滚动的惯性滚动
 * 
 * v-1.2.4
 * 1.(重要)给下拉刷新和上拉加载函数加入参数done。用来精准控制是否结束loading状态。
 * 2.抽离出组件的css到一个单独的css文件。
 * 3.新增downfreshText的slot，优化代码。
 * */
import scroller from './scroller.vue'

const vScroller = {
	install(Vue,opt){
		Vue.component(scroller.name,scroller)
	}
}
export default vScroller

if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(vScroller)
}
