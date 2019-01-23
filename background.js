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
window.addEventListener('load', function() {
    let blind_button = document.getElementById('spoderblind');
    blind_button.addEventListener('click', function() {
        document.getElementById('front-section').style.display = 'none';
        document.getElementById('blind-section').style.display = 'block';
    });

    let home_button = document.getElementById('home-page-btn');
    home_button.addEventListener('click', function() {
        document.getElementById('front-section').style.display = 'block';
        document.getElementById('blind-section').style.display = 'none';
    });
    let blind_changes = document.getElementById("apply-blind-changes");
    blind_changes.addEventListener('click', saveBlindChanges);
});

function saveBlindChanges() {
    let x = document.getElementById("check1").value;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
    });
}









