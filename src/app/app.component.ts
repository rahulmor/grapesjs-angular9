import { Component } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'grapes-angular';
  private _editor: any;
  constructor() {

  }
  get editor() {
    return this._editor;
  }

  ngOnInit() {
    this._editor = this.initializeEditor();
    // const panelManager = this.editor.Panels;
    // console.log("panels=",panelManager.getPanels());
    // panelManager.getPanels().remove([]);
    this.editor.on('asset:add', () => {
      console.log('Asset add fired');
      // this.editor.runCommand('open-assets');
    });
    // this.editor.setComponents('<div class="cls">New component</div>');
    // The wrapper is the root Component
    // this.editor.Panels.addPanel({
    //   id: 'panel-top',
    //   el: '.panel__top',
    // });
    // this.editor.Panels.addPanel({
    //   id: 'basic-actions',
    //   el: '.panel__basic-actions',
    //   buttons: [
    //     {
    //       id: 'visibility',
    //       active: true, // active by default
    //       className: 'btn-toggle-borders',
    //       label: '<u>B</u>',
    //       command: 'sw-visibility', // Built-in command
    //     }, {
    //       id: 'export',
    //       className: 'btn-open-export',
    //       label: 'Exp',
    //       command: 'export-template',
    //       context: 'export-template', // For grouping context of buttons from the same panel
    //     }, {
    //       id: 'show-json',
    //       className: 'btn-show-json',
    //       label: 'JSON',
    //       context: 'show-json',
    //       command(editor) {
    //         editor.Modal.setTitle('Components JSON')
    //           .setContent(`<textarea style="width:100%; height: 250px;">
    //             ${JSON.stringify(editor.getComponents())}
    //           </textarea>`)
    //           .open();
    //       },
    //     }
    //   ],
    // });
  }
  private initializeEditor(): any {
    console.dir(window);
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      // height: '300px',
      components: '',
      style: '',
      // panels: { defaults: [] },
      // blockManager: {
      //   appendTo: '#blocks',
      //   blocks: [
      //     {
      //       id: 'section', // id is mandatory
      //       label: '<b>Section</b>', // You can use HTML/SVG inside labels
      //       attributes: { class:'gjs-block-section' },
      //       content: `<section>
      //         <h1>This is a simple title</h1>
      //         <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
      //       </section>`,
      //     }, {
      //       id: 'text',
      //       label: 'Text',
      //       content: '<div data-gjs-type="text">Insert your text here</div>',
      //     }, {
      //       id: 'image',
      //       label: 'Image',
      //       // Select the component once it's dropped
      //       select: true,
      //       // You can pass components as a JSON instead of a simple HTML string,
      //       // in this case we also use a defined component type `image`
      //       content: { type: 'image' },
      //       // This triggers `active` event on dropped components and the `image`
      //       // reacts by opening the AssetManager
      //       activate: true,
      //     }
      //   ]
      // },
      plugins: ['gjs-preset-webpage'],
      pluginsOpts: {
        'gjs-preset-webpage': {
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          blocksBasicOpts: {
        appendTo: '#blocks',
            blocks: ['link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3','table'],
            flexGrid: false,
            stylePrefix: 'lala-'
          }
        }
      },
      assetManager: {
        uploadText: 'Add image through link or upload image',
        modalTitle: 'Select Image',
        openAssetsOnDrop: 1,
        inputPlaceholder: 'http://url/to/the/image.jpg',
        addBtnText: 'Add image',
        uploadFile: (e) => {
          const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        },
        handleAdd: (textFromInput) => {
          this.editor.AssetManager.add(textFromInput);
        }
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
        ],
        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js']
      }
    });
  }
}