import emojiRegex from 'emoji-regex';
import pixel from './pixel.js';

export class EmojiArt {
	constructor (artwork = []) {
		this.art = artwork;
	}
	
	static pixelsFromString (string) {
		const regex = emojiRegex();
		let currentIndex = 0;
		let match;
		let output = [];
		while(match = regex.exec(string)) {
			// Check if the emoji is a surrogate pair
			let matchLength = [...match[0]].length;
			// Parse any whitespace before the next emoji
			let whitespace = string.slice(currentIndex, match.index);
			let pixel = string.slice(match.index, matchLength)
			// Update index	
			currentIndex = match.index + matchLength;
			// Push to line array
			if (whitespace) { 
				this.output.push(new Pixel (whitespace)); 
			}
			if (pixel) { 
				this.output.push (new Pixel(pixel)); 
			}
		}
		return output;
	}

	updatePixel (pixel, index) {
		this.art[index] = pixel;
	}

	outputText () {
		let output = [];
		for (let pixel of this.art) {
			output.push(pixel.draw());
		}
		return output.join('');
	}
}



