var __gulp = require('gulp');
var __seq = require("run-sequence");
var __typescript = require('typescript');
var __gulpTypescript = require('gulp-typescript');
var __merge = require('merge2');
var __del = require('del');

var tsproj = __gulpTypescript.createProject('./tsconfig.json', {
	typescript: __typescript,
	noExternalResolve: true/*,
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
        tsResult.dts.pipe(__gulp.dest('./dist/typings')),
        tsResult.js.pipe(__gulp.dest('./dist'))
    ]);
});

__gulp.task('build', function(cb) {
    return __seq('cleanup', 'build:ts', cb)
});