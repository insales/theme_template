// =====================================================================================
//                                MODALS
// =====================================================================================

/*
  все function name тащим из modalHelper'a

  closeCbk: function name   - что делаем при закрытии окна
  confirmCbk: function name - что делаем при подтверждении
  readyCbk: function name   - что делаем после полной отрисовки окна
*/

modal = function () {
  var
    self = this;

  // вывод модалки
  self.show = function ($data) {
    // добавляем данные в параметры
    $data = self.makeData( $data );

    // выводим шаблон модалки
    self.render( $data );
  };

  // рендер модалки
  self.render = function( $data ){
    var
      $modal = $( 'div.modal' );

    $( 'body' ).append( InSales.Render( $data, 'modal', $data.template ) );

    $modal = $( 'div.modal' );

    // показываем оверлей
    // либо дефолтный с бекграундом, либо прозрачный
    if( $data.overlay ){
      $( 'body' ).append( '<div class="overlay"></div>' );
    }else{
      $( 'body' ).append( '<div class="overlay overlay--opacity"></div>' );
    }

    // навешиваем параметры на элементы
    setParams( $modal, $data );
    setParams( $( '.overlay' ), $data );
    setParams( $( '.js-modal-close' ), $data );
    setParams( $( '.js-modal-confirm' ), $data );

    changeCss( $modal );

    $( window ).on( 'resize scroll', self.resizeModal );

    // дергаем функцию после отрисовки.
    if( $data.readyCbk ){
      $data.readyCbk( $data );
    }
  };

  // закрытие модалки
  self.close = function(){
    $( window ).off( 'resize scroll', self.resizeModal );

    $( '.modal' ).remove();
    $( '.overlay' ).remove();
  };

  self.resizeModal = function(){
    changeCss( $( 'div.modal' ) );
  };

  // собираем данные и приводим в порядок
  self.makeData = function( $data ){
    // тянем верстку из целевого блока
    if( $data.target ){
      $data.content = $( $data.target ).html();
    }

    // надо собрать статичтику по задачам и решениям, и найти красивое решение
    if( $data.readyCbk && typeof( $data.readyCbk ) != 'function' ){
      $data.readyCbk = modalHelper[ $data.readyCbk ];
    }

    if( $data.confirmCbk && typeof( $data.confirmCbk ) != 'function' ){
      $data.confirmCbk = modalHelper[ $data.confirmCbk ];
    }

    if( $data.closeCbk && typeof( $data.closeCbk ) != 'function' ){
      $data.closeCbk = modalHelper[ $data.closeCbk ];
    }

    // если требуется показать шаблон формы
    // прикручиваем колбек проверки и отправки
    if( $data.template == 'form' ){
      $data.confirmCbk = modalHelper.confirmForm;
      $data.readyCbk   = modalHelper.readyForm;

      // проходим по поляем и приводим их к единому виду
      $.each( $data.fields, function( index, field ){
        field.type = field.type || 'text';

        if( field.name == 'email' ){
          field.type = 'email';
          field.error = 'не верно введен e-mail';
        }

        field.error = field.error || 'поле не заполнено';
      });
    }

    return $data;
  };
};

//  =================================================================================
//                                    MODAL UI
// ==================================================================================

  var
    modal = new modal();

// показываем модалку по клику
$( document ).on( 'click touchstart', '.js-modal-link, js-modal-open', function( e ){
  e.preventDefault();

  var
    params = getParams( $(this) );

  // тянем title
  params.title = params.title || $(this).attr( 'title' );

  modal.show( params );
});

// закрытие модалки
$( document ).on( 'click touchstart', '.js-modal-close, .overlay', function( e ){
  e.preventDefault();
  var
    params = getParams( $(this) );

  //closeCbk = $(this).data( 'params' ).closeCbk;
  if( params.template ){
    // проверяем, есть ли у нас какие-то действия на закрытие окна?
    if( params && params.closeCbk ){
      // если да, то запускаем callback и после этого закрываем окно
      $.when( params.closeCbk( $( '.modal' ) ) )
        .done( closeModal() );
    }else{
      // либо просто закрываем окно
      modal.close();
    }
  }
});

// кнопка подтверждения
$( document ).on( 'click', '.js-modal-confirm', function( e ){
  e.preventDefault();
  var
    $data  = getParams( $(this) );

  console.log( $data );

  if( $data.confirmCbk ){
    $data.confirmCbk( $data );
  }
});

// ====================================================================================
//                              Helper
// ====================================================================================
var modalHelper = {
  // дефолтный колбек для модалки с формой
  confirmForm: function( $data ){
    var
      $form    = $( 'div.modal form' ),
      errors   = checkForm( $form ),
      content  = '',
      $message = {};

    sendForm({
      form: $( 'div.modal form' ),
      from: $data.from,
      subject: $data.subject,
      callback: modal.close
    });

    /*
    // проверяем на ошибки
    if( errors.length > 0 ){
      return;
    }

    // собираем наше сообщение из формы в вид, которым оперирует платформа
    $.each( $data.fields, function( index, field ){
      var
        $input = $form.find( '[name="'+ field.name +'"]' );

      content +=
        field.title +': '+ $input.val() +'\n';
    });

    // собираем сообщение для платформы с правильными полями
    $message[ 'feedback[content]' ] = content;

    if( $data.from ){
      $message[ 'feedback[from]' ] = $data.from;
    }

    if( $data.subject ){
      $message[ 'feedback[subject]' ] = $data.subject;
    }

    // отправка и красивости
    InSales.sendMessage( $message )
      .done( function( response ){
        console.log( response );
        if( response.status == 'ok' ){

          modal.close();
          showMessage( response.notice );
        }
      });
    */
  },

  // дергаем плагины после отрисовки модалки
  readyForm: function( $data ){
    $( 'div.modal form' )
      .find( '[name="phone"]')
        .mask('+7(999)999-99-99');
  },

  // скилет для сложных колбеков
  modalCallbackSkelet: function( $data ){
    var
      dfd = $.Deferred();

    // далее своя логика, ajax и прочее
    // в том месте, где мы закончили собирать данные ставим
    dfd.resolve( $data );

    return dfd.promise();
  },
};
