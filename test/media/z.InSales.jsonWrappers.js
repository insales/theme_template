// =========================================================================
//                            JSON WRAPPERS
// =========================================================================


// TODO: проверить работоспособность всего
// многие обертки - под вопросом

// небольшая обертка для получения информации о товаре
InSales.getProduct = function( id ){
  var
    path = '/product_by_id/'+ id +'.json';

  return $.getJSON( path );
};

// получаем информацию о товарах
//
// id_array - массив или объект, содержащий id товаров
InSales.getProductList = function( id_array ){

  // хелпер для склейки
  concatHelper = function( target, from ){
    //console.log( from );
    // делаем проверку, к нам пришло описание одного товара или пачки
    if( from.product ){
      target.push( from.product );
    }else{
      $.each( from.products, function( index, value ){
        target.push( value );
      });
    }

    return target;
  };

  var
    end   = 0,
    paths = [],
    ids   = [],
    temp;

  if( id_array === null ){
    id_array = [];
  }

  // нормальизуем входной список
  if( type_of( id_array ) == 'Object' ){
    for( var id in id_array ) {
      ids.push( id );
    }
  }else{
    ids = id_array;
  }

  // разбиваем входной массив на пачки по 25 элементов
  paths = ids.reduce( function( p, c, i ){
    if( i % 25 === 0 ){
      p.push([]);
    }

    p[ p.length - 1 ].push(c);
    return p;
  }, []);

  // и генерим массив путей для json
  $.each( paths, function( index, ids ){
    paths[ index ] = '/products_by_id/'+ ids.join() +'.json';
  });

  // собираем задачи
  promises = $.map( paths, function( path ) {
    return $.ajax( path ).then( function( response ){
        return response;
      });
  });

  // в качель. микро чит. максимум в запрос - 100 товаров
  // ну кто еще хочет забрать инфу о более чем 100 товарах,
  // если в шаблон коллекции за раз отдается максимум 100??
  // склеиваем ответы
  temp = $.when.apply( this, promises )
    .then( function( response_1, response_2, response_3, response_4 ){
      var
        $result = [];

      //console.log( response_1, response_2, response_3, response_4 );
      if( response_1 ){
        $result = concatHelper( $result, response_1 );
      }

      if( response_2 ){
        $result = concatHelper( $result, response_2 );
      }

      if( response_3 ){
        $result = concatHelper( $result, response_3 );
      }

      if( response_4 ){
        $result = concatHelper( $result, response_4 );
      }

      return $result;
    });

  return temp;
};

// отправка почтовых сообщений в платформу
// $message - объект JS или jQuery объект формы отправки

InSales.sendMessage = function( $message ){
  var
    $data   = {},
    $fields = {};

  if( type_of( $message ) == 'jQuery' ){
    $fields     = $message.serialize();
    $data.jqObj = $message;
  } else {
    $fields   = $message;
    $data.obj = $message;
  }

  return $.post( '/client_account/feedback.json', $fields );
};

// получение информации об аккаунте

InSales.getAccount = function(){
  return $.getJSON( '/client_account/contacts.json' );
};

// оформление заказа в обход стандартного checout'a
// $checkout - JS объект с полями или jQuery объект формы

InSales.fastCheckout = function( $checkout ){
  var
    $data   = {},
    $fields = {};

  if( type_of( $checkout ) == 'jQuery' ){
    $feilds = $checkout.serialize();
  } else {
    $fields = $checkout;
  }

  $fields.pid_value = 1;

  return $.post( '/fast_checkout.json', $fields );
};
