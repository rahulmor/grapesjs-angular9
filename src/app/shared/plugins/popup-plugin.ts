import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('plista-adbuilder-preset', (editor, options) => {

  // Get the Style Manager module
  const sm = editor.StyleManager;

  // Event after a component is dropped on to canvas
  editor.on('block:drag:stop', model => {
    const modal = editor.Modal;

    // to make a component selected when it is dropped on canvas
    editor.select(model);
    /**
       Below code is a play around to check and make component always show at a position when dropped on the canvas. 
      Currently commentted this code as someone is looking working on it.
     */
    let style = model.getStyle();
    style.left = '0px'
    style.top = '0px'
    model.setStyle(style);
    style.left = ((300 - model.view.$el[0].offsetWidth) / 2) + 'px';
    model.setStyle(style);
    /**
     * Below lines having repeated code but in future it will have its original content so keeping this code like this.
     */
    if (model && model.is('video')) {
      modal.open({
        title: 'Select Video',
        modalTitle: "Select Video",
        content: "Work in progress...",
      });
    } else if (model && model.is('logo')) {
      modal.open({
        title: 'Select Logo',
        modalTitle: "Select Logo",
        content: "Work in progress...",
      });
    } else if (model && model.is('shape')) {
      modal.open({
        title: 'Select Shape',
        modalTitle: "Select Shape",
        content: "Work in progress...",
      });
    }
  });

  sm.addType('align', {
    create: ({ props, change }) => {
      const el = document.createElement('div');
      el.innerHTML = `<div class="gjs-field gjs-field-radio">
      <div class="gjs-radio-items">
        <button data-value="left" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
            <rect fill="#a0a5ad" x="3" y="8" width="2" height="16"/>
            <rect fill="#c6cacd" x="9" y="13" width="10" height="6"/>
          </svg>
        </button>
        <button data-value="center" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
            <rect fill="#a0a5ad" x="11" y="8" width="2" height="16"/>
            <rect fill="#c6cacd" x="7" y="13" width="10" height="6"/>
          </svg>
        </button>
        <button data-value="right" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">            
            <rect fill="#a0a5ad" x="18" y="8" width="2" height="16"/>
            <rect fill="#c6cacd" x="4" y="13" width="10" height="6"/>
          </svg>
        </button>
        <button data-value="top" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">            
            <rect fill="#a0a5ad" x="4" y="9" width="16" height="2"/>
            <rect fill="#c6cacd" x="9" y="14" width="6" height="10"/>
          </svg>
        </button>
        <button data-value="middle" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
              <rect fill="#a0a5ad" x="4" y="15" width="16" height="2"/>
              <rect fill="#c6cacd" x="9" y="11" width="6" height="10"/>
          </svg>
        </button>
        <button data-value="bottom" class="my-input gjs-button-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="32" viewBox="0 0 23 32">
              <rect fill="#a0a5ad" x="4" y="22" width="16" height="2"/>
              <rect fill="#c6cacd" x="9" y="10" width="6" height="10"/>
          </svg>
        </button>
      </div>
      </div>`;
      const buttonEl = el.querySelectorAll('.my-input');
      for (let i = 0; i < buttonEl.length; ++i) {
        // click will trigger the emit
        buttonEl[i].addEventListener('click', event => {
          if (editor.getSelected() == undefined) {
            console.log('no item selected', event);
            return;
          }
          change({ event })
          console.log(event);
          editor.trigger('component:toggled')
        });
      }
      return el;
    },
    emit: ({ props, updateStyle }, { event, complete }) => {
      const { dataset } = event.target;
      const valueRes = dataset.value;
      let elWidth = editor.getSelected().view.$el[0].offsetWidth;
      let elHeight = editor.getSelected().view.$el[0].offsetHeight;
      // Pass a string value for the exact CSS property or an object containing multiple properties
      // eg. updateStyle({ [props.property]: valueRes, color: 'red' });

      let style = editor.getSelected().getStyle();
      let sideVal;
      console.log(editor.getSelected().cid)
      switch (valueRes) {
        case 'left':
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: '0px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'center':
          sideVal = (300 - elWidth) / 2;
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px', margin: 'auto' }, { complete });
          break;
        case 'right':
          sideVal = (300 - elWidth);
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'top':
          sideVal = (250 - elWidth);
          editor.getSelected().setStyle({ ...style });
          updateStyle({ top: '0px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'middle':
          sideVal = (250 - elHeight) / 2;
          editor.getSelected().setStyle({ ...style });
          updateStyle({ top: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'bottom':
          sideVal = (250 - elHeight);
          editor.getSelected().setStyle({ ...style });
          updateStyle({ top: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
      }
    },
    update({ value, el }) {
      if (el) {
        el.querySelector('.my-input').value = value;
      }
    },
    destroy() {
      // In order to prevent memory leaks, use this method to clean, eventually, created instances, global event listeners, etc.
    }
  });
})