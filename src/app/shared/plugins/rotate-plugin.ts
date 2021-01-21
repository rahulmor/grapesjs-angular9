import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('rotate-plugin', (editor, options) => {
  var clockwiseRotate = 0;
  editor.StyleManager.addType('rotate', {
    create({ props, change }) {
      const el = document.createElement('div');
      el.innerHTML = `<div class="gjs-fields" data-sm-fields><div class="gjs-field gjs-field-integer gjs-field-rotate"><span class="gjs-input-holder"><input type="number" id="rotate-type" class="rotate-type" min="0" max="360" value="0"/></span><span class="gjs-field-units rotate-units">DEG</span></div>
        <button class="rotate-btn" id="2"><i class="fas fa-undo"></i></button>
        <button class="rotate-btn" id="1"><i class="far fa-circle"></i></button>
        <button class="rotate-btn" id="0"><i class="fas fa-redo"></i></button></div>`;
      const inputEl2 = el.querySelector('.rotate-type');
      inputEl2.addEventListener('change', (event) => change({ event })); // change will trigger the emit
      inputEl2.addEventListener('input', (event) => change({ event }));
      inputEl2.addEventListener("keyup", event => {
        if (parseInt((<HTMLInputElement>event.target).value) > 360) {
          change({ event, restrict: true })
        }
      });
      const buttons = el.querySelectorAll('.rotate-btn');
      buttons.forEach(function (currentBtn) {
        currentBtn.addEventListener('click', (event) => {
          change({ event, reset_value: parseInt((<HTMLInputElement>event.target).id) })
        })
      });
      return el;
    },
    emit({ props, updateStyle, el }, { event, reset_value, restrict }) {
      const { value } = event.target;
      var selectedElement = editor.getSelected();
      if (selectedElement !== undefined) {
        if (restrict) {
          el.querySelector('.rotate-type').value = 0;
        }
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
        if (reset_value !== undefined) {
          switch (reset_value) {
            case 0:
              clockwiseRotate = (clockwiseRotate == 360 || current_angle > 360) ? 0 : (current_angle += 45);
              break;
            case 1:
              clockwiseRotate = 0;
              break;
            case 2:
              clockwiseRotate = (clockwiseRotate == -360 || current_angle < - 360) ? 0 : (current_angle -= 45);
              break;
            default:
              break;
          }
        } else {
          clockwiseRotate = 0;
        }
        const valueRes = reset_value !== undefined ? clockwiseRotate : value;
        // Pass a string value for the exact CSS property or an object containing multiple properties
        // eg. updateStyle({ [props.property]: valueRes, color: 'red' });
        updateStyle({ transform: 'rotate(' + valueRes + 'deg)' }, { reset_value });
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
