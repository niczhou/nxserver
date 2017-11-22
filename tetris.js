$(window).ready(function(){
	mainPaint();
});

	//main Paint
	function mainPaint(){
		var c=$('canvas')[0];
		var ct=c.getContext('2d');
		var tSize=12;
		var sleepTime=350;
		var tsList=new Array();
		var t;
		var bgColor='rgba(0,0,0,255)';
		var isOver=false;
				
		drawUI();
		t=rndTs();
		tsList.push(t);
		t.drawTs();
		var timer=setInterval(function(){
			t.clearTs();
			// if(isOver(t)==false){
				if(isBottom(t)){
					t.drawTs();
					clearLine(t.row);
					t=rndTs();
					t.drawTs();
				}else{
					t.row++;
					t.drawTs();
				}
			// }
		},sleepTime);
		
		keyListener();
		function keyListener(){			
			$(window).keydown(function(e){
				var tn=new Tetris(t.type,t.state,t.column,t.row);
				t.clearTs();
				if(e.keyCode==83 && isBottom(tn)){
					t.drawTs();
					clearLine(t.row);
					t=rndTs();
				}else{
					tn.moveTs(e.keyCode);
					if(isMovable(tn)){
						t=tn;
						t.drawTs();
					}else{
						t.drawTs();						
					}
				}
			});
		}
		
		function clearLine(row){
			var colorArr=new Array();
			var colorRgba;
			var color;
			var cout=0;
			
			for(var j=0;j<4;j++){
				cout=0;
				for(var i=0;i<10;i++){
					if(row+3>17){
						row--;
						break;
					}else{
						colorArr=ct.getImageData(tSize*(i+0.5),tSize*(row+3.5),1,1).data;
						colorRgba=colorArrToRgba(colorArr);
						if(colorRgba==bgColor){
							row--;
							break;
						}else{
							cout++;
						}
					}
				}
				if(cout==10){
					for(var i=0;i<10;i++){	//clear full lines;
						t.fillSubRect(i,row+3,bgColor);				
					}
					for(var j=row+3;j>0;j--){
						for(var i=0;i<10;i++){	//copy top row to next row
							colorArr=ct.getImageData(tSize*(i+0.5),tSize*(j-0.5),1,1).data;
							color=colorArrToRgba(colorArr);
							t.fillSubRect(i,j,color);
						}
					}
				}	
			}
		}
			function isOver(inTetris){
				var ts=inTetris;
				(ts.row<1 && isBottom(ts)==true)?true:false;
			}
			
			function isMovable(inTetris){
				var ts=inTetris;
				var xycArr=new Array();
				var colorArr=new Array();
				var colorRgba;

				xycArr=getXYCArr(ts.type, ts.state);
				for(var i=0;i<4;i++){
					if((ts.column+xycArr[i])<0||(ts.column+xycArr[i])>10){
						return false;
					}else{	//下个tn被其他颜色占据
						colorArr=ct.getImageData(tSize*(ts.column+xycArr[i]+0.5),tSize*(ts.row+xycArr[i+4]+0.5),1,1).data;
						colorRgba=colorArrToRgba(colorArr);
						if(colorRgba!=bgColor){
							return false;
						}
					}
				}
				return true;
			}
			
			function isBottom(inTetris){
				var ts=inTetris;
				var xycArr=new Array();
				var colorArr=new Array();
				var colorRgba;
				
				xycArr=getXYCArr(ts.type, ts.state);
				for(var i=0;i<4;i++){
					if((ts.row+xycArr[i+4]+1)>19){
						return true;
					}else{
						colorArr=ct.getImageData(tSize*(ts.column+xycArr[i]+0.5),tSize*(ts.row+xycArr[i+4]+1.5),1,1).data;
						colorRgba=colorArrToRgba(colorArr);
						if(colorRgba!=bgColor){
							return true;
						}
					}
				}
				return false;
			}
				
		function drawUI(){	
			var cw=120;	//parseInt(c.attr('width'));
			var ch=216;	//parseInt(c.attr('height'));
			
			ct.fillStyle=bgColor;
			ct.fillRect(0,0,cw,ch);
			
			ct.lineWidth='1px';
			ct.strokeStyle='#ccf';
			for(var i=1;i<10;i++){
				ct.moveTo(tSize*i+0.5,0);
				ct.lineTo(tSize*i+0.5,324);
				ct.stroke();
			}
			for(var j=1;j<18;j++){
				ct.moveTo(0,tSize*j+0.5);
				ct.lineTo(300,tSize*j+0.5);
				ct.stroke();
			}
		}
	}	
		//generate rnd Tetris
		function rndTs(){
			var rndTs;
			rndTs=new Tetris(Math.round(Math.random()*6+1),Math.round(Math.random()*3+0),Math.round(Math.random()*5+1),0);
			return rndTs;
		}
		
		function colorArrToRgba(arr){	//transform Array to rgba
			var arrStr;
			if(arr===undefined){
				return;
			}else{
				return 'rgba('+arr.join(',')+')';
			}
		}

	//Class Tetris define;
		function Tetris(type, state,column,row){
			this.constructor=Tetris;
			this.type=type;
			this.state=state;
			this.column=column;
			this.row=row;
		
			var c=$('canvas')[0];
			var ct=c.getContext('2d');
			var xycArr=new Array();
			var bgColor='rgba(0,0,0,255)';
			var tsColor;
			var tSize=12;
			
			Tetris.prototype.fillSubRect=function(column,row,rgbaColor){
				ct.fillStyle=rgbaColor;
				ct.fillRect(tSize*column+1,tSize*row+1,tSize-2,tSize-2);
			}
			
			Tetris.prototype.clearSubRect=function(column,row,BgColor){
				ct.fillStyle=BgColor;
				ct.fillRect(tSize*column+1,tSize*row+1,tSize-2,tSize-2);			
			}
			
			Tetris.prototype.moveTs=function(keyCode){
				switch(keyCode){
						case 87:	this.state=(this.state+1)%4;break;
						case 83:	this.row++;break;
						case 65:	this.column--;break;
						case 68: 	this.column++;break;
						default: 	break;
				}
				return this;
			}
	
			if(typeof this.drawTs != 'function'){		//防止原型对象方法被Override
				Tetris.prototype.drawTs=function(){	
					xycArr=getXYCArr(this.type,this.state);
					tsColor='rgba('+xycArr.slice(8).join(',')+')';
					for(var i=0; i<4;i++){
						this.fillSubRect(this.column+xycArr[i],this.row+xycArr[i+4],tsColor);
					}
					return this;
				}
			}
			
			if(typeof this.clearTs != 'function'){//防止原型对象方法被Override
				Tetris.prototype.clearTs=function(){						
					xycArr=getXYCArr(this.type,this.state);
					for(var i=0; i<4;i++){
						this.clearSubRect(this.column+xycArr[i],this.row+xycArr[i+4],bgColor);
					}
					return this;
				}
			}
		}
			
			function getXYCArr(type, state){
				var xArr=new Array(4);	//[left top right bottom]
				var yArr=new Array(4);	//[top left right bottom]
				var cArr=new Array(4);	//rgbaArr
				yArr.splice(0,3);
				xArr.splice(0,3);
				switch(type){
					case 1:   //一字形
						cArr=[255,127,80,255];
						switch (state){
								case 0:
								case 2:
									xArr=[0,1,2,3];yArr=[0,0,0,0];break;
								case 1:
								case 3:
									xArr=[1,1,1,1];yArr=[0,1,2,3];break;
						}
						break;
					case 2:   //2字形
						cArr=[218,165,32,255];
						switch (state){
								case 0:
								case 2:
									xArr=[0,1,1,2];yArr=[0,0,1,1];break;
								case 1:
								case 3:
									xArr=[2,2,1,1];yArr=[0,1,1,2];break;
						}
						break;
					case 3:   //土字形
						cArr=[255,86,128,255];					
						switch (state){
							case 0:
								xArr=[1,0,1,2];yArr=[0,1,1,1];break;
							case 2:
								xArr=[0,1,2,1];yArr=[0,0,0,1];break;
							case 1:
								xArr=[1,1,2,1];yArr=[0,1,1,2];break;
							case 3:
								xArr=[1,0,1,1];yArr=[0,1,1,2];break;
						}	
						break;
					case 4:   //田字形
						cArr=[143,188,143,255];					
						switch (state){
							case 0:
							case 2:
							case 1:
							case 3:
								xArr=[0,1,0,1];yArr=[0,0,1,1];break;
						}	
						break;
					case 5:   //5字形
						cArr=[95,158,160,255];					
						switch (state){
							case 0:
							case 2:
								xArr=[2,3,1,2];yArr=[0,0,1,1];break;
							case 1:
							case 3:
								xArr=[2,2,3,3];yArr=[0,1,1,2];break;
						}
						break;
					case 6:   //反L字形
						cArr=[70,130,180,255];
						switch (state){
							case 0:
								xArr=[1,1,1,0];yArr=[0,1,2,2];break;
							case 2:
								xArr=[1,2,1,1];yArr=[0,0,1,2];break;
							case 1:
								xArr=[0,0,1,2];yArr=[0,1,1,1];break;
							case 3:
								xArr=[0,1,2,2];yArr=[0,0,0,1];break;
						}
						break;
					case 7:   //7字形
						cArr=[106,90,205,255];
						switch (state){
							case 0:
								xArr=[1, 2, 2, 2];yArr=[0, 0, 1, 2];break;
							case 2:
								xArr=[0, 0, 0, 1];yArr=[0, 1, 2, 2];break;
							case 1:
								xArr=[2, 0, 1, 2];yArr=[0, 1, 1, 1];break;
							case 3:
								xArr=[0, 1, 2, 0];yArr=[0, 0, 0, 1];break;
						}
						break;
					default:
						break;
				}			
				return xArr.concat(yArr,cArr);
			}