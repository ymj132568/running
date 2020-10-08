cc.Class({
    extends: cc.Component,

    properties: {
        m_BtAction:[cc.Node],
        m_BtPlayerInfo:[cc.Node],
        m_MainView:cc.Node,
        m_SelPlayerView:cc.Node,
        m_SelHeroPrefab:cc.Prefab,
        m_ScrollContent:cc.Node,
        m_HeroPrefab:[cc.Prefab],
        m_HeroEyeClip:cc.Node,
        m_UserDataInfo:cc.Node,
        m_MessageBoxPrefab:cc.Prefab,
        m_SelectPlayerView:cc.Node,
        m_MainPlayHero:cc.Node,
		m_HeroPreFab:[cc.Prefab]
    },
 
    onLoad: function () {

        g_RoomScene = this;
        this.m_MessageBox = cc.instantiate(this.m_MessageBoxPrefab);
        this.node.addChild(this.m_MessageBox);
        this.m_MessageBox = this.m_MessageBox.getComponent('MessageBox');
        this.m_MessageBox.onShow(false);


        this.setHeroEyeClipStyle(0);
        
        this.m_UserDataInfo = this.m_UserDataInfo.getComponent('UserDataInfo');
       
        this.m_MainView.setPosition(0,0);
        this.m_SelPlayerView.active = false;
        this.btStartPos = new Array();
        for (var i = 0; i < this.m_BtAction.length; i++) {
            this.btStartPos[i] = this.m_BtAction[i].getPosition();
        }


        for (var i = 0; i < this.m_BtPlayerInfo.length; i++) {
            var sprite = this.m_BtPlayerInfo[i].getChildByName('bg');
            sprite.active = false;
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_START,this.touchShowTexture,this);
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_END,this.touchHideTexture,this);
            this.m_BtPlayerInfo[i].on(cc.Node.EventType.TOUCH_CANCEL,this.touchHideTexture,this);
        }

        
        this.m_SelectPlayerView = this.m_SelectPlayerView.getComponent('SelectPlayerView');
        this.m_SelectPlayerView.updateHero();
    },
    setHeroEyeClipStyle:function(heroID)
    {
		g_UserInfoData.m_CurSelHeroID=heroID
        this.m_HeroEyeClip.removeAllChildren();
        var hero = cc.instantiate(this.m_HeroPrefab[heroID]);
        this.m_HeroEyeClip.addChild(hero);
        hero = hero.getComponent('SelHeroUiPrefab');
        if( heroID == 1 )
        {
            hero.setBodyScale(0.8,0.8);
        }
        else{
            
            hero.setBodyScale(1,1);
        }

    },
    touchShowTexture:function(target)
    {
       
        var sprite = target.target.getChildByName('bg');
        sprite.active = true;
    },
    touchHideTexture:function(target)
    {
        

        var sprite = target.target.getChildByName('bg');
        sprite.active = false;
    },
    onChangeScene:function(){
        cc.director.loadScene("run");
    },
    onActionBtOutOrIn:function(Out)
    {
        for (var i = 0; i < this.m_BtAction.length; i++) {
            var delaTime = cc.delayTime(0.1*i);
            var moveTo;
            if( Out )
            {
                moveTo = cc.moveTo(MainMoveControlTime,cc.v2(350,this.btStartPos[i].y));
            }
            else{
                moveTo = cc.moveTo(MainMoveControlTime,this.btStartPos[i]);
            }
			var data={index:i,value:Out}
			var fun =  function (target,data ){
				if( data.index== this.m_BtAction.length-1 ){
					if(data.value){
						this.callOpenPlayerView(this);
					}else{
						this.callOpenMainView(this);
					}
				}
			}
			var callBack=cc.callFunc(fun,this,data)
            var sql = cc.sequence(delaTime,moveTo,callBack);
            this.m_BtAction[i].runAction(sql);
        }
		var heroMove ;
		var fade;
		if( Out )
		{
		    heroMove = cc.moveTo(MainMoveControlTime,cc.v2(52,0));
		    fade = cc.fadeOut(MainMoveControlTime);
		}
		else{
		    heroMove = cc.moveTo(MainMoveControlTime,cc.v2(0,0));
		    fade = cc.fadeIn(MainMoveControlTime);
		}
		
		var spawn = cc.spawn(heroMove,fade);
		this.m_MainPlayHero.runAction(spawn);
    },
	callOpenPlayerView:function()
	{
	    this.m_MainView.active = false;
	    this.m_SelPlayerView.active = true;
	},
    onOpenPlayerView:function(){
		this.onActionBtOutOrIn(true);
    },
	callOpenMainView:function()
	{
	    this.m_MainView.active = true;
	    this.m_SelPlayerView.active = false;
	},
    onOpenMainView:function()
    {
		cc.log('aa')
        this.m_MainView.active = true;
        this.m_SelPlayerView.active = false;
		this.onActionBtOutOrIn(false);

    },
    
});
