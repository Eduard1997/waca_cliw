var new_section;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.blind_changes) {
          if(typeof request.blind_changes.links !== 'undefined') {
              changeLinkColor(request.blind_changes.color);
          }
          if(typeof request.blind_changes.bg_color !== 'undefined') {
              changeBackgroundColor(request.blind_changes.color);
          }
          if(typeof request.blind_changes.paragraph !== 'undefined') {
              changeParagraphColor(request.blind_changes.color);
          }
          if(typeof request.blind_changes.font_color !== 'undefined') {
                changeFontColor(request.blind_changes.color);
          }
          if(typeof request.blind_changes.section_new !== 'undefined') {
              let sectionNew = document.getElementsByTagName(request.blind_changes.section_new);
              if(sectionNew.length == 0) {
                  new_section = '';
                  alert("The element ---> " + request.blind_changes.section_new + " <-- is not on this page or is not valid");
              } else {
                  new_section = request.blind_changes.section_new;
                  changeSectionNewColor(request.blind_changes.color, request.blind_changes.section_new);
              }
          }
        }
        if(request.revert_changes) {
            revertModifications();
        }
    }
);

function changeLinkColor(color) {
    let link = document.getElementsByTagName("a");
    for(let i = 0; i <  link.length; i++) {
        link[i].style.color = color;
    }
}
function changeBackgroundColor(color) {
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
}
function changeParagraphColor (color) {
    let paragraphs = document.getElementsByTagName("p");
    for(let i = 0; i <  link.length; i++) {
        paragraphs[i].style.color = color;
    }
}
function changeFontColor(color) {
    document.getElementsByTagName("body")[0].style.color = color;
}
function changeSectionNewColor(color, section) {
    let section_new = document.getElementsByTagName(section);
    for(let i = 0; i < section_new.length; i++) {
        section_new[i].style.color = color;
    }
}
function revertModifications(){
    let link = document.getElementsByTagName("a");
    if(typeof link.length != 0) {
        for(let i = 0; i <  link.length; i++) {
            link[i].style.color = 'initial';
        }
    }
    let paragraphs = document.getElementsByTagName("p");
    if(paragraphs.length != 0) {
        for(let i = 0; i <  link.length; i++) {
            paragraphs[i].style.color = 'initial';
        }
    }
    if(new_section) {
        let section_new = document.getElementsByTagName(new_section);
        for(let i = 0; i < section_new.length; i++) {
            section_new[i].style.color = 'initial';
        }
    }
    document.getElementsByTagName("body")[0].style.backgroundColor = 'initial';
    document.getElementsByTagName("body")[0].style.color = 'initial';
}