import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('image-edit-plugin', (editor, options) => {
    editor.StyleManager.addType('image-edit', {
        create({ props, change }) {
          const el = document.createElement('div');
          el.innerHTML = `<!--<div class="gjs-fields" data-sm-fields>
                            <div class="gjs-field gjs-field-integer">              
                                <img src="" class="gjs-image" id="imageTarget"/>
                                <span class="image-edit-icon"><i class="fas fa-plus"></i></span>
                            </div>
                            <div>
                            <div class="gjs-sm-label" data-sm-label="">
                                    <span class="gjs-sm-icon " title="">
                                        RATIO
                                    </span>
                                    <b class="gjs-sm-clear" data-clear-style="" style="display: none;">⨯</b>
                                </div>
                                <div class="ratio-icons">
                                    <div>
                                        <button class="ratio-btn" id="2">2:3</button>
                                        <button class="ratio-btn" id="1">4:3</button>
                                    </div>
                                </div>
                                <div class="ratio-icons1">
                                    <button class="ratio-btn" id="0">16:9</button>
                                    <button class="ratio-btn" id="0">1:1</button>
                                </div>
                            </div>
                        </div>
                        <div class="gjs-sm-label" data-sm-label="">
                            <span class="gjs-sm-icon " title="">
                                Image123
                            </span>
                            <b class="gjs-sm-clear" data-clear-style="" style="display: none;">⨯</b>
                        </div>-->
                        <div class="gjs-fields" data-sm-fields="">
                            <div class="gjs-field gjs-field-range">
                                <input type="range" id="imageOpacity" class="image-edit-opacity" min="0" max="1" step="0.01">
                            </div>
                            <div class="gjs-field gjs-field-integer">
                                <input type="number" id="opacitynumber" placeholder="1" style="width:66px;">
                            </div></div>`;
          const inputEl2 = el.querySelector('#imageOpacity');
          inputEl2.addEventListener('change', (event) => change({ event })); // change will trigger the emit
          return el;
        },
        emit({ props, updateStyle, el }, { event }) {
          const { value } = event.target;
             // Pass a string value for the exact CSS property or an object containing multiple properties
            // eg. updateStyle({ [props.property]: valueRes, color: 'red' });
            updateStyle({ opacity: value }, {  });
            el.querySelector('#opacitynumber').value = value;
        },
        update({ value, el }) {
        },
        destroy() {
          // In order to prevent memory leaks, use this method to clean, eventually, created instances, global event listeners, etc.
        },
      });
})