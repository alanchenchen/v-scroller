# v-scroller
> A mobile Vue plugin for scroller

> pluginName:  v-scroller

> version: 1.2.3

> author:	Alan Chen

> github:	alanchenchen@github.com

> date:	2017/12/01
* 请注意：本插件只适配了移动端...有bug请直接提issue...

![](https://img.shields.io/badge/downloads-400%2B%2Ftotal-blue.svg)
![](https://img.shields.io/badge/coverage-80%25-blue.svg)
![](https://img.shields.io/badge/npm-%20v1.2.3-orange.svg)
![](https://img.shields.io/badge/vue-%3E%3D2.0.0-orange.svg)

## 重要版本更新日志：
### v-1.2.0
* 1.优化生命周期钩子函数
* 2.解决滚动中位移到边界没有阻尼留出一大片空白的问题
* 3.(重要)优化多个不同模式scroller嵌套中的滚动影响问题，现在会自动计算是垂直滚动还是水平滚动
* 4.(重要)模仿原生移动端app滚动，添加位移状态监测，确保每次位移过程中只会做一种方向的滚动(手指触摸过程),避免滚动重叠混乱
* 5.(重要)解决嵌套scroller中下次滚动继承上次反向滚动运动的bug，现在不会出现突然位移飘的情况

### v-1.2.2
* 1.修正实时滚动的坐标值
* 2.去除不必要的代码
* 3.去除禁止滚动层浏览器默认事件的设置，scroller层可以有其它的事件了，避免了scroller内路由跳转失效
* 4.(重要) 新增refreshLoad方法，用来刷新上拉加载，重置刷新容器功能，方法调用跟closeLoad方法一致

### v-1.2.3
* 1.(重要)解决当滚动层高度小于滚动容器高度时边界滚动出现的bug，现在会自动计算边界值
* 2.优化上拉加载loading的开关状态
* 3.优化snapping模式正常滚动的惯性滚动

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

## DEMO 代码
``` javascript 
<template>
	<!--垂直滚动加下拉刷新加上拉加载容器-->
	<scroller
		ref="scroll"
		@downFresh="downfresh"
		@upLoad="upload"
		@scroll="showPosition"
		@afterScroll="showPosition"
		:snapping="snapping"
		:smooth="smooth"
		:isDownFresh="isDownFresh"
		:isUpLoad="isUpLoad"
		>
		<div slot="nomore" class="nomore">已经到底了，逗逼~</div>
		<ul>
			<li :class="{active:index%2==0}" v-for="(item,index) of num" :key="item">第{{item}}条项目列表</li>
		</ul>
	</scroller>
	
	<!--水平滚动和垂直滚动嵌套-->
	<scroller
		ref="scroll"  
		:snapping="snapping"
		@scroll="showPosition"
		@afterScroll="showPosition"
		>
		<div class="_testBox" v-for="item of 20">
			<scroller
				@upLoad="upload"
				:snapping="snapping"
				:isUpLoad="isUpLoad"
				:horizonalMode="horizonalMode"
				>
				<div class="boxRoom">
					<div :class="{active:index%2==0}" class="box" v-for="(item,index) of num" :key="item">{{item}}</div>		
				</div>
			</scroller>
		</div>
		<div slot="nomore" class="nomore">已经到底了，逗逼~</div>
	</scroller>
	<!--用scrollTo()方法制作的回到顶部-->
	<div class="record" @click="goTop">
		x:{{left}},y:{{top}}
	</div>
</template>
<script>
export default{
	data(){
		return{
			num:[],
			snapping:true,
			isDownFresh:true,
			isUpLoad:true,
			smooth:true,
			horizonalMode:true,
			left:0,
			top:0
		}
	},
	created(){
		for(let i=0;i<5;i++){
			this.num.push(i)
		}
	},
	methods:{
		downfresh(){
			console.log('下拉刷新啦')
			let b = this.num[0];
			for(let i = b;i>=b-5;i--){
				this.num.unshift(i);
			}
		},
		upload(){
			console.log('上拉加载啦')
			if(this.num[this.num.length-1]<25){
				let b = this.num[this.num.length-1];
				for(let i = b+1;i<=b+5;i++){
					this.num.push(i);
				}
			}else{
				this.$refs.scroll.closeLoad();
			}
		},
		showPosition(){
			let {x:left,y:top} = this.$refs.scroll.getPosition();
			this.left = left;
			this.top = top;
		},
		goTop(){
			this.$refs.scroll.scrollTo(0,true);
			this.showPosition();
		}
	}
}
</script>
```

> 建议在methods里将请求后台数据的逻辑抽离出来，然后在created钩子里调用一次，在组件upLoad里继续调用。这样方便管理业务逻辑。如下列写法：

``` javascript 
	created(){
		//初始组件加载一次数据
		this.refreshData();
	},
	methods:{
		refreshData(){
			const data = `telephone=${this.$store.state.BookOrderInfo.telephone}&start=${this.start}&limit=${this.limit}`
			this.$http({
				method:'POST',
				url:this.$_URL+'/api/listHistoryRecord',
				data:data
			})
			.then(
				res=>{
					if(res.data.code == '0000'){
						//此处是判断数据加载完毕的条件，如果后台数据加载完毕，手动调用closeLoad()，不再请求后台
						if(res.data.data.length==this.History.length){
							this.$refs.scroller.closeLoad();
						}else{
							this.History = res.data.data;
						}
					}
			})
			.catch(
				err=>console.log(err)
			)
		},
		upLoad(){
			this.limit+=this.limit;//这里是请求后台的参数，数据的数量
			this.refreshData();
		}
	}
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

> 注意:当切换到horizonalMode后,只有上拉加载容器,表现为右滑加载,自定义事件名称不变.

#### 组件自定义事件
* `downFresh `   下拉刷新的自定义事件，直接将ajax逻辑写在里面，必须保证isDownFresh为true. 
* `upLoad `   上拉加载的自定义事件，直接将ajax逻辑写在里面，必须保证isUpLoad为true，可以通过组件自带的closeLoad()方法手动禁止加载然后不再请求数据. 
* `beforeScroll `  滚动前，即手指刚触摸滑动区域，还未移动手指
* `scroll `  手指滑动中，不包括手指抬起后的滚动动画状态
* `afterScroll `  手指抬起，一般在此钩子结束后，滑动区域开启滚动动画

#### 插件内组件自带方法
> 注意：必须给scroller组件绑定一个ref，然后通过this.$refs拿到组件再调用下列方法，并没有在插件里集成实例方法

* `closeLoad (Function) `  此函数不传参，调用后禁止上拉加载动画，一般用在upLoad函数里请求数据结束时调用
* `refreshLoad(Function) `  此函数不传参，调用后重置上拉加载功能
* `getPosition (Function)`  此函数不传参，获取滚动区域的位移坐标值，返回一个对象,如{x:0,y:0}，可以在钩子函数里调用，实时获取
* `scrollTo (Function(Number,Boolean)) `   两个参数，第一个必选，是需要位移的终点坐标值，调用后自动判断是x位移还是y位移，第二个参数可选，默认为false，true表示有滚动动画

#### slots插槽

| slot name    |      description                         | default     | suggest                 |
|:------------:|:----------------------------------------:|:-----------:|:-----------------------:|
| `downrefresh`| 显示下拉刷新过程中的动画，建议用svg       |   svg       |  建议加上spinner类名  |
| `upload`     | 显示上拉加载过程中的动画，建议用svg        |   svg       |  建议加上spinner类名  |
| `nomore`     | 禁止上拉加载后显示的内容，建议用文字    |没有更多内容了|  建议加上nomore类名  |
