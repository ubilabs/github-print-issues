var buttons = document.querySelector('.table-list-header-meta'),
  printButton = document.createElement('a'),
  print = function(){
    var elements = document.querySelectorAll('.js-issue-row.selected'),
      tempElement,
      style = '\
    body, html{\
      height: 100%;\
      margin: 0;\
      padding: 0;\
      font-size: 1.2em;\
      font-family: sans-serif;\
    }\
    .card {\
      height: 100%;\
      width: 100%;\
      page-break-after: always;\
      box-sizing:border-box;\
      margin: 0;\
      position: relative;\
    }\
    .header{\
      border-bottom: 1pt solid;\
      padding-bottom: 6pt;\
    }\
    .footer {\
      position: absolute;\
      width: 100%;\
      bottom: 0;\
      border-top: 1pt solid;\
      padding-top: 6pt;\
    }\
    .sub {\
      padding-top: 6pt;\
    }\
    .project,\
    .division,\
    .milestone,\
    .id {\
      display: inline-block;\
      width: 49%;\
    }\
    .complexity{\
      display: inline-block;\
      width: 19%;\
    }\
    .tags{\
      width: 79%;\
      display: inline-block;\
    }\
    .division,\
    .tags,\
    .id {\
      text-align: right;\
    }\
    .id {\
      font-size: 1.3em;\
      position: absolute;\
    }\
    .title {\
      font-size: 1.5em;\
    }\
      ',
      labelsElement,
      labelsCounter,
      title = document.querySelector('.js-current-repository').innerHTML || '',
      counter = 0,
      handle = function(tempElement) {
        var tag = [],
          devision,
          complexity,
          tempTag,
          labelsElements = tempElement.querySelectorAll('.label'),
          milestone = tempElement.querySelector('.milestone-link') ? tempElement.querySelector('.milestone-link').innerText.trim() : '';
          temp = {},
          oReq = new XMLHttpRequest(),
          href = tempElement.querySelector('a').href,
          req = function() {
          };
        oReq.onload = req;
        oReq.open('get', href, true);
        oReq.send();
        for (labelsCounter = 0; labelsCounter < labelsElements.length; labelsCounter++) {

          labelsElement = labelsElements[labelsCounter];
          if (labelsElement.innerHTML.match(/\@/g)){
            devision = labelsElement.innerHTML.replace('@', '');
            devision = devision.replace(devision[0], devision[0].toUpperCase());
          } else if (labelsElement.innerHTML.match(/\./g)){
            complexity = labelsElement.innerHTML.replace('.', '');
          } else {
            tempTag = labelsElement.innerHTML;
            tempTag = tempTag.replace(tempTag[0], tempTag[0].toUpperCase());
            tag.push(tempTag);
          }
        }

        temp = {
          id: tempElement.querySelector('.opened-by').innerHTML.trim().split(' ')[0],
          title: tempElement.querySelector('.issue-title a').innerHTML,
          tags: tag || '',
          division: devision || '',
          complexity: complexity || ''
        };
            document.body.innerHTML += '\
  <div class="card">\
  <div class="header">\
    <div class="project">' + title + '</div>\
    <div class="division">' + temp.division + '</div>\
  </div> \
  <div class="sub">\
    <div class="milestone">' + milestone + '</div> \
    <div class="id">' + temp.id + '</div>\
  </div>\
  <div class="title">'+ temp.title + '</div> \
  <div class="footer"> \
    <div class="complexity">' + temp.complexity +'</div> \
    <div class="tags">'+ temp.tags.join(', ') + '</div>\
  </div>\
  </div>';


      };

    if (elements.length === 0) {
      return;
    }
    document.body.innerHTML = '';
    document.head.innerHTML = '<style type="text/css" media="screen, print">' + style + '</style>';
    for(counter = 0; counter < elements.length; counter++){
      tempElement = elements[counter];
      handle(tempElement);
    }
  }
printButton.innerHTML = 'Print';
window.location.hash = 'print';
//printButton.classList.add('minibutton', 'js-mass-assign-button', 'disabled');
printButton.addEventListener('click', print);
buttons.appendChild(printButton);
