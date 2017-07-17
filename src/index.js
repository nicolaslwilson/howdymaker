// import $ from 'jquery';
import EmojiPicker from "rm-emoji-picker";
import 'rm-emoji-picker/dist/emojipicker.css';
import './style.css';

const picker = new EmojiPicker({
    callback: (emoji, category, node) => {
      emojiBrush = emoji.$emoji[0].innerText;
      updateBrushDisplay();
    }
  }
);

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
  draw () {
    let spans = this.parts.map((c,i) => {return `<span id='${i}' class='bodypart  ${c.organ}'>${c.emoji}</span>`;});
    let output = 
`⠀ ⠀⠀        ⠀⠀  ${spans[0]}\r` +
`　　　　　${spans[3] + spans[4]  + spans[5] }\r` +
`　　　　${spans[6] } 　${spans[7] }　${spans[8] }\r` +
`　　　${spans[1]}　  ${spans[9] + spans[10]}　${spans[1]}\r` +
`　　　　　${spans[11]}　  ${spans[12]}\r` +
`　　　　　${spans[13]}　　${spans[14]}\r` +
`　　　　　 ${spans[2]}　　${spans[2]}\r`
  return twemoji.parse(output);
  }
  updateBodyPart (index, emoji) {
    this.parts[index].emoji = emoji;
  }
}

let mySheriff = new sheriff();

let emojiBrush =  "😽";

let updateBodyPart = function () {
  let $bodyPart = $(this);
  let index = parseInt($(this).attr('id'));
  mySheriff.updateBodyPart(index, emojiBrush, {});
  render();
}

let updateBrushDisplay = function () {
  $('#brushDisplay').empty();
  $('#brushDisplay').append(emojiBrush);
}

let render = () => {
  $('#mySheriff').empty();
  let $p = $('<p>');
  $p.append(mySheriff.draw());
  $('#mySheriff').append($p);
}

  const icon = document.getElementById('my-icon');
  const container = document.getElementById('my-container');
  const editable = document.getElementById('my-text-input');
  picker.listenOn(icon, container, editable);
  

$(document).ready(() => {
  render();
  updateBrushDisplay();
  $('body').on('click', '.bodypart', updateBodyPart);
});