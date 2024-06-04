var videoElement;
var adsLoaded = false;
var adContainer;
var adDisplayContainer;
var adsLoader;
var adsManager;

window.addEventListener('load', function (event) {
  videoElement = document.getElementById('video-element');
  initializeIMA();
  videoElement.addEventListener('play', function (event) {
    loadAds(event);
  });
});

function initializeIMA() {
  adContainer = document.getElementById('ad-container');
  adContainer.addEventListener('click', adContainerClick);
  adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  );
  adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError, false);

  videoElement.addEventListener('ended', function () {
    adsLoader.contentComplete();
  });

  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl = 'YOUR_AD_TAG_URL_GOES_HERE'; // Replace with your ad tag URL

  adsRequest.linearAdSlotWidth = videoElement.clientWidth;
  adsRequest.linearAdSlotHeight = videoElement.clientHeight;
  adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
  adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

  adsLoader.requestAds(adsRequest);
}

function loadAds(event) {
  if (adsLoaded) {
    return;
  }
  adsLoaded = true;
  event.preventDefault();

  videoElement.load();
  adDisplayContainer.initialize();

  var width = videoElement.clientWidth;
  var height = videoElement.clientHeight;
  try {
    adsManager.init(width, height, google.ima.ViewMode.NORMAL);
    adsManager.start();
  } catch (adError) {
    console.log("AdsManager could not be started");
    videoElement.play();
  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  adsManager = adsManagerLoadedEvent.getAdsManager(videoElement);
  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
  adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, onContentPauseRequested);
  adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, onContentResumeRequested);
  adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdLoaded);

  var isFloating = false;
  var videoContainer = document.getElementById('video-container');

  function updateVideoPosition() {
    var rect = videoContainer.getBoundingClientRect();
    var videoTop = rect.top;
    var videoBottom = rect.bottom;

    if (videoTop <= 0 || videoBottom >= window.innerHeight) {
      if (!isFloating) {
        adContainer.style.display = 'none';
        videoElement.style.width = '150px'; // Reduced width
        videoElement.style.position = 'fixed'; // Use position: fixed
        videoElement.style.bottom = '20px'; // Reduced bottom position
        videoElement.style.right = '20px';
        videoElement.style.zIndex = '100';
        isFloating = true;
      }
    } else {
      if (isFloating) {
        adContainer.style.display = 'block';
        videoElement.style.width = '100%';
        videoElement.style.position = 'absolute'; // Use position: absolute
        videoElement.style.bottom = '0';
        videoElement.style.right = '0';
        videoElement.style.zIndex = 'auto';
        isFloating = false;
      }
    }
  }

  window.addEventListener('scroll', function () {
    updateVideoPosition();
  });

  // Initial check on page load
  updateVideoPosition();
}

function onAdError(adErrorEvent) {
  console.log(adErrorEvent.getError());
  if (adsManager) {
    adsManager.destroy();
  }
}

function onContentPauseRequested() {
  videoElement.pause();
}

function onContentResumeRequested() {
  videoElement.play();
}

function adContainerClick(event) {
  console.log("ad container clicked");
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
}

function onAdLoaded(adEvent) {
  var ad = adEvent.getAd();
  if (!ad.isLinear()) {
    videoElement.play();
  }
}