import { Component, OnInit,ElementRef,AfterViewInit,ViewChild ,Renderer2 } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import * as $ from 'jquery';
// import 'gjs-blocks-basic';
@Component({
  selector: 'app-creative-editor',
  templateUrl: './creative-editor.component.html',
  styleUrls: ['./creative-editor.component.css']
})
export class CreativeEditorComponent implements OnInit,AfterViewInit  {

  private _editor: any;
  filtered:any = [];
  blockManager:any;
  styleManager:any;
  customStyle:any;
  panelManager:any;
  customPanel:any;
  canvasHeight:any;
  @ViewChild("customid") divView: ElementRef;
  @ViewChild("styletext") textStyle:ElementRef;
  // @ViewChild("panel") panel:ElementRef;
  constructor(private renderer: Renderer2,) {

  }
  get editor() {
    return this._editor;
  }


  ngOnInit(): void {
    this._editor = this.initializeEditor();
    this.editor.getModel().set('dmode', 'absolute');
    this.blockManager = this.editor.BlockManager;
    // this.panelManager = this.editor.Panels;
    const deviceManager = this.editor.DeviceManager;
    this.styleManager = this.editor.StyleManager;
    deviceManager.add('basic', '300px', {
      height: '250px',
      // At first, GrapesJS tries to localize the name by device id.
      // In case is not found, the `name` property is used (or `id` if name is missing)
      name: 'Basic',
      widthMedia: '250px', // the width that will be used for the CSS media
     });
     var block1 = this.blockManager.add('image', {
       id: 'image',
       label: 'Image',
       category: 'Ad Elements',
       // Select the component once it's dropped
       select: true,
       // You can pass components as a JSON instead of a simple HTML string,
       // in this case we also use a defined component type `image`
       content: { type: 'image' },
       // This triggers `active` event on dropped components and the `image`
       // reacts by opening the AssetManager
       activate: true,
       attributes: {
        title: 'Image',
        // style:'width:40px!important;display:inline'
      }
     });
     var block2 = this.blockManager.add('text', {
      id: 'text',
      label: 'Text',
      content: '<p>Put your title here</p>',
      category: 'Ad Elements',
      attributes: {
        title: 'Insert text',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block3 = this.blockManager.add('button', {
      id: 'button',
      label: 'Button',
      content: '<button>Button</button>',
      category: 'Ad Elements',
      attributes: {
        title: 'Button',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block4 = this.blockManager.add('shape', {
      id: 'shape',
      label: 'Shape',
      content: '',
      category: 'Ad Elements',
      attributes: {
        title: 'Shape',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    
    this.filtered.push(block1);
    this.filtered.push(block2);
    this.filtered.push(block3);
    this.filtered.push(block4);
    console.log("blocks==",JSON.stringify(this.filtered))
    // this.filtered = blocks.filter(block => {
    //   console.log("blocks123==",block.getConfig('id'))
    //   if(block.get('id') == 'column1'){
    //     block.prototype.attributes = { class: 'gjs-fonts gjs-f-b1' };
    //     return block;
    //   }
    // });
    console.log("filtered==",this.filtered);
    // const panelManager = this.editor.Panels;
    // console.log("panels=",panelManager.getPanels());
    // panelManager.getPanels().remove([]);
    this.editor.on('asset:add', () => {
      console.log('Asset add fired');
      // this.editor.runCommand('open-assets');
    });
    this.styleManager = this.editor.StyleManager;
    const propView = this.styleManager.getSectors();
    console.log("stylemanager=",propView);
    this.customStyle = propView.filter(block => {
        console.log("sector==",block)
        if(block.get('id') == 'general'){
          return block;
        }
      });
      console.log("customestyle==",this.customStyle);
      const parserCss = (css, editor) => {
        const result = [];
        // ... parse the CSS string
          result.push({
            selectors: '.gjs-blocks-cs',
            style: { color: 'red' }
          })
        // ...
        return result; // Result should be ALWAYS an array
      };
      console.log("parserCss=",parserCss);
      this.editor.setCustomParserCss(parserCss);      
    // var sector = this.styleManager.addSector('mySector',{
    //   name: 'My sector',
    //   open: true,
    //   properties: [{ name: 'My property'}]
    // }, { at: 0 });
    // console.log("sector==",JSON.stringify(sector))
    // this.customStyle = sector;
    // this.customPanel = this.panelManager.addPanel({
    //   id: 'myNewPanel',
    //   visible: true,
    //   buttons: [
    //     {
    //       id: 'myNewButton',
    //       className: 'someClass',
    //       command: 'someCommand',
    //       attributes: { title: 'Some title' },
    //       active: false,
    //     },
    //   ],
    // });
    // const canvas = this.editor.Canvas;
    // this.editor.on('canvas:dragenter', (data) => {
    //   alert('selected = '+data)
    //   console.log("data=",data)
    //   this.editor.StyleManager.addSector('Typography1', {
    //       name: 'Typography',
    //       open: true,
    //       buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align']
    //     }, { at: 0 });
    // });
    // var focus = canvas.hasFocus(function(component){
    //   return component;
    //  });
    //  console.log("canvas=",focus)
    this.canvasHeight = 250;
    
    //To set the base style of the wrapper  
      const $currentIFrame = $('iframe');
      $currentIFrame.contents().find("body").css('overflow', 'hidden');
      this.editor.getWrapper().set({'badgable': false, 'highlightable': false}).setStyle({
        overflow: 'hidden',
        height: '250px'
      })
    //This is to update the style in styleManager after drag end in designer mode 
    this.editor.on('stop:core:component-drag',() => { this.editor.trigger('component:toggled') });
    
    //Event when a component is selected
    this.editor.on('component:selected', (component) => {
      // alert('selected')
      this.editor.StyleManager.addSector('Typography', {
          name: 'Typography',
          open: true,
          buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align']
        }, { at: 0 });
    });

      //Drag Event of component 
      this.editor.on('component:drag', (component) => {
          var domElement = this.editor.getSelected();
        if(domElement !== undefined && parseInt(domElement.getStyle().left) < 0) {
            var domElementStyle = this.editor.getSelected().getStyle();
            domElementStyle.left = '0px'
            this.editor.getSelected().setStyle({...domElementStyle});
        }
      });
      //Drag End Event of component 
    this.editor.on('component:drag:end', (component) => {
      var domElement = this.editor.getSelected().getStyle();
      //const style = window.getComputedStyle(domElement)
      const $currentIFrame = $('iframe');
      const wrapperHeight = $currentIFrame.contents().find("body #wrapper").height();
      
      // To check if the element is going out of canvas from bottom limit
      if(parseInt(domElement.top) > this.canvasHeight ) {        
        alert("Height Exceeded");
        domElement.top = this.canvasHeight*95/100;
        console.log(this.canvasHeight, domElement.top)
        this.editor.getSelected().setStyle({...domElement})
      }
      
      // To check if the element is going out of canvas from left limit
      if(domElement !== undefined && parseInt(domElement.left) < 0) {      
        domElement.left = '0px'
        this.editor.getSelected().setStyle({...domElement});
      }
      // Commented this as updated logic above for the same
      /*if(wrapperHeight > this.canvasHeight) {
        let allComponents  = this.editor.getComponents();
        let componentsToBeRemoved = allComponents.filter(
          componentModel => (
            componentModel.attributes['tagName']));
        const lastComponentIndex = componentsToBeRemoved.length - 1;
        componentsToBeRemoved = componentsToBeRemoved[lastComponentIndex];
        componentsToBeRemoved.collection.remove(componentsToBeRemoved);
        alert("Height Exceeded");
      }*/
    });
  }
  ngAfterViewInit(){
    const newBlocksEl = this.blockManager.render(this.filtered, { external: true });
    console.log("newblock==",newBlocksEl);
    // document.getElementById('customid').appendChild(newBlocksEl);
    console.log(this.divView);
    // this.divView.nativeElement.innerHTML = newBlocksEl;
    this.renderer.appendChild(this.divView.nativeElement, newBlocksEl);

    const newSector = this.styleManager.render(this.customStyle, { external: true });
    console.log("newSector==",newSector);
    this.renderer.appendChild(this.textStyle.nativeElement, newSector);
    // const newPanel = this.panelManager.render(this.customPanel, { external: true });
    // console.log("newPanel==",newPanel);
    // this.renderer.appendChild(this.panel.nativeElement, newPanel);
  }
  private initializeEditor(): any {
    console.dir(window);
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      // height: '100vh',
      components: '',
      style: '',
      panels: { defaults: [] },
      // plugins: ['gjs-blocks-basic'],
      // layerManager: {
      //   appendTo: '#layers-container'
      // },
      // blockManager: {
      //   appendTo: '#blocks',
        // blocks: [
        //   {
        //     id: 'section', // id is mandatory
        //     label: '<b>Section</b>', // You can use HTML/SVG inside labels
        //     attributes: { class:'gjs-block-section' },
        //     content: `<section>
        //       <h1>This is a simple title</h1>
        //       <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        //     </section>`,
        //   }, {
        //     id: 'text',
        //     label: 'Creative 4 Live',
        //     content: '<div data-gjs-type="text" style="color:red;font-size:14px;">Creative 4 Live</div>',
        //   }, {
        //     id: 'image',
        //     label: 'Image',
        //     // Select the component once it's dropped
        //     select: true,
        //     // You can pass components as a JSON instead of a simple HTML string,
        //     // in this case we also use a defined component type `image`
        //     content: { type: 'image' },
        //     // This triggers `active` event on dropped components and the `image`
        //     // reacts by opening the AssetManager
        //     activate: true,
        //   },
        //   {
        //     id: 'image1',
        //     label: 'Image1',
        //     // Select the component once it's dropped
        //     select: true,
        //     // You can pass components as a JSON instead of a simple HTML string,
        //     // in this case we also use a defined component type `image`
        //     content: { type: 'image' },
        //     // This triggers `active` event on dropped components and the `image`
        //     // reacts by opening the AssetManager
        //     activate: true,
        //   },
        //   {
        //     id: 'image2',
        //     label: 'Image2',
        //     // Select the component once it's dropped
        //     select: true,
        //     // You can pass components as a JSON instead of a simple HTML string,
        //     // in this case we also use a defined component type `image`
        //     content: { type: 'image' },
        //     // This triggers `active` event on dropped components and the `image`
        //     // reacts by opening the AssetManager
        //     activate: true,
        //   }
        // ]
      // },
      styleManager: {
        // appendTo: '#style-manager-container',
        sectors: [{
          id:"general",
          name: 'General',
          open: true,
          buildProps: ['float', 'display', 'position', 'width', 'height', 'top', 'left','transform'],
          // properties:[
          //   {
          //       property:'transform',
          //       properties:[
          //           {
          //               name:'Translate Y',
          //               property:'transform-translate-y',
          //               functionName: 'translateY',
          //               defaults: 0,
          //               type: 'integer',
          //               units: ['px', '%'],
          //               unit: 'px'
          //           },
          //           {
          //               name:'Translate X',
          //               property:'transform-translate-x',
          //               functionName: 'translateX',
          //               defaults: 0,
          //               type: 'integer',
          //               units: ['px', '%'],
          //               unit: 'px'
          //           },
          //       ]
          //   }
        // ]
        },
        //  {
        //   name: 'Dimension',
        //   open: false,
        //   buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding']
        // },
         {
          name: 'Text Style',
          open: true,
          buildProps: ['font-family','font-weight', 'font-size','line-height', 'letter-spacing','text-align', 'color',  ]
        }
        // , {
        //   name: 'Decorations',
        //   open: false,
        //   buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
        // }
        // , {
        //   name: 'Extra',
        //   open: false,
        //   buildProps: ['opacity', 'transition', 'perspective', 'transform'],
        //   properties: [{
        //     type: 'slider',
        //     property: 'opacity',
        //     defaults: 1,
        //     step: 0.01,
        //     max: 1,
        //     min: 0,
        //   }]
        // }
      ],
      },
      // plugins: ['gjs-preset-webpage'],
      // pluginsOpts: {
      //   'gjs-preset-webpage': {
      //     navbarOpts: false,
      //     countdownOpts: false,
      //     formsOpts: false,
      //     blocksBasicOpts: {
      //       blocks: ['link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3','table'],
      //       flexGrid: false,
      //       stylePrefix: 'lala-'
      //     }
      //   }
      // },
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
