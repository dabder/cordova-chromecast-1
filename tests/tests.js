exports.init = function() {
  eval(require('org.apache.cordova.test-framework.test').injectJasmineInterface(this, 'this'));
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

  var cc = require('acidhax.cordova.chromecast.Chromecast');

  var defaultReceiverAppId = 'CC1AD845';
  var videoUrl = 'https://googledrive.com/host/0B5O0KxB-nibPcUxXdU5WaGFrckU/big_buck_bunny.mp4';

  describe('Chromecast', function () {
    var fail = function(done, why) {
      if (typeof why !== 'undefined') {
        console.error(why);
      }
      expect(true).toBe(false);
      done();
    };

    it("should contain definitions", function() {
      expect(typeof chromecast.getDevices).toBeDefined();
      expect(typeof chromecast.launch).toBeDefined();
      expect(typeof chromecast.play).toBeDefined();
      expect(typeof chromecast.pause).toBeDefined();
      expect(typeof chromecast.stop).toBeDefined();
      expect(typeof chromecast.seek).toBeDefined();
      expect(typeof chromecast.volume).toBeDefined();
      expect(typeof chromecast.loadUrl).toBeDefined();
      expect(typeof chromecast.echo).toBeDefined();
    });

    it('discovering and launching', function(done) {
      var onDevice = function(deviceId, deviceName) {
        if (deviceName.indexOf('Ugly') > -1) {
          chromecast.removeListener('device', onDevice);

          expect(deviceId).toBeDefined();
          expect(deviceName).toBeDefined();

          chromecast.launch(deviceId, defaultReceiverAppId, function(err) {
            expect(err).toEqual(null);
            setTimeout(done, 2000);
          });
        }
      };

      chromecast.on('device', onDevice);
      chromecast.getDevices(defaultReceiverAppId);
    });

    it('loading a url', function(done) {
      chromecast.loadUrl(videoUrl, function(err) {
        expect(err).toEqual(null);
        setTimeout(done, 2000);
      })
    });

    it('pausing', function(done) {
      chrome.pause(function(err) {
        expect(err).toEqual(null);
        setTimeout(done, 1000);
      })
    });

    it('playing', function(done) {
      chrome.pause(function(err) {
        expect(err).toEqual(null);
        setTimeout(done, 1000);
      })
    });

  });
};

