import { Component, OnInit,ElementRef,AfterViewInit,ViewChild ,Renderer2, OnDestroy } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import * as $ from 'jquery';
// import 'gjs-blocks-basic';
import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-creative-editor',
  templateUrl: './creative-editor.component.html',
  styleUrls: ['./creative-editor.component.css']
})
export class CreativeEditorComponent implements OnInit,AfterViewInit,OnDestroy  {

  private _editor: any;
  filtered:any = [];
  blockManager:any;
  styleManager:any;
  customStyle:any = [];
  panelManager:any;
  customPanel:any;
  canvasHeight:any;
  stepinfoBox:boolean = true;
  subscription: Subscription;
  @ViewChild("customid") divView: ElementRef;
  @ViewChild("styletext") textStyle:ElementRef;
  constructor(private renderer: Renderer2, private filterService: FilterService) {

  }
  get editor() {
    return this._editor;
  }


  ngOnInit(): void {
    this.subscription = this.filterService.getData().subscribe(viewName => {
      console.log('viewName',viewName);
    });
    this._editor = this.initializeEditor();
    this.editor.DomComponents.clear();
    this.editor.getModel().set('dmode', 'absolute');
    this.blockManager = this.editor.BlockManager;
    this.styleManager = this.editor.StyleManager;
    var block1 = this.blockManager.add('image', {
       id: 'image',
       label: 'IMAGE',
      //  category: 'Ad Elements',
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
      label: `TEXT`,
      content: '<p>Put your title here</p>',
      // category: 'Ad Elements',
      attributes: {
        title: 'Insert text',
        // class: 'gjs-fonts gjs-f-h1p'
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block3 = this.blockManager.add('button', {
      id: 'button',
      label: 'BUTTON',
      content: '<button>Button</button>',
      // category: 'Ad Elements',
      attributes: {
        title: 'Button',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block4 = this.blockManager.add('shape', {
      id: 'shape',
      label: 'SHAPE',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Shape',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block5 = this.blockManager.add('video', {
      id: 'video',
      label: 'VIDEO',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Video',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block6 = this.blockManager.add('Logo', {
      id: 'Logo',
      label: 'LOGO',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Logo',
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    var block7 = this.blockManager.add('text', {
      id: 'Div',
      label: `TEXT`,
      content: '<p>Put your title here</p>',
      // category: 'Ad Elements',
      attributes: {
        title: 'Insert text',
        // class: 'gjs-fonts gjs-f-h1p'
        // style:'color: #ffffff;width:20px!important;'
      }
    });
    this.filtered.push(block4);
    this.filtered.push(block5);
    this.filtered.push(block1);
    this.filtered.push(block2);
    this.filtered.push(block6);
    this.filtered.push(block3);
    this.filtered.push(block7);

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
      // this.editor.StyleManager.addSector('TextStyle', {
      //     name: 'TEXT STYLE',
      //     open: true,
      //     buildProps: ['font-family', 'font-weight','font-size','line-height', 'letter-spacing','text-align', 'color']
      //   }, { at: 1 });
    });

      //Drag Event of component 
      this.editor.on('component:drag', (component) => {
          var domElement = this.editor.getSelected();
        if(domElement !== undefined && parseInt(domElement.getStyle().left) < 0) {
            var domElementStyle = this.editor.getSelected().getStyle();
            domElementStyle.left = '0px'
            this.editor.getSelected().setStyle({...domElementStyle});
        }
        if(domElement !== undefined && parseInt(domElement.getStyle().top) < 0) {
          var domElementStyle = this.editor.getSelected().getStyle();
          domElementStyle.top = '0px'
          this.editor.getSelected().setStyle({...domElementStyle});
        }
        if(domElement !== undefined && parseInt(domElement.getStyle().left) > 250) {
          var domElementStyle = this.editor.getSelected().getStyle();
          domElementStyle.left = '245px'
          this.editor.getSelected().setStyle({...domElementStyle});
        }
        if(domElement !== undefined && parseInt(domElement.getStyle().top) > 235) {
          var domElementStyle = this.editor.getSelected().getStyle();
          domElementStyle.top = '228px'
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
        domElement.top = this.canvasHeight*95/100;
        console.log("top==",domElement.top)
        console.log(this.canvasHeight, domElement.top)
        this.editor.getSelected().setStyle({...domElement})
      }
      
      // To check if the element is going out of canvas from left limit
      if(domElement !== undefined && parseInt(domElement.left) < 0) {      
        domElement.left = '0px'
        this.editor.getSelected().setStyle({...domElement});
      }
      if(domElement !== undefined && parseInt(domElement.top) < 0) {
        domElement.top = '0px'
        this.editor.getSelected().setStyle({...domElement});
      }
      if(domElement !== undefined && parseInt(domElement.left) > 250) {
        domElement.left = '245px'
        this.editor.getSelected().setStyle({...domElement});
      }
      if(domElement !== undefined && parseInt(domElement.top) > 235) {
        domElement.top = '228px'
        this.editor.getSelected().setStyle({...domElement});
      }
    });
    
  }
  stepInfoClose(){
    console.log("closed");
    this.stepinfoBox = false;
  }
  checkCheckBoxvalue(event){
    console.log(event.target.checked);
  }
  onClickAlignLeft(){
    const component = this.editor.getSelected();
    console.log("component=",component);
    component && component.addAttributes({ style: {"text-align":"left"}});
  }
  onClickAlignCenter(){
    const component = this.editor.getSelected();
    console.log("component=",component);
    component && component.addAttributes({ style: {"text-align":"center"}});
  }
  onClickAlignRight(){
    const component = this.editor.getSelected();
    console.log("component=",component);
    component && component.addAttributes({ style: {"text-align":"right"}});
  }
  changeHeight(e){
    console.log("height==",e.target.value)
    const component = this.editor.getSelected();
    console.log("component=",component);
    component && component.addAttributes({ style: {"height":e.target.value+"px","margin":"50px"}});
  }
  changeWidth(e){
    console.log("width==",e.target.value)
    const component = this.editor.getSelected();
    console.log("component=",component);
    component && component.addAttributes({ style: {width:e.target.value+"px"}});
  }
  ngAfterViewInit(){
    const newBlocksEl = this.blockManager.render(this.filtered, { external: true });
    console.log("newblock==",newBlocksEl);
    this.renderer.appendChild(this.divView.nativeElement, newBlocksEl);

    const newSector = this.styleManager.render(this.customStyle, { external: true });
    console.log("newSector==",newSector);
    this.renderer.appendChild(this.textStyle.nativeElement, newSector);
    
  }
  private initializeEditor(): any {
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      // height: '100vh',
      components: '',
      style: '',
      panels: { defaults: [] },
      // plugins: ['gjs-blocks-basic'],
      styleManager: {
        //   appendTo: '#style-manager-container',
        sectors: [
          {
            id: 'general',
            name: 'General',
            open: true,
            buildProps: ['width', 'height', 'top', 'left', 'transform'],
            properties: [
              {
                property: 'transform',
                properties: [
                  {
                    name: 'Rotate Y',
                    property: 'transform-rotate-y',
                  },
                  {
                    name: 'Rotate X',
                    property: 'transform-rotate-x',
                  },
                  // {
                  //   name:'Rotate Z',
                  //   property:'transform-rotate-z',
                  // }
                ],
              },
            ],
          },
          {
            name: 'TEXT STYLE',
            open: true,
            buildProps: [
              'font-family',
              'font-weight',
              'font-size',
              'line-height',
              'letter-spacing',
              'text-align',
              'color',
            ],
          },
        ],
      },
      assetManager: {
        uploadText: 'Add image through link or upload image',
        modalTitle: 'Select Image',
        openAssetsOnDrop: 1,
        inputPlaceholder: 'http://url/to/the/image.jpg',
        addBtnText: 'Add image',
        storageType: '',
        storeOnChange: true,
        storeAfterUpload: true,
        upload: 'https://localhost/assets/upload', //for temporary storage
        assets: [],
        uploadFile: (e) => {
          console.log('upload file=', e);
          const file = e.target.files[0];
        },
        handleAdd: (textFromInput) => {
          console.log("textFromInput==",textFromInput);
          this.editor.AssetManager.add(textFromInput);
        },
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
        ],
        scripts: [
          'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        ],
      },
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}