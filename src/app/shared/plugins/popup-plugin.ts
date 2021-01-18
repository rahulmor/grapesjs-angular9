import grapesjs from 'grapesjs';
export default grapesjs.plugins.add(
  'plista-adbuilder-preset',
  (editor, options) => {
    //Alternate solution as creating type
    const domc = editor.DomComponents;
    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    domc.addType('test-type', {
      model: defaultModel.extend({
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          type: 'test-type',
          id: 'popup',
          droppable: false,
          resizable: true,
          tagName: 'popup',
        }),
        getAttrToHTML: function () {
          var attr = defaultType.model.prototype.getAttrToHTML.apply(
            this,
            arguments
          );
          delete attr.onmousedown;
          var testmarker = this.get('testmarker');
          if (testmarker) attr.testmarker = testmarker;
          console.log(attr);
          return attr;
        },
      }),
      view: defaultType.view.extend({
        events: {
          click: 'handleClick',
        },
        createContent() {
          const content = document.createElement('div');
          // content.style = 'position: relative';
          content.innerHTML = `
                    <div class="container"> 
                      <form>
                          <div>
                              <label>URL: </label>
                               <input type="text" id="url" placeholder="http://test-data/" name="url">
                          </div>
                          <div>
                              <label>Identity: </label>
                               <input type="text" id="address" placeholder="Enter Identity Address" name="address">
                          </div>
                      </form>
                    </div>
        <button style="
          position: absolute;
          top: 0; right: 0;
          background-color: #fff;
          font-size: 1rem;
          border-radius: 3px;
          border: none;
          padding: 10px 20px;
          cursor: pointer
        ">
             Submit
        </botton>
      `;

          return content;
        },
        handleClick: function (e) {
          var modal = editor.Modal;
          var content = this.createContent();
          var btn = content.children.length === 2 && content.children[1];
          btn.addEventListener('click', this.applyChanges);
          modal.open({
            title: '<br>Create Identity<br>',
            content: content,
          });
        },
        applyChanges() {
          // DO YOUR AJAX STUFF HERE
          console.log('applychanges==');
          editor.setComponents('<div class="cls">New component</div>');
        },
      }),
    });
    //Main solution overriding existing asset manager UI 
    editor.Commands.add('open-assets', {
      run(editor, sender, opts) {
        const assettarget = opts.target;
        // code to open your own modal goes here.
        openModal(assettarget);
//         const assettarget = opts.target;
// assetTarget.set("src", image.url);
      },
    });
    function openModal(assettarget) {
      var modalContent = document.createElement('div');
      // modalContent.setAttribute("style", `.active { background-color: #7a808d; }`);
      modalContent.innerHTML = `<div>
      <ul class="nav nav-tabs image-upload-modal" role="tablist">
        <li role="presentation" class="tab-menu active" >
            <a href="#image" aria-controls="image" id="tab-image" role="tab" data-toggle="tab"><i class="far fa-image"></i>&nbsp;&nbsp;SELECT IMAGE</a>     </li>
        <li role="presentation" class="tab-menu" >
            <a href="#instagram" id="tab-insta" aria-controls="instagram" role="tab" data-toggle="tab">Instagram</a>
        </li>
        <li role="presentation" class="tab-menu" >
            <a href="#unsplash" id="tab-unsplash" aria-controls="unsplash" role="tab" data-toggle="tab">Unsplash</a>
        </li>
        <li role="presentation" class="tab-menu" >
            <a href="#shutterstock" id="tab-shutterstock" aria-controls="shutterstock" role="tab" data-toggle="tab">Shutterstock</a>
        </li>
      </ul>
    
      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="image">
          <div class="dropzone-wrapper">
          <div class="dropzone-desc">
                <i class="fas fa-upload"></i>
                <p>Choose an image file or drag it here.</p>
              </div>
              <input type="file" name="img_logo" class="dropzone"></div>
        </div>
        <div role="tabpanel" class="tab-pane " id="instagram">Instagram</div>
        <div role="tabpanel" class="tab-pane" id="unsplash">Unsplash</div>
        <div role="tabpanel" class="tab-pane" id="shutterstock">Shutterstock</div>
      </div>
    </div>
    `;
    const tab_menu = modalContent.querySelectorAll('.image-upload-modal > li');
    const tab = modalContent.querySelector('.tab-menu')
    console.log("tab menu=",tab_menu);
    tab.classList.remove('active');
    tab_menu.forEach(currenttab => {
      console.log("currenttab=",currenttab);
      
      currenttab.addEventListener("click", event => {
        tab.classList.remove('active');
        currenttab.classList.remove('active');
        console.log("id=",(<HTMLElement>event.target).id)
        tab.classList.add('active');
        currenttab.classList.add('active');
        // document.getElementById((<HTMLElement>event.target).id).classList.toggle('active');
        // if (currenttab.classList.contains('active') ){
        //   console.log("is active=")
        //   currenttab.classList.remove('active');
        // }
        //   console.log("not active");
        //   currenttab.classList.add('active');
      });
    });
    
      // var editorTextArea = document.createElement('textarea');

      // var saveButton = document.createElement('button');
      // saveButton.innerHTML = 'Save';
      // saveButton.className = 'gjs-btn-prim';
      // // saveButton.style = 'margin-top: 8px;';
      // saveButton.onclick = function () {
      //   // var content = codeViewer.editor.getValue();
      //   // editor.getSelected().set('content', content);
      //   editor.Modal.close();
      // };

      // modalContent.appendChild(editorTextArea);
      // modalContent.appendChild(saveButton);

      // // codeViewer.init(editorTextArea);

      // var htmlContent = document.createElement('div');
      // htmlContent.innerHTML = editor.getSelected().toHTML();
      // htmlContent = htmlContent.firstChild.innerHTML;
      // codeViewer.setContent(htmlContent);

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
