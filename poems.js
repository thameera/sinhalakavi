var fs = require('fs');

var meta = [];

meta[0] = {
  title: 'බුදුගුණ අලංකාරය',
  title_en: 'Buduguna Alankaraya',
  author: 'වීදාගම මෛත්‍රීය හිමි',
  file: 'buduguna_alankaraya.txt'
};

meta[1] = {
  title: 'යසෝදරාවත',
  title_en: 'Yasodarawatha',
  author: 'කර්තෘ අඥාතයි',
  file: 'yasodarawatha.txt'
};

var readFile = function(filename) {
  var content = '';

  if (fs.existsSync(filename)) {
    content = fs.readFileSync(filename, 'utf8').toString();
  } else {
    console.log('ERROR: The following data file does not exist: ' + filename);
  }

  return content;
};

var startsWith = function(str, arg) {
  return str.lastIndexOf(arg, 0) === 0;
};

var getVerses = function(filename) {
  var verses = [];
  var verse;
  var verseStarted = false;

  var content = readFile('data/' + filename).split('\n');

  content.forEach(function(line) {

    if (startsWith(line, '#')) { // New verse
      if (verse) {
        verses.push(verse);
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
    verses.push(verse);
  }

  return verses;
};

var poems = meta.map(function(data) {
  var poem = {
    title: data.title,
    title_en: data.title_en,
    author: data.author,
    verses: getVerses(data.file)
  };

  return poem;
});

module.exports = poems;

