var gulp = require('gulp');
var merge = require('merge2');
var replace = require('gulp-replace');
var ts = require("gulp-typescript");
var argv = require('minimist')(process.argv.slice(2));
var name = argv['name'];
console.log('Building '+name);
 
var tsProject = ts.createProject({
    target: 'ES5',
    declarationFiles: true,
    noExternalResolve: true,
    out: 'GameEngine.js'
});

var worldProject = ts.createProject({
    target: 'ES5',
    declarationFiles: true,
    noExternalResolve: true,
    out: 'GameWorld.js'
});
 
gulp.task('GameEngine', function() {
    var tsResult = gulp.src(['GameEngine/*.ts', 'GameEngine/*/*.ts'])
                    .pipe(ts(tsProject));
 
    // Merge the two output streams, so this task is finished when the IO of both operations are done.  
    return merge([
        tsResult.dts.pipe(gulp.dest('release')),
        tsResult.js.pipe(gulp.dest('release'))
    ]);
});
 
gulp.task('GameWorld', ['GameEngine'], function() {
    gulp.src(['release/GameEngine.d.ts', name+'/*.ts', name+'/*/*.ts'])
      .pipe(ts(worldProject))
      .js.pipe(gulp.dest('release/'+name));
});

gulp.task('clean', require('del').bind(null, ['release']));
 
gulp.task('build', ['GameEngine', 'GameWorld'], function() {
    gulp.src(['release/GameEngine.js', name+'/*.css', name+'/*/*.*'])
      .pipe(gulp.dest('release/'+name));

    gulp.src(['LAB.min.js'])
      .pipe(gulp.dest('release'));

    gulp.src(name+'/index.html')
      .pipe(replace(/^\s+\.script.*wait\(\)\s*\n/mg, ""))
      .pipe(replace(/\$LAB/, "$LAB.script(\"GameEngine.js\").wait()"))
      .pipe(gulp.dest('release/'+name));
});

gulp.task('watch', ['build'], function() {
    gulp.watch('GameEngine/*.ts', ['GameEngine']);
    gulp.watch(name+'/*.ts', ['GameWorld']);
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
