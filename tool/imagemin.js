const imagemin = require('imagemin');
const imageminZopfli = require('imagemin-zopfli');

imagemin(['images/0/*.png'], {
    destination: 'public/images/0',
    plugins: [
        imageminZopfli({more: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
