module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            bower: 'bower_components',
            css: 'assets/css',
            js: 'assets/js',
            images: 'assets/images',
            fonts: 'assets/fonts',
            svg: 'assets/svg'
        },

        // SCSS
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            }
        },

        // CSS autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
                }
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ''
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= dirs.js %>/*.js',
                    '!<%= dirs.js %>/modernizr.js',
                    '!<%= dirs.js %>/build.js'
                ],
                dest: '<%= dirs.js %>/build.js',
            },
        },

        // JShint
        jshint: {
            options: {
                multistr: true
            },
            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/*.js',
                '!<%= dirs.js %>/modernizr.js',
                '!<%= dirs.js %>/build.js'
            ]
        },

        // HTMLhint
        htmlhint: {
            html: {
                options: {
                    'tag-pair': true
                },
                src: ['*.html']
            }
        },

        // Uglify
        uglify: {
            all: {
                files: {
                    '<%= dirs.js %>/build.js': ['<%= dirs.js %>/build.js'],
                    '<%= dirs.js %>/modernizr.js': ['<%= dirs.bower %>/modernizr/modernizr.js']
                }
            }
        },

        // Imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.images %>'
                }]
            }
        },

        // CSSmin
        cssmin: {
            combine: {
                files: {
                    '<%= dirs.css %>/style.min.css': [
                        '<%= dirs.css %>/style.css',
                    ]
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= dirs.css %>/*.scss'],
                tasks: ['sass:dev', 'autoprefixer', 'cssmin']
            },
            images: {
                files: ['<%= dirs.images %>/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint']
            },
            scripts: {
                files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:build', 'cssmin', 'autoprefixer', 'concat', 'uglify', 'imagemin']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
