import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import * as $ from 'jquery';
import grapesjsTabs from 'grapesjs-tabs';
import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
import plistaAdbuilderPresetPlugin from '../plugins/popup-plugin';
import { isArray } from 'util';
import { STYLE } from './../constants/builder.constants';

@Component({
  selector: 'app-creative-editor',
  templateUrl: './creative-editor.component.html',
  styleUrls: ['./creative-editor.component.css']
})
export class CreativeEditorComponent implements OnInit,AfterViewInit,OnDestroy  {
  applyStyle = STYLE;       
  products: any = [];
  public element;
  private _editor: any;
  filtered: any = [];
  blockManager: any;
  styleManager: any;
  customStyle: any = [];
  panelManager: any;
  customPanel: any;
  canvasHeight: number = 250;
  canvasWidth: number = 300;
  layerManager:any;
  commands:any;
  stepinfoBox:boolean = true;
  subscription: Subscription;
  viewLoaded: string = 'basic';
  currentIFrame: any;
  @ViewChild("customid") divView: ElementRef;
  @ViewChild("styletext") textStyle:ElementRef;
  constructor(private renderer: Renderer2, private filterService: FilterService, private elemRef: ElementRef) {

  }
  get editor() {
    return this._editor;
  }
  

  ngOnInit(): void {
    
    this._editor = this.initializeEditor();
    this.editor.DomComponents.clear();
    this.editor.getModel().set('dmode', 'absolute');
    this.blockManager = this.editor.BlockManager;
    this.styleManager = this.editor.StyleManager;
    this.layerManager = this.editor.layerManager;
    this.commands = this.editor.Commands;

    var imageBlock = this.blockManager.add('image', {
       id: 'image',
       label: '<i class="far fa-image"></i>',
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
      },
     });
     var textBlock = this.blockManager.add('text', {
      id: 'text',
      label: `<i class="far fa-text"></i>`,
      content: '<p>Put your title here</p>',
      attributes: {
        title: 'Insert text',
      }
    });
    var buttonBlock = this.blockManager.add('button', {
      id: 'button',
      label: '<i class="far fa-rectangle-wide"></i>',
      content:{
        type:'link',
        content:'<button>Button</button>',
      },
      // category: 'Ad Elements',
      attributes: {
        title: 'Button',
      }
    });
    var shapeBlock = this.blockManager.add('shape', {
      id: 'shape',
      label: 'SHAPE',
      content: {
        type:'link',
      },
      // category: 'Ad Elements',
      attributes: {
        title: 'Shape',
      }
    });
    var videoBlock = this.blockManager.add('video', {
      id: 'video',
      label: '<i class="far fa-video"></i>',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Video',
      }
    });
    var logoBlock = this.blockManager.add('Logo', {
      id: 'Logo',
      label: '<i class="far fa-icons"></i>',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Logo',
      }
    });
    this.filtered.push(shapeBlock);
    this.filtered.push(videoBlock);
    this.filtered.push(imageBlock);
    this.filtered.push(textBlock);
    this.filtered.push(logoBlock);
    this.filtered.push(buttonBlock);

    this.subscription = this.filterService.getData().subscribe(viewName => {
      let wrapperHeight;
      switch (viewName) {
        case "basic":
            this.viewLoaded = STYLE.BASIC.VIEW_NAME;
            this.canvasHeight = STYLE.BASIC.SIZE.CANVAS_HEIGHT;
            this.canvasWidth = STYLE.BASIC.SIZE.CANVAS_WIDTH;
            wrapperHeight = STYLE.BASIC.SIZE.HEIGHT;
          break;
        case "landscape":
            this.viewLoaded = STYLE.LANDSCAPE.VIEW_NAME;
            this.canvasHeight = STYLE.LANDSCAPE.SIZE.CANVAS_HEIGHT;
            this.canvasWidth = STYLE.LANDSCAPE.SIZE.CANVAS_WIDTH;
            wrapperHeight = STYLE.LANDSCAPE.SIZE.HEIGHT;
          break;
          case "portrait":
            this.viewLoaded = STYLE.PORTRAIT.VIEW_NAME;
            this.canvasHeight = STYLE.PORTRAIT.SIZE.CANVAS_HEIGHT;
            this.canvasWidth = STYLE.PORTRAIT.SIZE.CANVAS_WIDTH;
            wrapperHeight = STYLE.PORTRAIT.SIZE.HEIGHT;
          break;
        default:
            this.viewLoaded = STYLE.BASIC.VIEW_NAME;
            this.canvasHeight = STYLE.BASIC.SIZE.CANVAS_HEIGHT;
            this.canvasWidth = STYLE.BASIC.SIZE.CANVAS_WIDTH;
            wrapperHeight = STYLE.BASIC.SIZE.HEIGHT;
          break;
      }

      let myCommand = this.commands.get(this.viewLoaded);
      // This command will change view of canvas
      myCommand.run();

      this.currentIFrame.contents().find("body").css({'overflow':'hidden','height':wrapperHeight});

      this.editor.getWrapper().set({'badgable': false, 'highlightable': false}).setStyle({
        overflow: 'hidden',
        height: wrapperHeight
      });
    });
  }

  stepInfoClose(){
    console.log("closed");
    this.stepinfoBox = false;
  }
  checkCheckBoxvalue(event) {
  }
  onClickAlignLeft() {
    const component = this.editor.getSelected();
    component && component.addAttributes({ style: { "text-align": "left" } });
  }
  onClickAlignCenter() {
    const component = this.editor.getSelected();
    component && component.addAttributes({ style: { "text-align": "center" } });
  }
  onClickAlignRight() {
    const component = this.editor.getSelected();
    component && component.addAttributes({ style: { "text-align": "right" } });
  }
  changeHeight(e) {
    const component = this.editor.getSelected();
    component && component.addAttributes({ style: { "height": e.target.value + "px", "margin": "50px" } });
  }
  changeWidth(e) {
    const component = this.editor.getSelected();
    component && component.addAttributes({ style: { width: e.target.value + "px" } });
  }

  onClickSendBack() {
    let wrapper = this.editor.getWrapper();
    const component = this.editor.getSelected();
    // const component = this.editor.getSelected();
    // console.log('Hi',component);
    // component.move(wrapper, {at:0});
    if(this.editor.getSelected()){
      const idx = component.index();
      if(idx !== 0){
        const selectedComponent = component.clone();
        component.remove();
        wrapper.append(selectedComponent, { at: 0});
        this.editor.select(null);
      }
    }
    this.editor.select(null);
  }
  onClickSetFront() {
    let wrapper = this.editor.getWrapper();
    var wrapperChildren = this.editor.getComponents();
    let lastIndex = (wrapperChildren.length) - 1;
    console.log(lastIndex)
    const component = this.editor.getSelected();
    if(this.editor.getSelected()){
      const idx = component.index();
      if(idx !== lastIndex){
        const selectedComponent = component.clone();
        component.remove();
        wrapper.append(selectedComponent, { at: lastIndex});
      }
    }
    this.editor.select(null);
  }
  onClickRemoveComponent() {
    const component = this.editor.getSelected();
    component.remove();
  }
  ngAfterViewInit() {
    const newBlocksEl = this.blockManager.render(this.filtered, { external: true });
    this.renderer.appendChild(this.divView.nativeElement, newBlocksEl);
    const newSector = this.styleManager.render(this.customStyle, { external: true });
    this.renderer.appendChild(this.textStyle.nativeElement, newSector);

     // set custom commands
    this.setDeviceToggleCommands();

    // set Basic style
    this.setDefaultView();

    // setup drag event
    this.setupDragEvent();
    console.log(this.viewLoaded);
  }

  private initializeEditor(): any {
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      avoidInlineStyle:false,
      plugins: [plistaAdbuilderPresetPlugin, grapesjsTabs],
      pluginsOpts: {
        grapesjsTabs: {
          // options
        }
      },
      
      components: '',
      style: '',
      deviceManager: {
        devices: [{
            name: STYLE.BASIC.NAME,
            width: STYLE.BASIC.SIZE.WIDTH, // default size
            height: STYLE.BASIC.SIZE.HEIGHT
        }, 
        {
            name: STYLE.LANDSCAPE.NAME,
            width: STYLE.LANDSCAPE.SIZE.WIDTH, // this value will be used on canvas width
            height: STYLE.LANDSCAPE.SIZE.HEIGHT
        },
        {
            name: STYLE.PORTRAIT.NAME,
            width: STYLE.PORTRAIT.SIZE.WIDTH, // this value will be used on canvas width
            height: STYLE.PORTRAIT.SIZE.HEIGHT
        }]
      },
      layerManager: {
        appendTo: '#layers-container',
      },
      commands: {
        defaults: [
        ],
      },
      // We define a default panel as a sidebar to contain layers
      panels: {
        defaults: [{
          id: 'layers',
          resizable: {
            tc: 0,
            cr: 1,
            bc: 0,
            keyWidth: 'flex-basis',
          },
          // Make the panel resizable
        }]
          
      },
      // plugins: ['gjs-blocks-basic'],
      styleManager: {
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
              'text-transform',
              'color',
              
            ],
            properties: [
              {
               property: 'text-align',
               list: [
                   { value: 'left', className: 'far fa-align-left' },
                   { value: 'center', className: 'far fa-align-center'},
                   { value: 'right', className: 'far fa-align-right' },
               ],
            },
            {
              property: 'font-size',
              name: 'SIZE',
            },
            {
              property: 'letter-spacing',
              name: 'SPACING',
            },
            {
              property: 'color',
              name: 'COLOR',
              list: [
                { name:'HEX' },
              ],
            },
            {
              property: 'text-transform',
              type: 'radio',
              name: 'TEXT STYLE',
              list: [
                  { value: 'capitalize', name:'Aa' },
                  { value: 'uppercase', name:'AA'}
              ],
            }],
          },
        ],
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

  setDefaultView() {
    this.commands.run(STYLE.BASIC.VIEW_NAME);
    this.currentIFrame = $('iframe');
    this.currentIFrame.contents().find("body").css({'overflow':'hidden','height':STYLE.BASIC.SIZE.HEIGHT});
  }

  setupDragEvent() {
    //Track Drag Event of component
    this.editor.on('component:drag', (component) => {
        var domElement = this.editor.getSelected();
        let selectedEleWidth = this.currentIFrame.contents().find("body #wrapper .gjs-selected").width();

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
        if(domElement !== undefined && parseInt(domElement.getStyle().left) > this.canvasWidth) {
          var domElementStyle = this.editor.getSelected().getStyle();
          domElementStyle.left = (this.canvasWidth - 15) + 'px'; //'245px'
         this.editor.getSelected().setStyle({...domElementStyle});
        }
        if(domElement !== undefined && parseInt(domElement.getStyle().top) > (this.canvasHeight - 20)) {
         var domElementStyle = this.editor.getSelected().getStyle();
          domElementStyle.top = (this.canvasHeight - 22) + 'px'; //'228px'
          this.editor.getSelected().setStyle({...domElementStyle});
        }
      });

    //Drag End Event of component 
    this.editor.on('component:drag:end', (component) => {
      var domElement = this.editor.getSelected().getStyle();
      //const style = window.getComputedStyle(domElement)
     const wrapperHeight = this.currentIFrame.contents().find("body #wrapper").height();

      // To check if the element is going out of canvas from bottom limit
      if(parseInt(domElement.top) > this.canvasHeight ) {
         domElement.top = this.canvasHeight*95/100;
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
      if(domElement !== undefined && parseInt(domElement.left) > this.canvasWidth) {
        domElement.left = (this.canvasWidth - 5) + 'px' //'245px'
        this.editor.getSelected().setStyle({...domElement});
      }
      if(domElement !== undefined && parseInt(domElement.top) > (this.canvasHeight - 15)) {
        domElement.top = (this.canvasHeight - 22) + 'px' //'228px'
        this.editor.getSelected().setStyle({...domElement});
      }
    });
  }

  setDeviceToggleCommands() {
    this.commands = this.editor.Commands;

    /*Custom Commands added to toggle view of ad sizes*/
    this.commands.add(STYLE.BASIC.VIEW_NAME, {
      run: editor => this.editor.setDevice(STYLE.BASIC.NAME)
    });
    this.commands.add(STYLE.LANDSCAPE.VIEW_NAME, {
      run: editor => this.editor.setDevice(STYLE.LANDSCAPE.NAME)
    });
    this.commands.add(STYLE.PORTRAIT.VIEW_NAME, {
      run: editor => this.editor.setDevice(STYLE.PORTRAIT.NAME)
    });
  }
}