/*jshint strict:false, browser:true, multistr:true */
(function bookmarklet() {
  var elements = document.querySelectorAll('.issue-list-item.selected'),
    tempElement,
    style =
    'body, html{' +
      'height: 100%;' +
      'margin: 0;' +
      'padding: 0;' +
      'font-size: 1.2em;' +
      'font-family: sans-serif;' +
    '}' +
    '.card {' +
      'height: 100%;' +
      'width: 100%;' +
      'page-break-after: always;' +
      'box-sizing:border-box;' +
      'margin: 0;' +
      'position: relative;' +
    '}' +
    '.header{' +
      'border-bottom: 1pt solid;' +
      'padding-bottom: 6pt;' +
    '}' +
    '.footer {' +
      'position: absolute;' +
      'width: 100%;' +
      'bottom: 0;' +
      'border-top: 1pt solid;' +
      'padding-top: 6pt;' +
    '}' +
    '.sub {' +
      'padding-top: 6pt;' +
    '}' +
    '.project,' +
    '.division,' +
    '.complexity,' +
    '.tags,' +
    '.milestone,' +
    '.id {' +
      'display: inline-block;' +
      'width: 49%;' +
    '}' +
    '.division,' +
    '.tags,' +
    '.id {' +
      'width: 49%;' +
      'text-align: right;' +
    '}' +
    '.id {' +
      'font-size: 1.3em;' +
      'position: absolute;' +
    '}' +
    '.title {' +
      'font-size: 1.5em;' +
    '}',
    labelsElement,
    labelsCounter,
    title = document.querySelector('.js-repo-home-link').innerHTML || '',
    counter = 0,
    handle = function(tempElement) {
      var tag = [],
        devision,
        complexity,
        tempTag,
        labelsElements = tempElement.querySelectorAll('.label'),
        temp = {},
        oReq = new XMLHttpRequest(),
        href = tempElement.querySelector('a').href,
        req = function() {
          var html = document.createElement('div'),
            text;
          html.innerHTML = this.responseText;
          text = html.querySelector('.js-milestone-infobar-item-wrapper .css-truncate-target');
          text = text && text.innerHTML;
          temp.milestone = text || '';
          document.body.innerHTML +=
            '<div class="card">' +
            '<div class="header">' +
            '  <div class="project">' + title + '</div>' +
            '  <div class="division">' + temp.division + '</div>' +
            '</div> ' +
            '<div class="sub">' +
            '  <div class="milestone">' + temp.milestone + '</div> ' +
            '  <div class="id">' + temp.id + '</div>' +
            '</div>' +
            '<div class="title">' + temp.title + '</div> ' +
            '<div class="footer"> ' +
            '  <div class="complexity">' + temp.complexity +'</div> ' +
            '  <div class="tags">'+ temp.tags.join(', ') + '</div>' +
            '</div>' +
            '</div>';
        };
      oReq.onload = req;
      oReq.open('get', href, true);
      oReq.send();
      for (labelsCounter = 0; labelsCounter < labelsElements.length; labelsCounter++) {

        labelsElement = labelsElements[labelsCounter];
        if (labelsElement.innerHTML.match(/\#/g)){
          devision = labelsElement.innerHTML.replace('#', '');
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
        id: tempElement.querySelector('.list-group-item-number').innerHTML,
        title: tempElement.querySelector('.list-group-item-name a').innerHTML,
        tags: tag || '',
        division: devision || '',
        complexity: complexity || ''
      };


    };

  if (elements.length === 0) {
    alert('Please select the issues you want to print!');
    return;
  }
  document.body.innerHTML = '';
  document.head.innerHTML = '<style type="text/css" media="screen, print">' + style + '</style>';
  for(counter = 0; counter < elements.length; counter++){
    tempElement = elements[counter];
    handle(tempElement);
  }


}());
