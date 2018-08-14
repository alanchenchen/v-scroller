<template>
	<div ref="container" class="_container">
		<div 
			ref="content" 
			@touchstart="start" 
			@touchmove="move" 
			@touchend="end" 
			:class="{horizonalMode:horizonalMode}" 
			class="_content" 
			:style="{transition:transition,transform:translate}">
			<!--下拉刷新容器只有在垂直滑动，开启下拉刷新才出现-->	
			<div 
				ref="down" 
				v-if="!horizonalMode&&isDownFresh" 
				class="downfresh fresh">
				<div v-if="!downfresh">
					<svg :class="{arrow_active:-y>=downY}" viewBox="0 0 63.657 63.657" xml:space="preserve" class="arrow"><g><g><g><g><polygon points="31.891,63.657 0.012,35.835 2.642,32.821 31.886,58.343 61.009,32.824 63.645,35.832" fill="#AAA"></polygon></g></g> <g><g><rect x="29.827" width="4" height="60" fill="#AAA"></rect></g></g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g></svg>
					<slot name="downfreshText">下拉刷新</slot>
				</div>
				<slot v-else name="downfresh">
					<svg class="spinner" viewBox="0 0 64 64">
				        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g>
					</svg>
				</slot>
			</div>
			<!--上拉加载容器只有在垂直滑动,开启上拉加载才出现-->	
			<div 
				ref="up" 
				v-if="!horizonalMode&&isUpLoad" 
				class="upload fresh">
				<slot v-if="!loadFinish&&upload" name="upload">
					<svg class="spinner" viewBox="0 0 64 64">
					 	<g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g>
					</svg>
				</slot>
				<slot v-else-if="loadFinish" name="nomore">
					<div class="nomore">没有更多内容了</div>
				</slot>
			</div>
			<slot></slot>
		</div>
		<!--待完成的侧边栏滚动条-->
		<!--<div class="_scrollBar"></div>-->
	</div>
</template>

<script>
export default {
	name:'scroller',
	props:{
		//选择回弹力度大的模式
		snapping: {
			type:Boolean,
			default:false
		},
		//是否开启下拉刷新
		isDownFresh: {
			type:Boolean,
			default:false
		},
		//是否开启上拉加载
		isUpLoad: {
			type:Boolean,
			default:false
		},
		//选择惯性滑动模式
		smooth: {
			type:Boolean,
			default:true
		},
		//选择水平滑动模式同时禁止垂直滑动
		horizonalMode: {
			type:Boolean,
			default:false
		}
	},
	data(){
		return {
			startTime:0,	//手指触摸开始记录的时间
			miniTime:350,	//设置惯性位移时间间隔边界
			translateX:0,	//滚动层的位移样式
			translateY:0,	//滚动层的位移样式
			transition:'',	//滚动层的过渡样式
			startX:0,	//手指触摸的初始x值
			startY:0,	//手指触摸的初始y值
			downY:0,	//下拉刷新的边界y值(两个刷新容器的高度值)
			upY:0,	//上拉加载的边界y值
			maxX:0,	//水平滚动的边界x值
			posi:{x:0,y:0},	//滚动中起始和滑动结束的x和y值，用来记录每次的位置
			damping:4,	//边界滚动的阻尼系数，默认为4
			x:0,	//滚动过程中的实时x值
			y:0,	//滚动过程中的实时y值
			downfresh:false,	//下拉刷新是否显示loading
			upload:false,	//上拉加载是否显示loading
			loadFinish:false,	//上拉加载是否已经加载完毕，禁止加载loading
			isVertical:null,	//控制不同模式滑动过程中禁止另一种滑动的开关
			isHorizonal:null,	//控制不同模式滑动过程中禁止另一种滑动的开关
			hasEventFinished: false, // 下拉刷新或上拉加载事件的数据异步获取是否完毕的事件标识，由开发者手动决定
			eventFlag: '' // 下拉刷新或上拉加载事件的标识
		}
	},
	computed:{
		//根据滚动模式自动选择位移方向
		translate(){
			return this.horizonalMode?this.translateX:this.translateY
		}
	},
	watch: { 
		// 监测事件完成标识。只有当为true时，说明开发者手动完成数据获取，此时根据eventFlag来判断结束哪个事件loading
		hasEventFinished(val) {
			if(val && this.eventFlag == 'downFresh') {
				this.downfresh = false;//关闭下拉loadiing
				this.translateY = `translate3d(0,0,0)`
				this.posi.y = 0
				this.y = this.posi.y
			}
			else if(val && this.eventFlag == 'upLoad') {
				this.upload = false	//关闭上拉loading
				this.y = -this.posi.y
			}
		}
	},
	mounted(){
		//初始滚动容器
		this.translateX = `translate3d(0,0,0)`;
		this.translateY = `translate3d(0,0,0)`;
	},
	updated(){
		//数据发生改变就重置边界值
		this.$nextTick(()=>{
			//获取垂直上拉加载的边界y值
			const maxH = Number.parseFloat(getComputedStyle(this.$refs.content)['height']);
			this.upY = maxH - Number.parseFloat(getComputedStyle(this.$refs.container)['height']);
			
			if(this.upY<0)this.upY=0;//解决滚动层高度没有超过滚动容器高度导致边界计算错误的问题
			
			//获取垂直下拉刷新的边界y值
			if(!this.horizonalMode&&this.isDownFresh ){
				this.downY = Number.parseFloat(getComputedStyle(this.$refs.down)['height']);
			}
			else if(!this.horizonalMode&&this.isUpLoad){
				this.downY = Number.parseFloat(getComputedStyle(this.$refs.up)['height']);
			}
			//获取水平滑动的边界x值
			const maxW = Number.parseFloat(getComputedStyle(this.$refs.content)['width']);
			this.maxX = maxW - Number.parseFloat(getComputedStyle(this.$refs.container)['width']);
		})
	},
	methods:{
		start(e){
			if(this.hasEventFinished) this.hasEventFinished = false // 重置事件完成标识
			this.startTime = new Date().getTime();
			this.startX = e.touches[0].clientX;
			this.startY = e.touches[0].clientY;
			this.$emit('beforeScroll') // 暴露出生命周期函数，滚动之前钩子
		},
		move(e){
			//手指移动的位移
			let moveX = e.changedTouches[0].clientX - this.startX;
			let moveY = e.changedTouches[0].clientY - this.startY;
			this.transition = 'all 0s';//手指移动过程中不需要过渡
			//为了保证每次滚动过程中滚动方向的唯一性，确保只有手指抬起才再次赋值模式开关
			if(!this.horizonalMode&&!this.isVertical){
				//手指只要确定了滚动趋势就生成一个开关，移动过程中不会改变
				this.isVertical = {flag:Math.abs(moveY)*2>Math.abs(moveX)};
			}
			if(this.horizonalMode&&!this.isHorizonal){
				//手指只要确定了滚动趋势就生成一个开关，移动过程中不会改变
				this.isHorizonal = {flag:Math.abs(moveX)>Math.abs(moveY)*1.5};
			}
			//当模式为垂直滑动时，自动计算纠正水平滑动
			if(!this.horizonalMode&&this.isVertical.flag){
				let movingY = this.posi.y+moveY;//获取滚动中的y值
				let borderH = this.isUpLoad?-this.upY - this.downY:-this.upY;//上拉边界距离
				let flag = this.isUpLoad?this.loadFinish:true;//自动判断阻尼状态
				//下拉遇到边界处理的阻尼位移
				if(movingY>=0){
					var slowMoveY = 0+movingY/this.damping; 
				}
				//上拉遇到边界处理的阻尼位移
				else if(flag&&movingY<=borderH){
					//slowMove等于边界值加上滚动y值减去边界值之后除以阻尼值
					var slowMoveY = borderH+(movingY - borderH)/this.damping;
				}
				//模拟下拉和上拉到临界距离的阻尼行为
				if((movingY>=0) || (flag&&movingY<=borderH)){
					this.translateY = `translate3d(0,${slowMoveY}px,0)`;
				}
				//非边界位移是正常位移
				else{
					this.translateY = `translate3d(0,${movingY}px,0)`;
				}
				//暴露出去的位移值取整显示
				this.y = -Number.parseInt(this.$refs.content.style.transform.split('(')[1].split(',')[1]);
			}
			//当模式为水平垂直滑动时，自动计算纠正垂直滑动
			else if(this.horizonalMode&&this.isHorizonal.flag){
				let movingX = this.posi.x+moveX;//获取滚动中的x值
				//左滑遇到边界处理的阻尼位移
				if(movingX>=0){
					var slowMoveX = 0+movingX/this.damping; 
				}
				//右滑遇到边界处理的阻尼位移
				else if(movingX<=-this.maxX){
					var slowMoveX = -this.maxX+(movingX+this.maxX)/this.damping;
				}
				//模拟左滑和右滑临界距离的阻尼行为
				if((movingX>=0) || (movingX<=-this.maxX)){
					this.translateX = `translate3d(${slowMoveX}px,0,0)`;
				}
				//非边界位移是正常位移
				else{
					this.translateX = `translate3d(${movingX}px,0,0)`;
				}
				//暴露出去的位移值取整显示
				this.x = -Number.parseInt(this.$refs.content.style.transform.split('(')[1].split(',')[0]);
			}
			this.$emit('scroll')//暴露出生命周期函数，滚动中钩子
		},
		end(e){
			const endTime = new Date().getTime();
			let moveTime = endTime - this.startTime;
			let endX = e.changedTouches[0].clientX - this.startX;
			let endY = e.changedTouches[0].clientY - this.startY;
			//惯性滑动触发条件
			if(this.smooth&&moveTime<=this.miniTime){
				if(!this.horizonalMode){
					endY = (e.changedTouches[0].clientY - this.startY)*moveTime/60;
				}else{
					endX = (e.changedTouches[0].clientX - this.startX)*moveTime/60;
				}
			}
			//当模式为垂直滚动时，自动计算纠正水平滚动
			if(!this.horizonalMode&&this.isVertical&&this.isVertical.flag){
				//滚动结束时位移取整
				this.posi.y += endY;
				this.posi.y = Math.ceil(this.posi.y);
				//下拉状态
				if(this.posi.y>0){
					//是否开启强回弹模式
					this.snapping?this.transition = 'all 0.2s ease-out':this.transition = 'all 0.4s ease-out';
					//开启下拉刷新容器
					if(this.isDownFresh){
						//下拉刷新失败
						if(this.posi.y>0&&this.posi.y/this.damping<this.downY){
							this.posi.y = 0;
							this.translateY = `translate3d(0,${this.posi.y}px,0)`;
							this.y = this.posi.y;
						}
						//下拉刷新成功
						else if(this.posi.y/this.damping>=this.downY){
							this.translateY = `translate3d(0,${this.downY}px,0)`;
							this.downfresh = true;//开启下拉loading
							this.eventFlag = 'downFresh'
							// emit event是否异步完成,回调出去的函数参数，用来手动让emit event事件完毕
							const done = () => this.hasEventFinished = true 
							setTimeout(()=>{
								//数据加载的事件
								this.$emit('downFresh', done)
							},1500)
						}
					}
					//不开启下拉刷新容器
					else{
						this.posi.y = 0;
						this.translateY = `translate3d(0,${this.posi.y}px,0)`;
						this.y = this.posi.y;
					}
				}
				//上拉状态
				else if(this.posi.y<=-this.upY){
					//是否开启强回弹模式
					this.snapping?this.transition = 'all 0.2s ease-out':this.transition = 'all 0.4s ease-out';
					this.posi.y = this.isUpLoad?-this.upY - this.downY:-this.upY;
					this.translateY = `translate3d(0,${this.posi.y}px,0)`;
					//开启上拉加载容器
					if(this.isUpLoad&&!this.loadFinish){
						this.upload = true;//开启上拉loading
						this.eventFlag = 'upLoad'
						// emit event是否异步完成,回调出去的函数参数，用来手动让emit event事件完毕
						const done = () => this.hasEventFinished = true 
						setTimeout(()=>{
							//数据加载的事件
							this.$emit('upLoad', done);
						},1500)
					}
					//不开启上拉加载容器
					else{
						this.y = this.upY;
					}
				}
				//正常滚动状态
				else{
					this.transition = 'all 0.4s ease-out';
					this.translateY = `translate3d(0,${this.posi.y}px,0)`;
					this.y = -this.posi.y;
				}
			}
			//当模式为水平滑动时，自动计算纠正垂直滑动
			else if(this.horizonalMode&&this.isHorizonal&&this.isHorizonal.flag){
				//滑动结束时位移取整
				this.posi.x += endX;
				this.posi.x = Math.ceil(this.posi.x);
				//左滑状态
				if(this.posi.x>0){
					//是否开启强回弹模式
					this.snapping?this.transition = 'all 0.2s ease-out':this.transition = 'all 0.4s ease-out';
					this.posi.x = 0;
					this.translateX = `translate3d(${this.posi.x}px,0,0)`;
					this.x= this.posi.x;
				}
				//右滑加载状态
				else if(this.posi.x<=-this.maxX){
					//是否开启强回弹模式
					this.snapping?this.transition = 'all 0.2s ease-out':this.transition = 'all 0.4s ease-out';
					this.posi.x = -this.maxX;
					this.translateX = `translate3d(${this.posi.x}px,0,0)`;
					//是否开启右滑加载容器
					if(this.isUpLoad){
						this.$emit('upLoad');
						this.x = -this.posi.x;
					}
				}
				//正常滚动状态
				else{
					this.transition = 'all 0.4s ease-out';
					this.translateX = `translate3d(${this.posi.x}px,0,0)`;
					this.x = -this.posi.x;
				}
			}
			//手指抬起重置滚动模式的开关
			this.isVertical = null
			this.isHorizonal = null
			this.$emit('afterScroll')//暴露出生命周期函数，滑动之后钩子
		},
		//上拉加载完毕，禁止加载动画
		closeLoad(){
			this.loadFinish = true;
		},
		//重置上拉加载开关为true
		refreshLoad(){
			this.loadFinish = false;
		},
		//获取当前滑动的x和y值
		getPosition(){
			return {x:this.x,y:this.y}
		},
		//滚动到指定坐标位置，自动判断x位移还是y位移，并选择是否开启动画
		scrollTo(val,animate=false){
			animate?this.transition = 'all 0.3s ease-out':this.transition = 'all 0s';
			if(this.horizonalMode){
				this.posi.x = -val;//重置当前滚动容器位置
				this.translateX = `translate3d(${this.posi.x}px,0,0)`;
				this.x = -this.posi.x;//重置当前滚动容器坐标
			}else{
				this.posi.y = -val;//重置当前滚动容器位置
				this.translateY = `translate3d(${this.posi.y}px,0,0)`;
				this.y = -this.posi.y;//重置当前滚动容器坐标
			}
		}
	}
}
</script>

<style scoped>
._container{
	position: relative;
	overflow: hidden;
	width:100%;
	height:100%;
}
._container .horizonalMode{
	position: absolute;
	width: auto;
	height: 100%;
}
._scrollBar{
	position: absolute;
	right: 0;
	width:.1rem;
	height: 4rem;
	border-radius: 1rem;
	background: rgba(0,0,0,.55);
}
._content{
	position: absolute;
	width: 100%;
}
.fresh{
	position: absolute;
	left: 0;
	width: 100%;
	height: 1.1rem;
	text-align: center;
	color: #4b8bf4;
	font-size: .3rem;
}
.downfresh{
	top:-1.1rem;
}
.upload{
	bottom: -.8rem;
	height:.8rem !important ;
}
.upload .nomore{
	line-height: .8rem;
}
.arrow{
	stroke: #4b8bf4;
    height: .4rem;
    margin: .15rem auto 0;
    transform: translateZ(0) rotate(0deg);
    transition: transform .2s linear;
}
.arrow_active{
	transform: translateZ(0) rotate(180deg);
}
.spinner{
	stroke: #4b8bf4;
	width: .7rem;
	height: .6rem;
	margin: .3rem auto 0;
}
.upload .spinner{
	margin: .1rem auto 0;
	width: .6rem;
	height: .6rem;
	fill: #ec4949;
}
</style>