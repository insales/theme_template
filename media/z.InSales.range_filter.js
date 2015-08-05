(function ( $, window, document ){

  var Range = function(){
    init: function( options,  ){}
  };

  // навешиваем все это на каждый объект
  // так же проверяем, инициировали мы этот эелемент или еще нет
  $.fn.range = function( options ){
    this.each( function(){
      if( !$(this).data( 'range' ) ) {
        var
          range = Object.create( Range );

        range.init( options, this );
        $.data( this, "range", range );
      };
    });

    return this;
  };

}( jQuery, window, document ));