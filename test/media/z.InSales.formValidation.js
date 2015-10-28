// =====================================================================================
//                                FORM VALIDATION
// =====================================================================================


// TODO: подумать, что сюда надо добавить и как это должно работать

// проверка формы, получает jQuery-объект формы
checkForm = function( $form ){
  var
    $inputs = $form.find( '.input-field' ),
    errors  = [],

    email_reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;

  $inputs.each( function() {
    var
      $input      = $(this).parents( '.input:first' ),
      is_required = false,
      is_captcha  = false,
      is_email    = false;

    // поле обязательно?
    if( $input.hasClass( 'input--required' ) || $(this).attr('required') ){
      is_required = true;
    }

    // является капчей?
    if( $input.hasClass( 'input--captcha' ) ){
      is_captcha = true;
    }

    if( $(this).attr('type') == 'email' ){
      is_email = true;
    }

    // если поле обязательно
    if( is_required ){
      // и поле незаполнено
      if( $(this).val() === '' ){
        errors.push({
          title: $(this).attr('title'),
          jqObj: $(this),
        });
      }
      // или поле является почтой и там введена фигня
      else if( is_email && !email_reg.test( $(this).val() ) ){
        errors.push({
          title: $(this).attr('title'),
          jqObj: $(this),
        });
      }
      // или капча и вбито не число
      else if( is_captcha && !$.isNumeric( $(this).val() ) ){
        errors.push({
          title: $(this).attr('title'),
          jqObj: $(this),
        });
      }
    }
  });

  markFormErrors( errors );

  return errors;
};

markFormErrors = function( $errors ){
  $.each( $errors, function( index, error ){
    //console.log( error.title );
    error.jqObj
      .parent()
        .addClass('input--error');
  });
};

$(function(){
  $( document ).on( 'click', '.input-field', function(){
    var
      $input = $(this).parent();

    if( $input.hasClass( 'input--error' ) ){
      $input.removeClass( 'input--error' );
    }
  });
});

// принимает jQuery-объект формы
sendForm = function( options ){
  //$form, from, subject
  var
    $form    = options.form,
    from     = options.from,
    subject  = options.subject,
    errors   = checkForm( $form ),
    content  = '',
    $message = {},
    $inputs  = $form.find( '.input-field' );

  // проверяем на ошибки
  if( errors.length > 0 ){
    return;
  }

  // собираем наше сообщение из формы в вид, которым оперирует платформа
  $inputs.each( function( index, field ){
    content +=
      $(this).attr( 'title' ) +': '+ $(this).val() +'\n';
  });

  // собираем сообщение для платформы с правильными полями
  $message[ 'feedback[content]' ] = content;

  if( from ){
    $message[ 'feedback[from]' ] = from;
  }

  if( subject ){
    $message[ 'feedback[subject]' ] = subject;
  }

  showPreloader();

  // возвращаем Deferred объект
  InSales.sendMessage( $message )
    .done( function( response ){
      hidePreloader();

      if( response.status == 'ok' ){

        if( options.callback ){
          options.callback();
        }

        showMessage( response.notice );
      }
    })
    .fail( function(){
      hidePreloader();
    });
};
