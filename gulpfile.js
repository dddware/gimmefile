var gulp = require('gulp'),
    tasks = require('gulp-load-tasks')(),
    server = require('tiny-lr')();



gulp.task('stylesheets', function () {
    gulp.src('app/assets/stylesheets/style.styl')
        .pipe(tasks.stylus())
        .pipe(tasks.autoprefixer())
        .pipe(tasks['if'](gulp.env.production, tasks.csso()))
        .pipe(gulp.dest('public/assets/stylesheets/'))
        .pipe(tasks.livereload(server));
});



gulp.task('scripts', function () {
    gulp.src('app/assets/scripts/app/main.js')
        /*.pipe(tasks.jshint())
        .pipe(tasks.jshint.reporter('default'))*/
        .pipe(tasks.browserify())
        .pipe(tasks['if'](gulp.env.production, tasks.uglify()))
        .pipe(gulp.dest('public/assets/scripts/'))
        .pipe(tasks.livereload(server));
});



gulp.task('images', function () {
    gulp.src(['app/assets/images/**/*'])
        .pipe(tasks['if'](gulp.env.production, tasks.imagemin({ interlaced: true, progressive: true })))
        .pipe(gulp.dest('public/assets/images/'))
        .pipe(tasks.livereload(server));
});



gulp.task('workflow', function () {
    gulp.src('gulpfile.js')
        .pipe(tasks.open('', { url: 'http://localhost:3000' }));

    server.listen(35729, function (err) {
        gulp.watch('app/assets/stylesheets/**/*.styl', function () {
            gulp.run('stylesheets');
        });

        gulp.watch('app/assets/scripts/**/*.js', function () {
            gulp.run('scripts');
        });

        gulp.watch('app/assets/images/**/*', function () {
            gulp.run('images');
        });

        gulp.watch('app/views/**/*.jade', function () {
            gulp.src('').pipe(tasks.livereload(server));
        });
    });
});



gulp.task('default', function() {
    gulp.run('stylesheets', 'scripts', 'images');
    gulp.env.production || gulp.run('workflow');
});