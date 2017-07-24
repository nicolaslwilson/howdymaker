import emojiRegex from 'emoji-regex';

class emojiArt {
	constructor (artwork) {
		this.art = [];
		let lines = artwork.split(/\r?\n/);
		lines = lines;
		
	}
	loadTextArt (text) {
		
	}
}

class Line {
	constructor (line) {
		this.line = [];
		const regex = emojiRegex();
		let currentIndex = 0;
		let match;
		while(match = regex.exec(line)) {
			// Check if the emoji is a surrogate pair
			let matchLength = [...match[0]].length;
			// Parse any whitespace before the next emoji
			let whitespace = line.slice(currentIndex, match.index);
			let pixel = line.slice(match.index, matchLength)
			// Update index	
			currentIndex = match.index + matchLength;
			// Push to line array
			if (whitespace) { this.line.push(new Whitespace(whitespace)); }
			if (pixel) { this.line.push(new emojiPixel(pixel)); }
		}
	}
}


class Whitespace {
	constructor (whitespace) {
		this.length = whitespace.length;
	}
	draw () {
		return Array(this.length).fill(' ').join('');
	}
}

class EmojiPixel {
	constructor (emoji) {
		this.pixel = emoji;
	}
	draw () {
		return this.pixel;
	}
}