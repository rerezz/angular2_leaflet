var __gulp = require('gulp');
var __seq = require("run-sequence");
var __typescript = require('typescript');
var __gulpTypescript = require('gulp-typescript');
var __merge = require('merge2');
var __concat = require('gulp-concat');
var __del = require('del');

var tsproj = __gulpTypescript.createProject('./tsconfig.json', {
	typescript: __typescript,
	noExternalResolve: false/*,
	outFile: "angular2_leaflet.js"*/
});

__gulp.task('cleanup', function () {
  return __del([    
    'dist/**/*'
  ]);
});

__gulp.task('build:ts', function() {
    var tsResult = __gulp.src('./src/*.ts')
                    .pipe(__gulpTypescript(tsproj));
 
    return __merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(__gulp.dest('./tmp')),
        tsResult.js.pipe(__gulp.dest('./tmp'))
    ]);
});

__gulp.task('bundle:js', function () {
  return __gulp.src([
      './tmp/leaflet.js'
    ])
    .pipe(__concat('angular2_leaflet.js'))
    .pipe(__gulp.dest('./dist/'));
});

__gulp.task('bundle:typings', function () {
  return __gulp.src([
      './tmp/leaflet.d.ts'
    ])
    .pipe(__concat('angular2_leaflet.d.ts'))
    .pipe(__gulp.dest('./dist/typings/'));
});

__gulp.task('build:cleanup', function () {
  return __del([    
    './tmp'
  ]);
});

__gulp.task('build', function(cb) {
    return __seq('cleanup', 'build:ts', ['bundle:js', 'bundle:typings'], 'build:cleanup', cb)
});