// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/pamn'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    proxies: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/base-adresse/base-adresse-nationale/streets': {
        target: 'https://passerelle.formulaireextranet.grandlyon.com',
        changeOrigin: true,
      },
      '/geocoding/photon/api': {
        target: 'https://download.data.grandlyon.com',
        changeOrigin: true,
      },
      '/reverse': {
        target: 'https://api-adresse.data.gouv.fr',
        changeOrigin: true,
      },
    },

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
