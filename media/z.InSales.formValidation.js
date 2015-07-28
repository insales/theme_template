// =====================================================================================
//                                FORM VALIDATION
// =====================================================================================


// TODO: подумать, что сюда надо добавить и как это должно работать

// проверка формы, получает jQuery-объект формы
checkForm = function( $form ){
  var
    $inputs = $form.find('input, textarea'),
    errors  = [],

    email_reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i;

  $inputs.each( function() {
    var
      is_required = false;

    if( $(this).parent().hasClass('input--required') || $(this).attr('required') ){
      is_required = true;
    };

    if( $(this).val() == '' && is_required ){
      errors.push({
        title: $(this).attr('title'),
        jqObj: $(this),
      });
    }else{
      if( ( $(this).attr('type') == ('email') ) && !email_reg.test( $(this).val() ) ){
        errors.push({
          title: $(this).attr('title'),
          jqObj: $(this),
        });
      };
    }
  });

  markFormErrors( errors );

  return errors;
};

markFormErrors = function( $errors ){
  $.each( $errors, function( index, error ){
    console.log( error.title );
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