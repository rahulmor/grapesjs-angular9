import grapesjs from 'grapesjs';
export default grapesjs.plugins.add(
  'plista-adbuilder-preset',
  (editor, options) => {
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
    // Get the Asset Manager module first
    editor.on('block:drag:stop', (model) => {
      const modal = editor.Modal;
      /**
       * Below lines having repeated code but in future it will have its original content so keeping this code like this.
       */
      if (model && model.is('video')) {
        modal.open({
          title: 'Select Video',
          modalTitle: 'Select Video',
          content: 'Work in progress...',
        });
      } else if (model && model.is('logo')) {
        modal.open({
          title: 'Select Logo',
          modalTitle: 'Select Logo',
          content: 'Work in progress...',
        });
      } else if (model && model.is('shape')) {
        modal.open({
          title: 'Select Shape',
          modalTitle: 'Select Shape',
          content: 'Work in progress...',
        });
      }
    });
  }
);
