// =======================================================================
//                                UI
// =======================================================================

/* дефолтное переключение схлопнутых менюх */
$(document).on( 'click', '.js-menu-toggler', function( e ){
  e.preventDefault();
  var
    params = prepareJSON( $(this).data( 'params' ) ),
    method = params.animate || 'toggle',
    time   = parseInt( params.time ) || 0;

  $(this)
    .parents( '.js-menu-wrapper:first' )
      .find( '.menu--collapse:first' )[method]( time );
});

/* переключение менюшки в сложенный при переходе брейка */
(function ( $, window, document ){
  // объявляем логику
  var collapseMenu ={
    init: function( options, el ){
      var
        self = this;

      options = options || {};

      // выставляем начальные значения
      self.wrapperClass     = options.wrapper    || '.menu-node';
      self.breakPoint       = options.breakpoint || 800;
      self.collapseEnabled  = false;
      self.collapseDisabled = true;

      // подтягиваем элементы
      self.toggler        = $(el);
      self.wrapperElement = self.toggler.parents( self.wrapperClass );
      self.menu           = self.wrapperElement.find( '.menu:first' );

      // вешаем обработку события "resize"
      $( window )
        .on( 'resize', function(){
          if( $(window).width() <= self.breakPoint ){
            if( !self.collapseEnabled ){
              self.collapseEnabled = true;
              self.collapseDisabled = false;
              self.changeState();
            };
          }else{
            if( !self.collapseDisabled ){
              self.collapseDisabled = true;
              self.collapseEnabled = false;
              self.changeState();
            };
          };
        })
        .trigger('resize');
    },
    changeState: function(){
      var
        self = this;

      // переключаем опорные классы
      self.wrapperElement
        .toggleClass('js-menu-wrapper');
      self.toggler
        .toggleClass('js-menu-toggler');

      self.menu
        .toggleClass('menu--collapse')
        .removeAttr( 'style', false );
    },
  };

  // навешиваем все это на каждый объект
  $.fn.collapseMenu = function( options ){
    this.each( function(){
      var
        prices = Object.create( collapseMenu );

      prices.init( options, this );
      $.data( this, "collapseMenu", prices );
    });

    return this;
  };

}( jQuery, window, document ));

/* дефолтное поведение для переключателя в сравнении */
$( document ).on( 'click', '.js-compare-toggle_same', function( e ){
  e.preventDefault();

  $( '.js-compare_row--same' )
    .toggle();
});