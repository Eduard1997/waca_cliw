// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  /*chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });*/
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {schemes: ['https', 'http']},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

});
/*let winID;
chrome.contextMenus.onClicked.addListener(function proccess_interested(info, tab){

    chrome.tabs.create({active: false}, function(newTab) {

        // After the tab has been created, open a window to inject the tab into it.
        chrome.windows.create(
            {
                tabId:      newTab.id,
                type:       "popup",
                url:        chrome.extension.getURL('color_blind.html'),
                focused: true
            },function(window){
                winID = newWindow.id;
            });
    });
});*/
document.addEventListener('DOMContentLoaded', function() {
  let link = document.getElementById('spoderblind');
  link.addEventListener('click', function() {
      chrome.tabs.query(
          {currentWindow: true, active : true},
          function(tabArray){
              chrome.windows.remove(tabArray[0].id);
          }
      );

      let winID;
      chrome.tabs.create({active: false}, function(newTab) {

          // After the tab has been created, open a window to inject the tab into it.
          chrome.windows.create(
              {
                  tabId:      newTab.id,
                  type:       "popup",
                  url:        chrome.extension.getURL('color_blind.html'),
                  focused: true
              },function(window){
                  winID = newWindow.id;
              });
      });
  });
});




