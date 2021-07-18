
chrome.runtime.onInstalled.addListener(() => {
  console.log('the plugin in installed');
});


// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   let text = '';
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     text =`Storage key "${key}" in namespace "${namespace}" changed. Old value was "${oldValue}", new value is "${newValue}".`;
//   }
//   // jQuery('.report-data').text(text);


//   //
//   var _popup = chrome.extension.getViews( { type: 'popup' } )[0];
//   // _popup.popupJsFunction();
//   let report = _popup.document.getElementById('report-data');
//   report.text = text;
//   // _popup.document.title = 'poop'

//   // jQuery(_popup).find('.report-data').text(text);
//   //

//   chrome.runtime.sendMessage( { data: text } );
// });