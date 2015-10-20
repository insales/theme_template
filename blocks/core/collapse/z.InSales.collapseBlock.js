// =====================================================================================
//                            COLLAPSE BLOCK CONTROLLER?
// =====================================================================================

InSales.CollapseBlock = function( options ){
  var
    self = this;

  // собираем опции
  init = function(){
    options = options || {};

    // вытаскиваем все из опций и привязывем к контроллеру?
    self.togglerClass = options.togglerClass;
    self.wrapperClass = options.wrapperClass;
    self.targetClass  = options.targetClass;
    self.siblings     = options.siblings || false;

    self.binding();

    // если указываем blockType, то генерим плагин переключения
    if( options.blockType ){
      self.blockType    = 'collapse'+ options.blockType;
      self.initPlugin();
    }
  };

  // биндим события стандартного блока
  self.binding = function(){
    $( document ).on( 'click touchstart', '.'+ self.togglerClass, function( e ){
      e.preventDefault();

      var
        params    = getParams( $(this) ),
        animation = params.animate || 'toggle',
        speed     = parseInt( params.speed ) || false,

        $parent   = $(this).parents( '.'+ self.wrapperClass +':first' ),
        $target   = $parent.find( '.'+  self.targetClass +':first' );

      if( speed ){
        $target[ animation ]( speed );
      }else{
        $target[ animation ]();
      }
    });
  };

  // биндим плагин в jQuery
  // TODO убрать чертову магию
  self.initPlugin = function(){
    (function ( $, window, document ){
      // объявляем логику
      var collapseBlock = {
        init: function( options, el, Block ){
          var
            self = this;

          options = options || {};

          // выставляем начальные значения
          self.wrapperSelector  = options.wrapper;

          // список классов дял переключения
          self.wrapperClass     = Block.wrapperClass;
          self.togglerClass     = Block.togglerClass;
          self.targetClass      = Block.targetClass;

          self.breakPoint       = options.breakpoint || 800;

          self.collapseEnabled  = false;
          self.collapseDisabled = true;

          // подтягиваем элементы
          self.togglerElement = $( el );
          self.wrapperElement = self.togglerElement.parents( self.wrapperSelector +':first' );
          self.targetElement  = self.wrapperElement.find( '.'+ Block.targetClass +':first' );

          //self.binding();
        },
        binding: function(){
          var
            self = this;

          // вешаем обработку события "resize"
          $( window )
            .on( 'resize', function(){
              if( $( window ).width() <= self.breakPoint ){
                if( !self.collapseEnabled ){
                  self.collapseEnabled = true;
                  self.collapseDisabled = false;
                  self.changeState();
                }
              }else{
                if( !self.collapseDisabled ){
                  self.collapseDisabled = true;
                  self.collapseEnabled = false;
                  self.changeState();
                }
              }
            })
            .trigger('resize');
        },
        changeState: function(){
          var
            self = this;

          // переключаем опорные классы
          self.wrapperElement
            .toggleClass( self.wrapperClass );
          self.togglerElement
            .toggleClass( self.togglerClass );

          self.targetElement
            .toggleClass( self.targetClass +'--collapse' )
            .removeAttr( 'style' );
        },
      };

      // запиливаем соответствующий jQuery плагин
      $.fn[ self.blockType ] = function( options ){
        this.each( function(){
          var
            collapse  = Object.create( collapseBlock );

          collapse.init( options, this, self );
          collapse.binding();
          // и вот тут магия, эта строчка ду нот ворк
          //$.data( this, [ self.blockType ], collapse );
        });

        return this;
      };

    }( jQuery, window, document ));
  };

  init();
};
