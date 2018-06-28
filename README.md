# v-scroller
> A mobile Vue plugin for scroller

> pluginName:  v-scroller

> version: 1.2.3

> author:	Alan Chen

> github:	alanchenchen@github.com

> date:	2017/12/01

![](https://img.shields.io/badge/downloads-400%2B%2Ftotal-blue.svg)
![](https://img.shields.io/badge/coverage-80%25-blue.svg)
![](https://img.shields.io/badge/npm-%20v1.2.3-orange.svg)
![](https://img.shields.io/badge/vue-%3E%3D2.0.0-orange.svg)

#### This plugin is just only adapted for mobile.

> Please go to the release to see version logs.

## Why making this plugin
* There are so many vue plugins on github,but i haven't found a suitable mini vue plugin for scroller.The best scroller plugin i have seen is the 'better-scroller',however it's not for vue especially.I decide to make a mini vue scroller plugin for my own company programs also for people who wanna use scroller simply.

## What you can do with the plugin
* You can use it to make a scroller container includes pulling-refresh,infinite-loading and horizonal scroller also supporting nesting different direction scroller.

![horizonalMode](./horizonalMode.gif) ![verticalMode](./verticalMode.gif)

[中文文档](./ChineaseREADME.md)
## How to use
* NPM install the v-scroller plugin
```node
npm install v-scroller --save
```
#### 1.vue spa
* import the plugin and use  
``` javascript 
import scroller from 'v-scroller'
Vue.use(scroller)
```
#### 2.script html
* directly write the script,in deed you have to `insert the vue.js` script firstly  
``` html 
<script src="dist/v-scroller.js"></script>
```
* use the component scroller directly in your vue spa file or the Vue instance
``` javascript 
<scroller />
```

## DEMO Codes
``` javascript 
<template>
	<!--verticalMode and infinite and refresh-->
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
	
	<!--nesting scroller with horizonalMode and verticalMode-->
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
	<!--goTop using the scrollTo() function-->
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

> It's suggested that write a single function for ajax in methods and then use the ajax function at the lifeCircle of created，you can continue to use it at the plugin emiting event -- upLoad.Like this：

``` javascript 
	created(){
		//when the component created ,use the ajax function firstly
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
						//if nomore data from the back-end ,use the plugin function closeLoad()
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
			this.limit+=this.limit;//this is the length of data while you request the back-end
			this.refreshData();
		}
	}
```

## Options
#### props

| prop name  |      description                         |required| default |
|:-----------:|:----------------------------------------:|:------:|:-------:|
| snapping    | `[Boolean]`enable snapping mode          |   no   |  false  |
| smooth      | `[Boolean]`enable smooth scrolling       |   no   |  true   |
| isDownFresh | `[Boolean]`enable pull down to refresh   |   no   |  false  |
| isUpLoad    | `[Boolean]`enable infinite loading       |   no   |  false  |
|horizonalMode| `[Boolean]`enable horizonal scroller mode|   no   |  false  |

> Notice:while switching horizonalMode,only upLoad is abled to work,it shows that scroll-right infinite loading also the emit event name is the same to `upLoad`.

#### emit events
* `downFresh `   when you pull down your container at the top border,write your logic in it usually write the ajax.Make sure the `isDownFresh` prop is `true`. 
* `upLoad `   when you scroll your container at the bottom border,write your logic in it usually write the ajax.Make sure the `isUpLoad` prop is `true`. 
* `beforeScroll `  before you scroll just mean you touch the container. 
* `scroll `  when you're scrolling the container.
* `afterScroll `  after you scroll just mean you raise your finger from the container.

#### plugin methods
> Notice:You have to add `ref` to the component `scroller` and then use this.$refs to get following methods.

* `closeLoad (Function) `  no param,forbid infinite loading animation,usually use when your ajax finished.
* `refreshLoad(Function) ` no param,refresh infinite loading .
* `getPosition (Function)`  no param,get current position of scroller content. 
* `scrollTo (Function(Number,Boolean)) `   scroll to a position in scroller content,two params,the first param required `Number`,the second param isn't required ,it means whether open or close the scrolling animation.

#### slots

| slot name    |      description                         | default     | suggest                 |
|:------------:|:----------------------------------------:|:-----------:|:-----------------------:|
| `downrefresh`| animation during pull-down refresh       |   svg       |  add className spinner  |
| `upload`     | animation during infinite loading        |   svg       |  add className spinner  |
| `nomore`     | text while foridden infinite loading     |没有更多内容了|  add className nomore   |
