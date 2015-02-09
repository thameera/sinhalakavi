var fs = require('fs');


/*
 * Returns the list of files in the data dir
 * We assume that only a bunch of .txt files are present
 */
var getFileNames = function() {
  return fs.readdirSync('data');
}


/*
 * Returns the contents of the file with given filename
 */
var readFile = function(filename) {
  var content = '';

  if (fs.existsSync(filename)) {
    content = fs.readFileSync(filename, 'utf8').toString();
  } else {
    console.log('ERROR: The following data file does not exist: ' + filename);
  }

  return content;
};


/*
 * Returns whether str (the string) starts with arg
 */
var startsWith = function(str, arg) {
  return str.lastIndexOf(arg, 0) === 0;
};


/*
 * In:  'ab cd ef gh'
 * Out: 'cd ef gh'
 */
var dropFirstWord = function(str) {
  return str.substring(str.indexOf(' ') + 1);
}


/*
 * Parses and returns the poem in the given file
 */
var getPoem = function(filename) {
  var poem = {
    title: '', title_en: '',
    url: '',
    author: '',
    verses: []
  };
  var verse;
  var verseStarted = false;

  var content = readFile('data/' + filename).split('\n');

  content.forEach(function(line) {

    if (startsWith(line, ':title_en')) {
      poem.title_en = dropFirstWord(line);
    } else if (startsWith(line, ':title')) {
      poem.title = dropFirstWord(line);
    } else if (startsWith(line, ':url')) {
      poem.url = dropFirstWord(line);
    } else if (startsWith(line, ':author')) {
      poem.author = dropFirstWord(line);
    } else if (startsWith(line, '#')) { // New verse
      if (verse) {
        poem.verses.push(verse);
      }

      verse = {};
      verse.id = Number(line.substr(1));
      verse.text = [];
    } else if (startsWith(line, ':verse')) {
      verseStarted = true;
    } else if (startsWith(line, ':/verse')) {
      verseStarted = false;
    } else if (verseStarted) {
      verse.text.push(line);
    } else if (startsWith(line, ':youtube')) {
      verse.youtube = line.split(' ')[1];
    } else {
      // ignore
    }

  });

  if (verse) {
    poem.verses.push(verse);
  }

  return poem;
};


var poems = [];
getFileNames().forEach(function(filename) {
  poems.push(getPoem(filename));
});

module.exports = poems;

