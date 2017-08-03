import pixel from './pixel.js';

export class EmojiPixel {
	constructor (emoji) {
		this.pixel = emoji;
	}
	draw () {
		return this.pixel;
	}
}