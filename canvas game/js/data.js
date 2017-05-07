/**
 * Created by liuwei on 2017/5/6.
 */
//分值统计
var dataObj=function(){
    this.fruitNum=0;
    this.double=1;
    this.score=0;
    this.gameOver=false;
};

dataObj.prototype.draw=function(){
    var w=canvas1.width;
    var h=canvas1.height;
    ctx1.save(); 
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    ctx1.fillText("score "+this.score,w*0.5,h-80);
    if(this.gameOver){
        this.alpha+=deltaTime*0.0005;
        if(this.alpha>1){
            this.alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
        ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
    }
    ctx1.restore();
};
dataObj.prototype.upDate=function(){
    this.score=this.score+this.fruitNum*20*this.double;
    this.fruitNum=0;
    this.double=1;
};