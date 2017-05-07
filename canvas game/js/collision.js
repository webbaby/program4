/**
 * Created by liuwei on 2017/4/27.
 */
//大鱼吃掉果实
function momFruitCollision(){
    if(!data.gameOver){
        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l<900){
                    fruit.dead(i);
                    data.fruitNum++;
                    wave.born(fruit.x[i],fruit.y[i]);
                    mom.bigBodyCount=mom.bigBodyCount+1;
                    if(mom.bigBodyCount>7){
                        mom.bigBodyCount=7;
                    }
                    if(fruit.fruitType[i]=="blue"){
                        data.double=2;
                    }else{
                        data.double=1;
                    }
                }
            }
        }
    }

}
//大鱼和小鱼的碰撞
function momBabyCollision(){
    if(data.fruitNum>0&&!data.gameOver){
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l<900){
            baby.babyBodyCount=0;
            mom.bigBodyCount=0;
            data.upDate();
            halo.born(baby.x,baby.y);
        }
    }

}