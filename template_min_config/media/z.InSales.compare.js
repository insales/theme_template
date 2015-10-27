// =====================================================================================
//                                          COMPARE
// =====================================================================================

// TODO: дождаться когда придет номарльный ответ от сервака и привести  в порядок
InSales.Compare = function( options ){
  var
    self = this,
    productsCounter = 0;

  // обновляем
  self.reload = function( callback ){
    var
      $data = {};

    // тащим инфу из куки
    try {
      self.compare = $.parseJSON( $.cookie( 'compare' ) );
    }catch( e ){
      self.compare = null;
    }

    // дропаем все, если список пустой
    if( !self.compare ){
      self.compare  = [];
      self.products = [];

      return;
    }

    // сохраняем кол-во товаров
    productsCounter = self.compare.length;

    $.getJSON( '/compares.json' )
      .done( function( response ){
        self.products = response.products;

        $data = makeData( self );

        if( callback ){
          callback( $data );
        }

        Events( 'onCompare_Update' ).publish( $data );
      });
  };

  // добавляем товар
  self.addItem = function( product_id, $link ) {
    var
      path  = '/compares.json',
      $data = makeData( self );

    // меняем счетчики
    productsCounter = productsCounter +1;

    // проверка на повтор
    showPreloader();

    // проверяем сколкьо товаров
    if( productsCounter > self.maxItems ) {
      hidePreloader();

      Events( 'onCompare_maxItem' ).publish( $data );
    }else{
      if( self.isRepeated( product_id ) ){
        // если такой товар уже в сравнении
        Events( 'onCompare_inList' ).publish( $data );
      }else{
        // закидываем запрос
        $.post( path, { 'product[id]': product_id })
          .done( function( response ){
            self.reload( function( $data ){
              $data.added = product_id;
              $data.jqObj = $link;

              if( $link ){
                $link
                  .parent()
                    .toggleClass( self.triggerClass );
              }

              Events( 'onCompare_Add' ).publish( $data );
            });
          })
          .fail( function( response ){
            console.log( 'Ошибка при добавлении товара в сравнение. Ответ сервера: ', response );
          })
          .always( function(){
            hidePreloader();
          });
      }
    }
  };

  // вешаем триггер добавления в сравнение
  addItemTrigger = function(){
    $( document ).on( 'click', self.addSelector, function( e ){
      e.preventDefault();

      var
        product_id = $(this).data( 'product_id' );

      self.addItem( product_id, $(this) );
    });
  };

  // удаляем товар
  self.removeItem = function( product_id, $link ){
    var
      fields = {
        _method: 'delete',
      },
      path   = '/compares/'+ product_id +'.json';

    showPreloader();

    $.post( path, fields )
      .done( function( response ){
        // обновляем

        self.reload( function( $data ){
          $data.removed = product_id;

          if( $link ){
            $link
              .toggleClass( self.triggerClass );
          }

          Events( 'onCompare_Remove' ).publish( $data );
        });
      })
      .fail( function( response ) {
        console.log( 'Произошла ошибка, ответ сервера: ',response );
      })
      .always( function(){
        hidePreloader();
      });
  };

  // вешаем триггер удаления из сравнения
  removeItemTrigger = function(){
    $( document ).on( 'click', self.removeSelector, function( e ){
      // блокируем обработку повторного нажатия
      if( $(this).attr( 'processed' ) ){
        return;
      }

      var
        product_id = $(this).data( 'product_id' );

      $(this)
        .attr( 'processed', true );

      e.preventDefault();

      self.removeItem( product_id, $(this) );
    });
  };

  self.isRepeated = function( product_id ) {
    var
      result = false;

    if( self.compare ){
      $.each( self.compare, function( index, product ) {

        if( product.id == product_id ) {
          result = true;
          return false;
        }
      });
    }

    return result;
  };

  // првоеряем, добавлен ли товар в сравнение или нет?
  // если да, то добавим класс контейнеру кнопки
  self.checkStatus = function(){
    $( self.addSelector ).each( function(){
      var
        product_id = $(this).data( 'product_id' );

      if( self.isRepeated( product_id ) ){
        $(this)
          .parent()
            .addClass( self.triggerClass );
      }
    });
  };

  // инициализация
  self.init = function(options) {
    options = options || {};

    // подгружаем тексты
    self.text            = options.text         || {};
    self.text.addItem    = self.text.addItem    || 'Товар добавлен к сравнению';
    self.text.removeItem = self.text.removeItem || 'Товар удален из сравнения';
    self.text.repeatItem = self.text.repeatItem || 'Этот товар уже добавлен';
    self.text.maxItem    = self.text.maxItem    || 'Достигнут максимум товаров. Удалите несколько товаров.';

    // тянем опорные классы
    self.addSelector    = options.addSelector    || '.js-compare-add';
    self.removeSelector = options.removeSelector || '.js-compare-remove';
    self.triggerClass   = options.triggerClass   || 'compare-trigger--added';

    // устанавливаем максимум
    self.maxItems = options.maxItems || 4;

    // готовим списки
    self.compare  = [];
    self.products = [];

    self.reload();

    // новые динамические триггеры
    addItemTrigger();
    removeItemTrigger();

    self.checkStatus();
  };

  self.init( options );
};
