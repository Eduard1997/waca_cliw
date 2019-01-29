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
    let other_input = document.getElementById("other");
    other_input.addEventListener('change', addUserInput);
    let revert_chnages = document.getElementById("revert-changes");
    revert_chnages.addEventListener('click', revertChanges);
});

function saveBlindChanges() {
    let bg_color = document.getElementById("bg_color");
    let paragraph = document.getElementById("paragraph");
    let links = document.getElementById("links");
    let font_color = document.getElementById("font_color");
    let other_input = document.getElementById("other");
    let checkedIssues = {};
    let color = document.getElementById("color-picker").value;

    if(bg_color.checked == true) {
        checkedIssues['bg_color'] = true;
    }
    if(paragraph.checked == true) {
        checkedIssues['paragraph'] = true;
    }
    if(links.checked == true) {
        checkedIssues['links'] = true;
    }
    if(font_color.checked == true) {
        checkedIssues['font_color'] = true;
    }
    if(other_input.checked == true) {
        let other_section = document.getElementById("other_section").value;
        if(other_section) {
            checkedIssues["section_new"] = other_section;
        }
    }
    checkedIssues["color"] = color;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"blind_changes": checkedIssues});
    });
}

function addUserInput() {
    let other_input = document.getElementById("other");
    if(other_input.checked == true) {
        document.getElementById("other_section").style.display = 'block';
    } else {
        document.getElementById("other_section").style.display = 'none';
    }
}

function revertChanges() {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"revert_changes": true});
    });
}







