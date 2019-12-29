const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');

['o', 'n', 'e'].forEach(it => {
    imagemin([`images/${it}/*.png`], {
        destination: `public/images/${it}`,
        plugins: [
            imageminZopfli({more: true})
        ]
    });
});
