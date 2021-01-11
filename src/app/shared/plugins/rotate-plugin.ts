import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('rotate-plugin', (editor, options) => {
  var clockwiseRotate = 0;
  editor.StyleManager.addType('rotate', {
    create({ props, change }) {
      const el = document.createElement('div');
      el.innerHTML = `<div class="gjs-fields" data-sm-fields><div class="gjs-field gjs-field-integer gjs-field-rotate"><span class="gjs-input-holder"><input type="number" id="rotate-type" class="rotate-type" min="0" max="360" value="0"/></span><span class="gjs-field-units rotate-units">DEG</span></div>
        <button class="rotate-clockwise">
         <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-undo fa-w-16"><path fill="currentColor" d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" class=""></path></svg>
        </button>
        <button class="rotate-reset">
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-circle fa-w-16"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z" class=""></path></svg>
        </button>
        <button class="rotate-anticlockwise">
        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="redo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-redo fa-w-16"><path fill="currentColor" d="M500 8h-27.711c-6.739 0-12.157 5.548-11.997 12.286l2.347 98.568C418.075 51.834 341.788 7.73 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.165 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.322 0-196-87.662-196-196 0-108.322 87.662-196 196-196 79.545 0 147.941 47.282 178.675 115.302l-126.389-3.009c-6.737-.16-12.286 5.257-12.286 11.997V212c0 6.627 5.373 12 12 12h192c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z" class=""></path></svg>
        </button></div>`;
      const inputEl2 = el.querySelector('.rotate-type');
      inputEl2.addEventListener('change', (event) => change({ event })); // change will trigger the emit
      inputEl2.addEventListener('input', (event) => change({ event }));
      const inputEl = el.querySelector('.rotate-clockwise');
       // change will trigger the emit
      inputEl.addEventListener('click', (event) =>
        change({ event, complete: 2 })
      );
      const inputE2 = el.querySelector('.rotate-reset');
      inputE2.addEventListener('click', (event) =>
        change({ event, complete: 1 })
      );
      const inputE3 = el.querySelector('.rotate-anticlockwise');
      inputE3.addEventListener('click', (event) =>
        change({ event, complete: 0 })
      );
      return el;
    },
    emit({ props, updateStyle, el }, { event, complete }) {
      const { value } = event.target;
      var selectedElement = editor.getSelected();
      if (selectedElement !== undefined) {
        var current_angle =
          editor
            .getSelectedToStyle()
            .attributes.style.hasOwnProperty('transform') == false
            ? 0
            : parseInt(
                editor
                  .getSelectedToStyle()
                  .attributes.style.transform.replace(/[^-?0-9\.]/g, ''),
                10
              );
        if (complete !== undefined) {
          switch (complete) {
            case 0:
              clockwiseRotate =
                clockwiseRotate == 360 ? 0 : (current_angle += 45);
              break;
            case 1:
              clockwiseRotate = 0;
              break;
            case 2:
              clockwiseRotate =
                clockwiseRotate == -360 ? 0 : (current_angle -= 45);
              break;
            default:
              0;
              clockwiseRotate =
                clockwiseRotate == 360 ? 0 : (current_angle += 45);
              break;
          }
        } else {
          clockwiseRotate = 0;
        }
        const valueRes = complete !== undefined ? clockwiseRotate : value;
        // Pass a string value for the exact CSS property or an object containing multiple properties
        // eg. updateStyle({ [props.property]: valueRes, color: 'red' });
        updateStyle({ transform: 'rotate(' + valueRes + 'deg)' }, { complete });
        el.querySelector('.rotate-type').value = valueRes;
      }
    },
    update({ value, el }) {
      el.querySelector('.rotate-type').value = value;
    },
    destroy() {
      // In order to prevent memory leaks, use this method to clean, eventually, created instances, global event listeners, etc.
    },
  });
});
