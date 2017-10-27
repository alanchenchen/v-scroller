# v-scroller
> A Vue plugin for scroller

> pluginName:  v-scroller

> version: 1.1.1

> author:	Alan Chen

> github:	alanchenchen@github.com

> date:	2017/10/24

* 请注意：本插件只适配了移动端...有bug请直接提issue...

## 插件可以做什么？
* 此插件是大多ui库实现组件的基础插件，你可以直接拿来做移动端滚动，也可以使用下拉刷新和上拉加载容器，还可以嵌套多个scroller组件实现横向滚动和垂直滚动(`注意单个scoller只能一个方向滚动`)。插件暴露了一些方法，可以搭配写出回到顶部和banner等组件，搭配着钩子函数可以实时监测scroller滚动的位置来解决比较复杂的业务逻辑

![horizonalMode](/horizonalMode.gif)
![verticalMode](/verticalMode.gif)
## 使用方法
* 通过NPM 安装 v-scroller 插件
```node
npm install v-scroller --save
```
#### 1.在vue单文件里使用(vue-cli)
* 通过import或者require 导入插件并手动调用Vue.use()  
``` javascript 
import scroller from 'v-scroller'
Vue.use(scroller)
```
#### 2.在script标签里使用
* 直接在script标签里通过src引入，但你必须先引入vuejs的script  
``` html 
<script src="dist/v-scroller.js"></script>
```
* 直接在vue单文件组件里使用或者在html里使用组件
``` javascript 
<scroller />
```

## 选项
#### props

| prop name  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| snapping    | `[Boolean]`是否开启强回弹模式          |   no   |  false  |
| smooth      | `[Boolean]`是否开启惯性平滑滚动       |   no   |  true   |
| isDownFresh | `[Boolean]`是否开启下拉刷新   |   no   |  false  |
| isUpLoad    | `[Boolean]`是否开启上拉加载      |   no   |  false  |
|horizonalMode| `[Boolean]`是否开启横向滚动模式(开启后禁止垂直滑动和下拉刷新)|   no   |  false  |

#### 组件自定义事件
* `downFresh `   下拉刷新的自定义事件，直接将ajax逻辑写在里面，必须保证isDownFresh为true. 
* `upLoad `   上拉加载的自定义事件，直接将ajax逻辑写在里面，isUpLoad为true，可以通过组件自带的closeLoad()方法手动禁止加载然后不再请求数据. 
* `beforeScroll `  滚动前，即手指刚触摸滑动区域，还未移动手指
* `scroll `  手指滑动中，不包括手指抬起后的滚动动画状态
* `afterScroll `  手指抬起，一般在此钩子结束后，滑动区域开启滚动动画

#### 插件内组件自带方法
> 注意：必须给scroller组件绑定一个ref，然后通过this.$refs拿到组件再调用下列方法，并没有在插件里集成实例方法

* `closeLoad (Function) `  此函数不传参，调用后禁止上拉加载动画，一般用在upLoad函数里请求数据结束时调用
* `getPosition (Function)`  此函数不传参，获取滚动区域的位移坐标值，返回一个对象,如{x:0,y:0}，可以在钩子函数里调用，实时获取
* `scrollTo (Function(Number,Boolean)) `   两个参数，第一个必选，是需要位移的终点坐标值，调用后自动判断是x位移还是y位置，第二个参数可选，默认为false，true表示滚动动画

#### slots插槽

| slot name    |      description                         | default     | suggest                 |
|:------------:|:----------------------------------------:|:-----------:|:-----------------------:|
| `downrefresh`| 显示下拉刷新过程中的动画，建议用svg       |   svg       |  建议加上spinner类名  |
| `upload`     | 显示上拉加载过程中的动画，建议用svg        |   svg       |  建议加上spinner类名  |
| `nomore`     | 禁止上拉加载后显示的内容，建议用文字    |没有更多内容了|  建议加上nomore类名  |
