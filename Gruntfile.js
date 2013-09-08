
module.exports = function(grunt) {
  var utils;
  utils = (require('./gruntcomponents/misc/commonutils'))(grunt);
  
  grunt.task.loadTasks('gruntcomponents/tasks'); 
  grunt.task.loadNpmTasks('grunt-contrib-watch');
  grunt.task.loadNpmTasks('grunt-contrib-less');
  grunt.task.loadNpmTasks('grunt-contrib-uglify');
  //grunt.task.loadTasks('grunt-contrib-coffee');
  
  grunt.initConfig({
    distdir: 'coffee',
    destino: 'js',
    pkg: grunt.file.readJSON('package.json'),

    growl: {
      ok: {
        title: 'COMPLETE!!',
        msg: '＼(^o^)／'
      }
    },

    coffee: {
      compile: {
        dir: '<%=distdir%>',
        dest: 'js'
      }
    },

    uglify: {
        my_target: {
          files: {
            '<%=destino%>/package.min.js': ['<%=destino%>/controllers/base/controller.js']
          }
        }
    },

    less: {
      theme: {
        // options : { yuicompress: true },
        src: 'css/less/style.less',
        dest: 'css/styleall.css'
      }, 
      styleIpad: {
        // options : { yuicompress: true },
        src:  'css/less/style-768.less', 
        dest: 'css/style-768.css'
      },  
      style980: {
        // options : { yuicompress: true },
        src:  'css/less/style-980.less', 
        dest: 'css/style-980.css'
      }
      //Retirei o bloco abaixo, porque ja estamos compilando no importe de style.less dentro do projeto::Marcio Sartini
      //, 
      //bootstrap: {
        // options : { yuicompress: true },
      //  src:  '<%=distdir%>/library/less/bootstrap.less', 
      //  dest: '<%=distdir%>/library/css/bootstrap.css'
      // }
       
    },
    watch: {
      coffee: {
        files: '<%=distdir%>/**/*.coffee',
        tasks: ['coffee', 'growl:ok']
      },  
      less: {
        files: ['<%=distdir%>/css/less/**/*.less', '<%=distdir%>/library/less/**/*.less' ],
        tasks: 'less'
      }, 
      uglify: {
        files: ['<%=destino%>/**/*.js'], 
        tasks: 'uglify'
      } 
    }
  });
  grunt.event.on('coffee.error', function(msg) {
    return utils.growl('ERROR!!', msg);
  });
  return grunt.registerTask('default', ['coffee', 'less', 'uglify', 'growl:ok']);
};
