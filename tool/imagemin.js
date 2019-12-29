const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');

imagemin([`images/o/*.png`], {destination: `public/images/o`, plugins: [imageminZopfli({more: true})]}).then(() => {
	console.log(`finished: overworld`);
	imagemin([`images/n/*.png`], {destination: `public/images/n`, plugins: [imageminZopfli({more: true})]}).then(() => {
		console.log(`finished: nether`);
		imagemin([`images/e/*.png`], {destination: `public/images/e`, plugins: [imageminZopfli({more: true})]}).then(() => {
			console.log(`finished: the end`);
		});
	});
});
