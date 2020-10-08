window.bgtime1 = 30;
window.bgtime2 = 30;
window.bgtime3 = 20;
window.bgtime4 = 20;
window.bgtime5 = 8;
window.BackMoveFloor = 12;

window.FloorMoveTime1 = 4;
window.MainMoveControlTime = 0.2;
window.BuyHeroScoreType = 0;//积分购买
window.BuyHeroMoneyType = 1;//金币购买
window.BuyHeroStoneType = 2;//石头购买
window.BuyTimeType = 3;      //未开放
window.HAS_Run = 0;
window.HAS_Jump1 = 1;
window.HAS_Jump2 = 2;
window.HAS_button = 3;
window.FloorBlockMin = 0;//中间地板快
window.FloorBlockRight = 1;//右地板快
window.FloorBlockLeft = 2;//左地板快
window.FloorBlockNode= 3;//左地板快

window.FloorWidth = 120;//地板快宽度
window.HeroDir_None = 0;//不动
window.HeroDir_Up = 1;//上
window.HeroDir_Down = -1;//下

window.CollisionType_Floor = 1;
window.CollisionType_Death = 2;
window.CollisionType_Push = 3;

window.g_HeroBuyData = new Array();
window.g_HeroBuyData[0]={id:0,style:0,bTimeShow:false,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[6000,150]};
window.g_HeroBuyData[1]={id:1,style:1,bTimeShow:false,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[7000,180]};
window.g_HeroBuyData[2]={id:2,style:1,bTimeShow:true,valueType:[BuyHeroMoneyType,BuyHeroScoreType],value:[8000,200]};