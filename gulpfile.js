var
  // modules
  gulp     = require( 'gulp' ),
  concat   = require( 'gulp-concat' ),
  less     = require( 'gulp-less' ),
  sequence = require( 'gulp-run-sequence' ),
  es       = require( 'event-stream' ),
  clean    = require( 'gulp-clean' ),
  zip      = require( 'gulp-zip' ),

  path     = require( 'path' ),
  colors   = require( 'colors' ),
  gutil    = require( 'gulp-util' ),
  sass     = require('gulp-sass'),

  // папки
  test_dir = 'test/',
  dist_dir = 'min_template/',
  temp_full_config = 'max_template/',
  temp_min_config  = 'min_template/',

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
gulp.task( 'build:test', [ 'clean:test' ], function(cb){
  makeList( 'core' );
  makeList( 'test' );

  for( task in List ){
    job( task, test_dir );
  }

  setTimeout( function(){
    cb();
  }, 3000 );
});

// собираем чистый релизный шаблон
gulp.task( 'build:min_config', function(cb){
  makeList( 'core' );
  makeList( 'dist' );

  for( task in List ){
    job( task, temp_min_config );
  }

  setTimeout( function(){
    cb();
  }, 3000 );
});

gulp.task( 'build:full_config', function(){
  makeList( 'core' );
  makeList( 'test' );

  for( task in List ){
    job( task, temp_full_config );
  }

  setTimeout( function(){
    cb();
  }, 3000 );
});

gulp.task( 'clean:test', function(){
  return gulp.src( 'test', { read: false })
          .pipe( clean() );
});

gulp.task( 'clean:full_config', function(){
  return gulp.src( 'test', { read: false })
          .pipe( clean() );
});

gulp.task( 'clean:min_config', function(){
  return gulp.src( 'test', { read: false })
          .pipe( clean() );
});

gulp.task( 'zip:test', [ 'build:test' ], function(){
  return gulp.src([
    'test/**',
    //'test/media/*',
    //'test/snippets/*',
    //'test/templates/*'
  ], { base: './test' })
    .pipe( zip( 'test.zip' ) )
    .pipe( gulp.dest( 'test/' ) );
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
      source
        .pipe( concat( task ) )
        .on( 'error', log )
        .pipe( gulp.dest( path +'config/' ) )
        .on( 'error', log );
      break;

    case 'settings_form.json':
      source = es.merge(
        strToSrc( 'intro', '{' ),
        source,
        strToSrc( 'outro', '}' )
      );

      source
        .pipe( concat( task ) )
        .on( 'error', log )
        .pipe( gulp.dest( path +'config/' ) )
        .on( 'error', log );
      break;

    // сборка файлов подключения стилей и скриптов
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

// makeFile
makeFile = function( filename, string ){
  var File = new gutil.File({
    cwd: '',
    base: '',
    path: filename,
    contents: new Buffer( string )
  });

  return File;
};

// динамическое создание данных в поток
function strToSrc( filename, string ){
  var
    src = require( 'stream' ).Readable( { objectMode: true } );

  src._read = function () {
    this.push( makeFile( filename, string ) );
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
