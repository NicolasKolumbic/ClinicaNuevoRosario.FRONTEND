import "./set-public-path";
import './global.css';

export function loadFontFace(name: string, url: string) {
    var fontFace = new FontFace(name, `url(${url})`);

    fontFace.load().then(function(loaded_face) {
        (document.fonts as any).add(loaded_face);
    }).catch(function(error) {
        // error occurred
    });
}
