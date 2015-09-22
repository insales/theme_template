var
  // modules
  gulp     = require( 'gulp' ),
  concat   = require( 'gulp-concat' ),
  less     = require( 'gulp-less' ),
  sequence = require( 'gulp-run-sequence' ),

  path     = require( 'path' ),
  colors   = require( 'colors' ),
  gutil    = require( 'gulp-util' ),
  sass     = require('gulp-sass'),

  // папки
  test_dir = 'test/',
  dist_dir = 'min_template/',

  // списки блоков
  List = {
    'settings.html': [],
    'settings_form.json': [],
  },

  blocks   = {},
  blocks_set = [],
  file;

require( 'json-comments' );
file = require( './blocks' );
blocks_set = file.blocks;

//=============================================
// собираем чистый тестовый шаблон
gulp.task( 'build:test', function(){
  makeList( 'core' );
  makeList( 'test' );

  for( task in List ){
    job( task, test_dir );
  }
});

// собираем чистый релизный шаблон
gulp.task( 'build:min_dist', function(){
  makeList( 'core' );
  makeList( 'dist' );

  for( task in List ){
    job( task, 'min_template/' );
  }
});

gulp.task( 'build:max_dist', function(){
  makeList( 'core' );
  makeList( 'test' );

  for( task in List ){
    job( task, 'max_template/' );
  }
})

// таск для наблюдения за базовыми задачами
gulp.task( 'watch:test', function(){
  makeList( 'core' );
  makeList( 'test' );

  sequence( [ 'watch:less', 'watch:js' ] );
});

// таск для правки базовых стилей
gulp.task( 'watch:less', function(){
  gulp.watch( 'blocks/**/*.less', function( event ){
    console.log(
      'File ' + event.path + ' was ' + event.type + ', running tasks...'
    );

    job( 'core.css', test_dir );
  });
});

// таск для правки базовых скриптов
gulp.task( 'watch:js',  function(){
  gulp.watch( 'blocks/**/*.js', function( event ){
    console.log(
      'File ' + event.path + ' was ' + event.type + ', running tasks...'
    );

    var
      path   = event.path.split( '/' ),
      length = path.length,
      block  = blocks[ path[ length - 2 ] ],
      file   = path[ length - 1 ],
      task   = '';

    for( i = 0; i < length; i++ ){
      if( path[ i ] == 'blocks' ){
        block = blocks[ path[ i +1 ] ];
      }
    }

    for( task_name in block.core ){
      var
        i = 0,
        list   = block.core[ task_name ],
        length = task_name.length;

      for( i; i < length; i++ ){
        if( list[ i ] ){
          var
            file_path = list[ i ];

          //console.log( file_path );
          file_path = file_path.split( '/' );

          if( file_path[ file_path.length - 1 ] == file ){
            task = task_name;
          }
        }
      }
    }

    if( task !== '' ){
      job( task, test_dir );
    }
  });
});

// ничего личного, только тест
gulp.task( 'test', function(){
  var
    style = List[ 'style.css.scss' ];

  makeList( 'core' );
  makeList( 'test ');

  style[ 0 ] = 'blocks/core/scss/_variables.scss.liquid';

  console.log( style );

  gulp.src( style )
    .pipe( concat( 'check/style.css.scss' ) )
    .pipe( gulp.dest( 'check/style_1.css' ) )
    .pipe( sass() )
    .on( 'error', log );
});

//=============================================

job = function( task, path ){
  var
    
    source    = gulp.src( List[ task ] );

  // если мы склеиваем шаблоны ect, то делаем отдельный таск
  if( task.indexOf( 'template_' ) !== -1 ){
    source
      .pipe( concat( task ) )
      .pipe( gulp.dest( path + 'snippets/' ) );
    return;
  }

  // тип задачи
  switch ( task ){
    // шаблоны страниц
    case 'templates':
    // сниппеты
    case 'snippets':
    // остальной хлам
    case 'media':
      source
        .pipe( gulp.dest( path + task +'/' ) )
        .on( 'error', log );
      break;

    // склеить и собрать less в core.css
    case 'core.css':
      source
        .pipe( concat( task ) )
        .on( 'error', log )
        .pipe( less({
          paths: [ 'blocks/core/less/mixins' ]
        }) )
        .on( 'error', log )
        .pipe( gulp.dest( path +'media/' ) );
      break;

    // сборка настроек темы
    case 'settings.html':
    case 'settings_form.json':
      source
        .pipe( concat( task ) )
        .on( 'error', log )
        .pipe( gulp.dest( path +'config/' ) )
        .on( 'error', log );
      break;

    // сборка файлов подключения стилей и 
    case 'style.css.scss':
    case 'template.css':
    case 'template.js':
      var
        list = combineFile( List[ task ], task );

      source
        .pipe( gulp.dest( path +'media/') );

      strToSrc( task, list.join( '\n' ) )
        .pipe( gulp.dest( path +'media/' ) );

      break;

    // дефолт - склеить и положить в media
    default:
      source
        .pipe( concat( task ) )
        .on( 'error', log )
        .pipe( gulp.dest( path +'media/' ) );
      break;
  }
};

makeList = function( mode ){
  var
    length = blocks_set.length,
    i = 0;

  for( i; i < length; i++ ){
    var
      block        = blocks_set[ i ],
      path         = 'blocks/'+ block +'/',
      block_config = require( './'+ path +'config.json' ),
      type         = block_config[ mode ];

    // записываем информацию о блоке, для других утилит
    blocks[ block ] = block_config;

    if( type ){
      // разбираем поля блока для тасков
      for( key in type ){
        // если нет такого списка - создаем
        if( !List[ key ] ){
          List[ key ] = [];
        }

        // заливаем список
        type[ key ].forEach( function( file ){
          List[ key ].push( path + file );
        })
      }

      if( mode != 'core' ){
        List[ 'settings.html' ].push( path +'settings.html' );
        List[ 'settings_form.json' ].push( path +'settings_form.json' );
        List[ '_variables.scss.liquid' ].push( path +'_var.scss');
      }
    }
  }
};

// оформление ошибок
function log(error) {
  console.log([
    '',
    '----------ERROR MESSAGE START----------'.bold.red.underline,
    ('[' + error.name + ' in ' + error.plugin + ']').red.bold.inverse,
    error.message,
    '-----------ERROR MESSAGE END-----------'.bold.red.underline,
    ''
  ].join('\n'));
  this.end();
}

// динамическое создание данных в поток
function strToSrc( filename, string ){
  var
    src = require( 'stream' ).Readable( { objectMode: true } );

  src._read = function () {
    this.push( new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents: new Buffer( string )
    }));
    this.push(null);
  };

  return src;
}

// подготовка источника для генерации конечных файлов
// из списка названий файлов
function combineFile( list, task ){
  var
    intro = '',
    outro = '';

  switch ( task ){
    case 'style.css.scss':
      intro = '@import "';
      outro = '";';
      break;
    case 'template.css':
      intro = '//= require ';
      break;
    case 'template.js':
      intro = '#= require ';
      break;
  }

  list.forEach( function( value, index, files ){
    var
      file_path = value.split( '/' ),
      file      = file_path[ file_path.length - 1 ];

    if( task == 'template.js' ){
      file = file.replace( /.js$/, '' );
    }

    if( task == 'style.css.scss' ){
      file = file.replace( /^_/, '' ).replace( /.scss$/, '' );
    }

    if( task == 'template.css' ){
      file = file.replace( /.css/, '' );
    }

    files[ index ] = intro + file + outro;
  });

  if( task == 'style.css.scss' ){
    list.unshift( '@import "compass";');
  }

  if( task == 'template.css' ){
    list.push( '//= require style');
  }

  return list;
}