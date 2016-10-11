const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gulpNodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync']);

gulp.task('nodemon-server', () => {
  gulpNodemon({
    script: 'src/index.js',
    ext: 'js',
    watch: 'src/index.js',
    ignore: [
      '.git',
      'node_modules',
      'gulpfile.js',
    ],
    env: {
      NODE_ENV: 'development',
    },
    // tasks:['main']
  });
//   .on('restart', () => {
//     console.log('restarted');
//   });
//   .on('start', () => {
//     console.log('browser reloading');
//     browserSync.reload();
//   });
});

gulp.task('browser-sync', ['nodemon-server'], () => {
  browserSync.init({
    port: 3001,
    proxy: {
      target: 'http://chatting.flyingdance.us',
      ws: true,
    },
  });
  // gulp.watch('src/index.js').on('change', browserSync.reload)
  gulp.watch('src/index.html').on('change', browserSync.reload);
  gulp.watch('src/public/*').on('change', browserSync.reload);
});

gulp.task('main', () => {
  gulp.src('src/index.js')
    .pipe(gulp.dest('dist/'));
});

// gulp.task('build', ['main', 'static'])
