// Daily Phrontistery — Chrome Extension New Tab Controller
(function() {
  var targetUrl = "https://ais-dev-423w7farylpvw2bxrafxvk-573683063127.us-east1.run.app/";
  
  // Instant replacement navigation
  try {
    window.location.replace(targetUrl);
  } catch (err) {
    window.location.href = targetUrl;
  }
})();
