/**
 * Created by lynmatten on 30.01.15.
 */


module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        exec: {
            echo_grunt_version: {
                cmd: function () {
                    return 'echo ' + this.version;
                }
            },
            npm_pack: {
                cmd: 'npm pack'
            },
            delete_all_packs: {
                cmd: 'rm -rf xbee-serialsim*.tgz'
            },
            rename_actual_pack_to_latest: {
                cmd: 'cp ' + pkg.name + '-' + pkg.version + '.tgz ' + pkg.name + '.tgz'
            },
            copy_to_local_modules_folder: {
                cmd: 'cp ' + pkg.name + '-' + pkg.version + '.tgz ' + '../local_modules/'

            }
        }


    });

    grunt.registerTask('default', 'print-default-message', function() {

        grunt.log.writeln("No default task defined.");

    });

    grunt.registerTask('pack', ['exec:npm_pack','exec:rename_actual_pack_to_latest', 'exec:copy_to_local_modules_folder']);

    grunt.registerTask('version', 'displays name and version', function() {

        grunt.log.writeln('Name: ' + pkg.name + " -- Version: " + pkg.version);

    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');

};