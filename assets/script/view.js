// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
  //       hero:{
		// 	type:cc.Animation,
		// 	default:null
		// },
		m_button:{
			type:cc.Button,
			default:null
		},
		m_jump:{
			type:cc.Button,
			default:null
		},
		BG1:{
			type:cc.Node,
			default:[]
		},
		BG2:{
			type:cc.Node,
			default:[]
		},
		BG3:{
			type:cc.Node,
			default:[]
		},
		BG4:{
			type:cc.Node,
			default:[]
		},
		BG5:{
			type:cc.Node,
			default:[]
		},
		m_Floor:{
			type:cc.Node,
			default:[]
		},
		m_HeroPrefab:[cc.Prefab],
		m_GameOver:cc.Node,
    },

    onLoad () {
		this.m_GameOver.active = false;
		g_BaseView = this;
		// var manager = cc.director.getCollisionManager();
		// manager.enabled = true;
		// manager.enabledDebugDraw = true;
		this.m_Hero = cc.instantiate(this.m_HeroPrefab[g_UserInfoData.m_CurSelHeroID] );
		this.node.addChild(this.m_Hero);
		this.m_Hero = this.m_Hero.getComponent('SceneHero');
		this.myheroplay('Run') 
		this.m_button.node.on(cc.Node.EventType.TOUCH_START,this.startbutton,this);
		this.m_button.node.on(cc.Node.EventType.TOUCH_END,this.endbutton,this);
		this.m_button.node.on(cc.Node.EventType.TOUCH_CANCEL,this.endbutton,this);
		this.m_jump.node.on(cc.Node.EventType.TOUCH_START,this.startjump,this);
		
		// var floor = this.m_Floor[0].getComponent('Floor');
		// floor = this.m_Floor[1].getComponent('Floor');
		// floor.changeFloor();
		
		var tmp=[this.BG1,this.BG2,this.BG3,this.BG4,this.BG5]
		var times=[bgtime1,bgtime2,bgtime3,bgtime4,bgtime5]
		for (var j = 0; j < tmp.length; j++) {
		    for (var i = 0; i < this.BG1.length; i++) {
		
		        var width = tmp[j][i].width;
		        tmp[j][i].setPosition(i*(width-3),0);
		        
		        var move1 = cc.moveTo(i*times[j]+times[j],cc.v2(-(width-3),0));
		        var seq1 = cc.sequence(move1,cc.callFunc(this.backMoveEnd,this,times[j]));
		        tmp[j][i].runAction(seq1);
		    }
		    
		}
		for (var i = 0; i < this.m_Floor.length; i++) {
            var floor = this.m_Floor[i].getComponent('Floor');
            floor.setBaseView(this);
            floor.changeFloor();
        }

		
	},
	backMoveEnd:function(target,data)
	{
	    var width = target.width;
	    target.setPosition(width-4,0);
	
	    var move = cc.moveTo(data*2,cc.v2(-(width-4),0));
	    var seq = cc.sequence(move,cc.callFunc(this.backMoveEnd,this,data));
	    target.runAction(seq);
	},
	startjump(){
		cc.log('nn')
		this.animchange(this,'Jump');
	},

  
	startbutton(){
		if(g_UserInfoData.m_CurHAS_State == HAS_Jump1||
            g_UserInfoData.m_CurHAS_State == HAS_Jump2){
			return;
		}
		this.myheroplay('button')
	},
	endbutton(){
		if(g_UserInfoData.m_CurHAS_State == HAS_Jump1||
            g_UserInfoData.m_CurHAS_State == HAS_Jump2){
			return;
		}
		this.myheroplay('Run')
	},
	callBackDown(){
		this.myheroplay('Run')	
	},
	
	animchange(target,data){
		if(data=='Jump'&&this.changeClip('Jump')){
			var moveUp=cc.moveTo(1,-92,42).easing(cc.easeCubicActionOut())
			var moveDown=cc.moveTo(1,-92,-38).easing(cc.easeCubicActionIn())
			var callBack=cc.callFunc(this.callBackDown.bind(this),this.m_Hero.node,this)
			var seq=cc.sequence(moveUp,moveDown,callBack)
			this.m_Hero.node.runAction(seq)
		}
		this.myheroplay(data)
	},
	myheroplay(playname){
		if(this.changeClip(playname)==false){
			return
		}
		if(playname=="button"){
			this.m_Hero.node.setPosition(-92,-29)
		}else if(playname=='Run'){
			this.m_Hero.node.setPosition(-92,-21)
		}
		this.m_Hero.play(playname)
	},
	GameOver:function()
	{
	    
	    var tmpBack=[this.BG1,this.BG2,this.BG3,this.BG4,this.BG5];
	    var times=[bgtime1,bgtime2,bgtime3,bgtime4,bgtime5];
	    for (var j = 0; j < tmpBack.length; j++) {
	        for (var i = 0; i < this.BG1.length; i++) {
	            tmpBack[j][i].stopAllActions();
	        }
	        
	    }
	    
	    for (var i = 0; i < this.m_Floor.length; i++) {
	        this.m_Floor[i].stopAllActions();
	    }
	    
	    this.m_GameOver.active = true;
	},
	onChangeSceneToMainView()
	{
	    
	    cc.director.loadScene("room");
	},
	changeClip(playName)
	{
	    if( playName == 'button')
	    {
	        if( g_UserInfoData.m_CurHAS_State == HAS_Jump1 )
	        {
	            return false;
	        }
	        else if(  g_UserInfoData.m_CurHAS_State == HAS_Run)
	        {
	            return true;
	        }
	    }
	    else if( playName == 'Jump')
	    {
	        if(  g_UserInfoData.m_CurHAS_State == HAS_Run)
	        {
	            return true;
	        }
	        else 
	        {
	            return false;
	        }
	    }
	    return true;
	},

    update (dt) {},
});
