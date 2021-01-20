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
            return;
          }
          change({ event })
          editor.trigger('component:toggled')
        });
      }
      return el;
    },
    emit: ({ props, updateStyle }, { event, complete }) => {
      const canvasWrapperHtml = document.getElementById("gjs");
      let canvasWrapper = canvasWrapperHtml.querySelectorAll(".gjs-frame-wrapper");
      const { dataset } = event.target;
      const valueRes = dataset.value;
      let elWidth = editor.getSelected().view.$el[0].offsetWidth;
      let elHeight = editor.getSelected().view.$el[0].offsetHeight;
      // Pass a string value for the exact CSS property or an object containing multiple properties
      // eg. updateStyle({ [props.property]: valueRes, color: 'red' });

      let style = editor.getSelected().getStyle();
      let sideVal;
      switch (valueRes) {
        case 'left':
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: '0px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'center':
          sideVal = (canvasWrapper[0].clientWidth - elWidth) / 2;
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px', margin: 'auto' }, { complete });
          break;
        case 'right':
          sideVal = (canvasWrapper[0].clientWidth - elWidth);
          editor.getSelected().setStyle({ ...style });
          updateStyle({ left: sideVal + 'px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'top':
          sideVal = (canvasWrapper[0].clientHeight - elHeight);
          editor.getSelected().setStyle({ ...style });
          updateStyle({ top: '0px', width: elWidth + 'px', height: elHeight + 'px' }, { complete });
          break;
        case 'middle':
          sideVal = (canvasWrapper[0].clientHeight - elHeight) / 2;
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

  editor.Commands.add('open-assets', {
    run(editor, sender, opts) {
      const assettarget = opts.target;
      // code to open your own modal goes here.
      openModal(assettarget);
    },
  });
  function openModal(assettarget) {
    var modalContent = document.createElement('div');
    modalContent.innerHTML = `<div>
      <ul class="nav nav-tabs image-upload-modal" role="tablist">
        <li role="presentation" class="tab-menu active" id="default-image" >
            <a href="#image" aria-controls="image" id="tab-image" role="tab" data-toggle="tab"><i class="far fa-image"></i>&nbsp;&nbsp;SELECT IMAGE</a>     </li>
        <li role="presentation" class="tab-menu" id="insta-image">
            <a href="#instagram" id="tab-insta" aria-controls="instagram" role="tab" data-toggle="tab">Instagram</a>
        </li>
        <li role="presentation" class="tab-menu" id="unsplash-image">
            <a href="#unsplash" id="tab-unsplash" aria-controls="unsplash" role="tab" data-toggle="tab">Unsplash</a>
        </li>
        <li role="presentation" class="tab-menu" id="shutter-image">
            <a href="#shutterstock" id="tab-shutterstock" aria-controls="shutterstock" role="tab" data-toggle="tab">Shutterstock</a>
        </li>
      </ul>
    
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="image">
        <form id="file-upload-form" class="uploader">
        <div style="height:0px;overflow:hidden">
                  <input type="file" id="fileInput" name="fileInput" accept="image/*"/>
              </div>
          <div class="dropzone-wrapper" id="file-drag" draggable="true">
          <div class="dropzone-desc">
                <span class="upload-icon"><i class="far fa-arrow-to-top"></i></span>
                <p class="upload-text">DRAG AND DROP IMAGE</p>
                
              <button type="button" class="select-image" id="image-upload">SELECT IMAGE</button>
              </div>
           </div>
        </form>
        </div>
        <div role="tabpanel" class="tab-pane" id="instagram">In progress</div>
        <div role="tabpanel" class="tab-pane" id="unsplash">In progress</div>
        <div role="tabpanel" class="tab-pane" id="shutterstock">In progress</div>
      </div>
    </div>
    `;
    const tab_menu = modalContent.querySelectorAll(
      '.image-upload-modal > li'
    );
    const tab = modalContent.querySelector('.tab-menu');
    tab.classList.remove('active');
    tab_menu[0].classList.add('active');
    tab_menu.forEach((currenttab) => {
      currenttab.addEventListener('click', (event) => {
        tab_menu.forEach((removeClassEle) => {
          removeClassEle.classList.remove('active');
        });
        currenttab.classList.add('active');
      });
    });

    var fileSelect = modalContent.querySelector('#fileInput');
    modalContent
      .querySelector('#image-upload')
      .addEventListener('click', (event) => {
        document.getElementById('fileInput').click();
      });
    fileSelect.addEventListener(
      'change',
      function (e) {
        var tmppath = URL.createObjectURL(this.files[0]);
        assettarget.set('src', tmppath);
        editor.Modal.setContent(modalContent).close();
      },
      false
    );

    var dropArea = modalContent.querySelector('#file-drag');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dropArea.addEventListener('drop', handleDrop, false);
    function handleDrop(e) {
      var tmppath = URL.createObjectURL(e.dataTransfer.files[0]);
      assettarget.set('src', tmppath);
      editor.Modal.setContent(modalContent).close();
    }
    editor.Modal.setContent(modalContent).open();
  }
}
);
