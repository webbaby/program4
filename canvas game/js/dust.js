/**
 * Created by liuwei on 2017/5/7.
 */
//漂浮物的浮动也是利用的sin函数
var dustObj=function(){
    this.x=[];
    this.y=[];
    this.amp=[];
    this.NO=[];
    this.alpha;
};
dustObj.prototype.num=30;
dustObj.prototype.init=function(){
   for(var i=0;i<this.num;i++){
       this.x[i]=Math.random()*canvasWidth;
       this.y[i]=Math.random()*canvasHeight;
       this.amp[i]=20*Math.random()+15;
       this.NO[i]=Math.floor(Math.random()*7);
   }
    this.alpha=0;//与海葵保持一致
};
dustObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
        var no=this.NO[i];
        ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
    }
};