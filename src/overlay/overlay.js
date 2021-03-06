/**
 * @fileOverview 悬浮层
 * @ignore
 */

define('bui/overlay/overlay',function () {
  var Component =  BUI.Component,
    UIBase = Component.UIBase;

  /**
   * 悬浮层的视图类
   * @class BUI.Overlay.OverlayView
   * @extends BUI.Component.View
   * @mixins BUI.Component.UIBase.PositionView
   * @mixins BUI.Component.UIBase.CloseView
   * @private
   */
  var overlayView = Component.View.extend([
      UIBase.PositionView,
      UIBase.CloseView
    ]);

  /**
   * 悬浮层，显示悬浮信息，Message、Dialog的基类
   * <p>
   * <img src="../assets/img/class-overlay.jpg"/>
   * </p>
   * xclass : 'overlay'
   * @class BUI.Overlay.Overlay
   * @extends BUI.Component.Controller
   * @mixins BUI.Component.UIBase.Position
   * @mixins BUI.Component.UIBase.Align
   * @mixins BUI.Component.UIBase.Close
   * @mixins BUI.Component.UIBase.AutoShow
   * @mixins BUI.Component.UIBase.AutoHide
   */
  var overlay = Component.Controller.extend([UIBase.Position,UIBase.Align,UIBase.Close,UIBase.AutoShow,UIBase.AutoHide],{
    
    show : function(){
      var _self = this,
        effectCfg = _self.get('effect'),
        el = _self.get('el'),
		    visibleMode = _self.get('visibleMode'),
        effect = effectCfg.effect,
        duration = effectCfg.duration;

  	  if(visibleMode === 'visibility'){
    		overlay.superclass.show.call(_self);
    		if(effectCfg.callback){
              effectCfg.callback.call(_self);
        }
    		return;
  	  }
      //如果还未渲染，则先渲染控件
      if(!_self.get('rendered')){
        _self.set('visible',true);
        _self.render();
        _self.set('visible',false);
        el = _self.get('el');
      }
      
      switch(effect){
        case  'linear' :
          el.show(duration,callback);
          break;
        case  'fade' :
          el.fadeIn(duration,callback);
          break;
        case  'slide' :
          el.slideDown(duration,callback);
          break;
        default:
          callback();
        break;
      }

      function callback(){
        _self.set('visible',true);
        if(effectCfg.callback){
          effectCfg.callback.call(_self);
        }
      }

    },
    hide : function(){
      var _self = this,
        effectCfg = _self.get('effect'),
        el = _self.get('el'),
        effect = effectCfg.effect,
        duration = effectCfg.duration;
  	  if(_self.get('visibleMode') === 'visibility'){
  		  callback();
  		  return;
  	  }
      switch(effect){
        case 'linear':
          el.hide(duration,callback);
          break;
        case  'fade' :
          el.fadeOut(duration,callback);
          break;
        case  'slide' :
          el.slideUp(duration,callback);
          break;
        default:
          callback();
        break;
      }
      function callback(){
        _self.set('visible',false);
        if(effectCfg.callback){
          effectCfg.callback.call(_self);
        }
      }

    }
  },{
    ATTRS : 
	/**
	* @lends BUI.Overlay.Overlay#
  * @ignore 
	**/	
	{
      /**
       * {Object} - 可选, 显示或隐藏时的特效支持, 对象包含以下配置
       * <ol>
       * <li>effect:特效效果，'none(默认无特效)','linear(线性)',fade(渐变)','slide(滑动出现)'</li>
       * <li>duration:时间间隔 </li>
       * </ol>
       * @type {Object}
       */
      effect:{
        value : {
          effect : 'none',
          duration : 0,
          callback : null
        }
      },
      /**
       * whether this component can be closed.
       * @default false
       * @type {Boolean}
       * @protected
       */
      closable:{
          value:false
      },
      visible :{
        value:false
      },
      xview : {
        value : overlayView
      }
    }
  },{
    xclass:'overlay'
  });

  overlay.View = overlayView;
  return overlay;

});