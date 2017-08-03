import pixel from './pixel.js';

export class Whitespace extends pixel {
	constructor (whitespace) {
		super();
		this.length = whitespace.length;
	}
	draw () {
		return Array(this.length).fill(' ').join('');
	}
}