cordova-chromecast
==================

Chromecast in Cordova

This is a fork of https://github.com/c4software/cordova-chromecast-1.git
which contains the required files to enable automatic installation from Cordova CLI.


## Installation
For now, add the plugin from this repository, we'll publish soon with more progress.

```
cordova plugin add https://github.com/dabder/cordova-chromecast-1.git
```

## Example

```javascript

initialize = function () {
    var appId = 'xxxxxxxx';
    var _session;

    var sessionRequest = new chrome.cast.SessionRequest(appId);

    // chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    var receiverListener = function (status) {
        console.log("receiverListener status", status);
    }

    var sessionListener = function (session) {
        _session = session
    }

    var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);


    chrome.cast.initialize(apiConfig, function () {

        console.log('initialize success');
        document.getElementById("message").innerHTML = "initialize success";

    }, function (err) {

        console.log('initialize error', err);
        document.getElementById("message").innerHTML = "initialize error";
    });
}


cast = function () {

    chrome.cast.requestSession(
        function () {
            console.log('requestSession success');
        },
        function (err) {
            console.log('requestSession error', err);
        });
}

```