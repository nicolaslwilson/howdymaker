import emojiList from './emoji.js';
import './style.css';

class BodyPart {
  constructor (organ, emoji = "🙃") {
    this.organ = organ;
    this.emoji = emoji;
  }
}

class sheriff {
  constructor (head = '🤠', hand = "👇🏽", foot = "👢", body = "💯" ) {
    this.parts = [];
    this.parts.push(new BodyPart('head', head));
    this.parts.push(new BodyPart('hand', hand));
    this.parts.push(new BodyPart('foot', foot));
    let corpus = [];
    while(corpus.length < 13) { corpus.push(new BodyPart('body', body)); }
    this.parts = this.parts.concat(corpus);
  }
  drawHTML () {
    let spans = this.parts.map((c,i) => {return `<span id='${i}' class='bodypart  ${c.organ}'>${c.emoji}</span>`;});
    let output = 
`<p>           ${spans[0]}\r\n` +
`      ${spans[3] + spans[4]  + spans[5]}\r\n` +
`   ${spans[6]}   ${spans[7]}    ${spans[8]}\r\n` +
`${spans[1]}   ${spans[9] + spans[10]}     ${spans[1]}\r\n` +
`     ${spans[11]}    ${spans[12]}\r\n` +
`    ${spans[13]}      ${spans[14]}\r\n` +
`     ${spans[2]}      ${spans[2]}\r\n</p>`
  return twemoji.parse(output);
  }
  updateBodyPart (index, emoji) {
    this.parts[index].emoji = emoji;
  }
}

let mySheriff = new sheriff();

let emojiBrush =  "😽";

let updateBrush = (event) => {
  emojiBrush = event.target.value;
}

let updateBrushDisplay = () => {
  document.getElementById('brushDisplay').value = emojiBrush;
  // $('#brushDisplay').val(emojiBrush);
}

let render = () => {
  let mySheriffElement = document.getElementById('mySheriff');
  mySheriffElement.innerHTML = (mySheriff.drawHTML());
} 

let clipboardSetup = () => {
  if (Clipboard.isSupported()) {
      new Clipboard('.btn');
  } else {
    //  $('.btn').on('click', () => {
    //     window.getSelection().selectAllChildren( document.getElementById( 'mySheriff' ) );
    //   });
  }
}

let sheriffClickHandler = (event) => {
  let bodyPart = event.target.classList.contains('bodypart') ? event.target : event.target.closest('.bodypart');
  let isBodyPart = bodyPart.classList.contains('bodypart');
  if (isBodyPart) {
      let index = parseInt(bodyPart.id);
      mySheriff.updateBodyPart(index, emojiBrush);
      render();
  }
   
}

let setupEmojiPalette = () => {
 let palette = document.getElementById('emojiPalette');
 createEmojiPalette(palette);
 setupEmojiPaletteEventListener(palette);
}

let createEmojiPalette = (palette) => {
  emojiList.forEach(function(element) {
      let e = document.createElement('span');
      e.setAttribute('alt', element);
      e.classList.add('emoji');
      e.innerHTML = element;
      palette.appendChild(e);
  });
  twemoji.parse(palette);
}

let setupEmojiPaletteEventListener = (palette) => {
  palette.addEventListener('click',paletteClickEventHandler);
};

let paletteClickEventHandler = (event) => {
  if (event.target.classList.contains('emoji')) {
    let selectedEmoji = event.target.getAttribute('alt');
    emojiBrush = selectedEmoji;
    updateBrushDisplay();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  render();
  updateBrushDisplay();
  clipboardSetup();
  setupEmojiPalette();
  let mySheriffElement = document.getElementById("mySheriff");
  mySheriffElement.addEventListener('click', sheriffClickHandler);
  let brushDisplay = document.getElementById('brushDisplay');
  brushDisplay.addEventListener('input', updateBrush);
});