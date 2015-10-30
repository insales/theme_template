$( function(){
  // улучшайзинг стандартной обратной связи
  var
    $form = $( '#feedback_form');

  if( $form.is( 'form' ) ){
    // находим все элементы для стилизации
    var
      table     = $form.find( 'table' ),
      notice    = $form.find( 'small' ),
      button    = $form.find( '#feedback_commit' ),
      textarea  = $form.find( 'textarea' ),
      email     = $form.find( 'input[name="feedback[from]"]' );

    // сносис инлайновые стили
    $form
      .removeAttr( 'style' );

    table
      .find( 'td' )
        .removeAttr( 'style' );

    // стилизуем поле сообщения и его подсказку
    textarea
      .removeAttr( 'style' )
      .attr( 'title', 'Сообщение' )
      .addClass('input-field')
      .parents( 'p:first' )
        .addClass( 'input input--required' )
        .append('<div class="input-notice notice notice--danger">Заполните поле</div>')
          .find( 'label' )
            .addClass( 'input-label' );

    // стилизуем поле ввода email
    email
      .removeAttr( 'size' )
      .attr({ type: 'email', title: "E-mail" })
      .addClass('input-field')
      .parents( 'p:first' )
        .addClass( 'input input--required' )
        .append('<div class="input-notice notice notice--danger">E-mail неправильно заполнен</div>')
          .find( 'label' )
            .addClass( 'input-label' );

    // чистим таблицу
    table
      .removeAttr( 'style' )
      .find( 'br' )
        .remove();

    // форматируем начальные подсказки
    notice
      .parent()
        .html( notice.html() )
        .addClass( 'notice notice--info' );

    // стилизуем кнопку ( отправить )
    // вешаем обработку
    button
      .addClass('button button--action mc-grid-12')
      .on( 'click', function( e ){
        e.preventDefault();

        sendForm({
          form: $form,
          from: email.val(),
          callback: function(){
            $form
              .find( '.input-field' )
                .val( '' );
          }
        });
      });
  }
});
