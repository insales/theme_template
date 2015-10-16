(function ( $, window, document ){

  var Range = {
    init: function( options, range_container ){
      var
        self    = this,
        options = options || {},
        params  = {},
        temp;

      // определяем классы элементов
      options.min_textSelector  = options.min_textSelector  || '.js-range-min_text';
      options.max_textSelector  = options.max_textSelector  || '.js-range-max_text';
      options.min_inputSelector = options.min_inputSelector || '.js-range-min_input';
      options.max_inputSelector = options.max_inputSelector || '.js-range-max_input';
      options.rangeSelector     = options.rangeSelector     || '.js-range';

      // прибиваем все элементы
      self.container = $( range_container );
      self.min_text  = self.container.find( options.min_textSelector );
      self.max_text  = self.container.find( options.max_textSelector );
      self.min_input = self.container.find( options.min_inputSelector );
      self.max_input = self.container.find( options.max_inputSelector );
      // тут немного магии - нам нужен конкретно сам DOM узел
      temp              = self.container.find( options.rangeSelector );
      self.rangeElement = temp.get( 0 );

      // тащим параметры
      params = getParams( temp );

      self.type = params.type || 'property';

      if( params.submit === false ){
        self.submit = false;
      }else{
        self.submit = true;
      }

      temp = getParams( temp.parents( 'form:first' ) );
      if( temp.submit === false ){
        self.submit = false;
      }

      self.step   = params.step   || false;
      self.margin = params.margin || 1;

      // тащим параметры для палгина
      if( self.type == 'property' ){
        self.start = [
          params.start,
          params.end
        ];
        self.range = {
          'min': params.min,
          'max': params.max
        };
      }else{
        self.start = [
          Site.filter.price_min,
          Site.filter.price_max
        ];
        self.range = {
          'min': Site.collection.price_min,
          'max': Site.collection.price_max
        };
      }

      // определяем, залочен он у нас или нет
      if( ( self.range.min < self.start[ 0 ] ) || ( self.start[ 1 ] < self.range.max ) ){
        self.disabled = false;
      }else{
        self.disabled = true;
      }

      self.slider();
      self.binding();
    },

    slider: function(){
      var
        self   = this,
        config = {};

      config = {
        start:   self.start,
        range:   self.range,
        connect: true,
        margin:  self.margin,
        format:  {
          to: function ( value ) {
            return parseInt( value );
          },
          from: function ( value ) {
            return value.replace(',-', '');
          }
        }
      };

      if( self.step ){
        config.step = self.step;
      }

      noUiSlider.create( self.rangeElement, config );
    },

    binding: function(){
      var
        self = this;

      self.rangeElement
        .noUiSlider
          .on( 'update', function( values, handle ){
            var
              value = values[ handle ];

            if( handle ){
              // если дернули правый ползунок
              self.max_input.val( value );
              self.max_text
                .val( value )
                .text( value );
            }else{
              // если левый ползунок
              self.min_input.val( value );
              self.min_text
                .val( value )
                .text( value );
            }
          });

      self.rangeElement
        .noUiSlider
          .on( 'set', function(){
            if( self.is_changed() ){
              self.min_input
                .removeAttr( 'disabled' );

              self.max_input
                .removeAttr( 'disabled' );

              if( self.submit ){
                self.container
                  .parents( 'form:first' ).submit();
              }
            }
          });

      if( self.min_text.is( 'input' ) ){
        self.min_text
          .on( 'change', function(){
            self.rangeElement
              .noUiSlider
                .set( [ $(this).val(), null ] );
          });
      }

      if( self.max_text.is( 'input' ) ){
        self.max_text
          .on( 'change', function(){
            self.rangeElement
              .noUiSlider
                .set( [ null, $(this).val() ] );
          });
      }

      self.min_input
        .attr('disabled', self.disabled );
      self.max_input
        .attr('disabled', self.disabled );
    },
    is_changed: function(){
      return true;
    }
  };

  // навешиваем все это на каждый объект
  // так же проверяем, инициировали мы этот эелемент или еще нет
  $.fn.rangeFilter = function( options ){
    this.each( function(){
      if( !$(this).data( 'rangeFilter' ) ) {
        var
          rangeFilter = Object.create( Range );

        rangeFilter.init( options, this );
        $.data( this, "rangeFilter", rangeFilter );
      }
    });

    return this;
  };

}( jQuery, window, document ));
