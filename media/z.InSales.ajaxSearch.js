// =======================================================================================
//                                      AJAX SEARCH
// =======================================================================================

InSales.Search = function( options ){
  var
    self = this;

  init = function(){
    var
      keyupTimeoutID = '',
      path           = '/search_suggestions',

      data = {
        account_id: Site.account.id,
        locale:     Site.locale,
        fields:     [ 'price_min', 'price_min_available' ],
        hide_items_out_of_stock: Site.account.hide_items,
      };

    options        = options || {};
    options.searchSelector = options.searchSelector|| '.js-ajax_search-input';

    $search = $( options.searchSelector ),

    $search.on( 'keyup', function(){
      var
        $data = {};

      data.query = $search.val();

      clearTimeout( keyupTimeoutID );

      if( data.query != '' && data.query.length >= 3 ){
        keyupTimeoutID = setTimeout( function(){
          $.getJSON( path, data,
            function( response ){
              $data = self.makeData( response, $search.val() );

              Events( 'onAjaxSearch' ).publish( $data );
            });
        }, 300 );
      }else{
        // возвращаем пустой объект, чтобы спрятать результат поиска
        Events( 'onAjaxSearch' ).publish( $data );
      };
    });
  };

  // приводим в общий порядок список поиска
  self.makeData = function( $data, keyword ){
    var
      replacment = '<span class="marked">$1</span>';

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