// =======================================================================================
//                                      AJAX SEARCH
// =======================================================================================

InSales.Search = function( options ){
  var
    self = this;

  // приводим все в порядок
  init = function(){
    options             = options || {};
    self.searchSelector = options.searchSelector || '.js-ajax_search-input';
    self.searchWrapper  = options.searchWrapper  || '.search_widget';
    self.markerClass    = options.markerClass    || 'ajax_search-marked';

    self.path = '/search_suggestions';

    self.data = {
      account_id: Site.account.id,
      locale:     Site.language.locale,
      fields:     [ 'price_min', 'price_min_available' ],
      hide_items_out_of_stock: Site.account.hide_items,
    };

    self.binding();
  };

  self.binding = function(){
    var
      keyupTimeoutID = '',
      $search = $( self.searchSelector );

    $search.on( 'keyup', function(){
      var
        $data = {};

      self.data.query = $search.val();

      clearTimeout( self.keyupTimeoutID );

      if( self.data.query !== '' && self.data.query.length >= 3 ){
        self.keyupTimeoutID = setTimeout( function(){
          $.getJSON( self.path, self.data,
            function( response ){
              $data = self.makeData( response, $search.val() );

              Events( 'onAjaxSearch' ).publish( $data );
            });
        }, 300 );

        $( document ).on( 'click', 'body', self.outClick );
      }else{
        // возвращаем пустой объект, чтобы спрятать результат поиска
        Events( 'onAjaxSearch' ).publish( $data );

        $( document ).off( 'click', 'body', self.outClick );
      }
    });
  };

  self.outClick = function( event ){
    var $search = $( self.searchWrapper );

    if( $( event.target ).closest( $search ).length ) return;
      Events( 'onAjaxSearch' ).publish( {} );
    event.stopPropagation();
    $( document ).off( 'click', 'body', self.outClick );
  };

  // приводим в общий порядок список поиска
  self.makeData = function( $data, keyword ){
    var
      replacment = '<span class="'+ self.markerClass +'">$1</span>';

    $.each( $data.suggestions, function( index, product ){
      product.id    = product.data;
      product.url   = '/product_by_id/'+ product.id;
      product.title = product.value;
      product.marked_title = product.value.replace( new RegExp( '('+ keyword +')', 'gi' ), replacment );
    });

    return $data;
  };

  init();
};
