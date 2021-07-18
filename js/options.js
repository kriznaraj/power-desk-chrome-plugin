// Reacts to a button click by marking marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({
    color
  });
}


function init() {

  //initialise form from storage
  chrome.storage.local.get('config', function (config) {
    let reportUrl = config.config.reportUrl;
    jQuery('#pd-report-url').val(reportUrl);
  });

  //bind btn click
  jQuery('.btn-save').click(() => {
    let config = {
      reportUrl: jQuery('#pd-report-url').val()
    }
    chrome.storage.local.set({
      'config': config
    });
    console.log(config)
  });
}

init();