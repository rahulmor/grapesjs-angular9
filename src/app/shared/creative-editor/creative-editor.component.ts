import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import * as $ from 'jquery';
import grapesjsTabs from 'grapesjs-tabs';
import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
import plistaAdbuilderPresetPlugin from '../plugins/popup-plugin';
@Component({
  selector: 'app-creative-editor',
  templateUrl: './creative-editor.component.html',
  styleUrls: ['./creative-editor.component.css']
})
export class CreativeEditorComponent implements OnInit,AfterViewInit,OnDestroy  {

  
  public element;
  private _editor: any;
  filtered:any = [];
  blockManager:any;
  styleManager:any;
  customStyle:any = [];
  panelManager:any;
  customPanel:any;
  canvasHeight:any;
  layerManager:any;
  commands:any;
  stepinfoBox:boolean = true;
  subscription: Subscription;
  @ViewChild("customid") divView: ElementRef;
  @ViewChild("styletext") textStyle:ElementRef;
  constructor(private renderer: Renderer2, private filterService: FilterService, private elemRef: ElementRef) {

  }
  get editor() {
    return this._editor;
  }
  

  ngOnInit(): void {
    this.subscription = this.filterService.getData().subscribe(viewName => {
      console.log('viewName', viewName);
    });
    this._editor = this.initializeEditor();
    this.editor.DomComponents.clear();
    this.editor.getModel().set('dmode', 'absolute');
    this.blockManager = this.editor.BlockManager;
    this.styleManager = this.editor.StyleManager;
    this.layerManager = this.editor.layerManager;
    this.commands = this.editor.Commands;
    var block1 = this.blockManager.add('image', {
       id: 'image',
       label: '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="image" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-image fa-w-16"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z" class=""></path></svg>',
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
     var block2 = this.blockManager.add('text', {
      id: 'text',
      label: `<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="text" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-text fa-w-14"><path fill="currentColor" d="M448 48v72a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8V64H240v384h72a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H136a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h72V64H32v56a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V48a16 16 0 0 1 16-16h416a16 16 0 0 1 16 16z" class=""></path></svg>`,
      content: '<p>Put your title here</p>',
      attributes: {
        title: 'Insert text',
      }
    });
    var block3 = this.blockManager.add('button', {
      id: 'button',
      label: '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="rectangle-wide" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-rectangle-wide fa-w-20"><path fill="currentColor" d="M592 96H48c-26.5 0-48 21.5-48 48v224c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48zm16 272c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h544c8.8 0 16 7.2 16 16v224z" class=""></path></svg>',
     
      content:{
        type:'link',
        content:'<button>Button</button>',
      },
      // category: 'Ad Elements',
      attributes: {
        title: 'Button',
      }
    });
    var block4 = this.blockManager.add('shape', {
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
    var block5 = this.blockManager.add('video', {
      id: 'video',
      label: '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-video fa-w-18"><path fill="currentColor" d="M543.9 96c-6.2 0-12.5 1.8-18.2 5.7L416 171.6v-59.8c0-26.4-23.2-47.8-51.8-47.8H51.8C23.2 64 0 85.4 0 111.8v288.4C0 426.6 23.2 448 51.8 448h312.4c28.6 0 51.8-21.4 51.8-47.8v-59.8l109.6 69.9c5.7 4 12.1 5.7 18.2 5.7 16.6 0 32.1-13 32.1-31.5v-257c.1-18.5-15.4-31.5-32-31.5zM384 400.2c0 8.6-9.1 15.8-19.8 15.8H51.8c-10.7 0-19.8-7.2-19.8-15.8V111.8c0-8.6 9.1-15.8 19.8-15.8h312.4c10.7 0 19.8 7.2 19.8 15.8v288.4zm160-15.7l-1.2-1.3L416 302.4v-92.9L544 128v256.5z" class=""></path></svg>',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Video',
      }
    });
    var block6 = this.blockManager.add('Logo', {
      id: 'Logo',
      label: '<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-icons fa-w-16"><path fill="currentColor" d="M106.66 215.41a29.89 29.89 0 0 0 42.59 0l84.66-85.62a76.63 76.63 0 0 0-5.41-112.62C199.84-6.75 156.41-4.67 128 21.38 99.66-4.73 56.22-6.86 27.47 17.19A76.7 76.7 0 0 0 22 129.8zM48 41.73a41.14 41.14 0 0 1 26.53-9.39A47.2 47.2 0 0 1 108 46.55l20 20.17 20-20.19c16.69-16.86 43-18.94 60-4.81a44.62 44.62 0 0 1 3.19 65.56l-81.72 85.64-84.69-85.61a44.71 44.71 0 0 1-12.72-33.47A44.12 44.12 0 0 1 48 41.73zM260.57 288h-48l-7.08-14.21A27.4 27.4 0 0 0 179.83 256h-71.71a27.4 27.4 0 0 0-25.66 17.75l-7 14.21h-48A27.42 27.42 0 0 0 0 315.35v169.26A27.42 27.42 0 0 0 27.43 512h233.14A27.42 27.42 0 0 0 288 484.61V315.35A27.42 27.42 0 0 0 260.57 288zM256 480H32V320h63.3l8.81-17.81 7-14.15h65.73l7.09 14.21 8.84 17.75H256zM484.62 0a24.05 24.05 0 0 0-3.93.33L343.55 23.18C330 25.44 320 38.94 320 54.86V166.8a81.36 81.36 0 0 0-32-6.47c-35.88 0-64 21.08-64 48s28.12 48 64 48 64-21.08 64-48V54.86a4.45 4.45 0 0 1 0-.65l128-21.33V135a80 80 0 0 0-32-6.65c-35.35 0-64 21.49-64 48s28.65 48 64 48 64-21.49 64-48V32c0-17.91-12.51-32-27.38-32zM288 224.33c-19.25 0-32-9.63-32-16s12.75-16 32-16 32 9.62 32 16-12.75 16-32 16zm160-32c-19.85 0-32-10.36-32-16s12.15-16 32-16 32 10.36 32 16-12.15 16-32 16zM144 336a64 64 0 1 0 64 64 64.07 64.07 0 0 0-64-64zm0 96a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm280.19-152.84a16 16 0 0 0-28.63-14.32L328 400h110.31l-52.2 88.06a16 16 0 0 0 6 21.83A15.8 15.8 0 0 0 400 512a16 16 0 0 0 13.91-8.06L493.44 368H379.75z" class=""></path></svg>',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Logo',
      }
    });
    this.filtered.push(block4);
    this.filtered.push(block5);
    this.filtered.push(block1);
    this.filtered.push(block2);
    this.filtered.push(block6);
    this.filtered.push(block3);
    this.canvasHeight = 250;

    //To set the base style of the wrapper  
    const $currentIFrame = $('iframe');
    $currentIFrame.contents().find("body").css('overflow', 'hidden');
    this.editor.getWrapper().set({ 'badgable': false, 'highlightable': false }).setStyle({
      overflow: 'hidden',
      height: '250px'
    })
    //This is to update the style in styleManager after drag end in designer mode 
    this.editor.on('stop:core:component-drag', () => { this.editor.trigger('component:toggled') });

    //Drag Event of component 
    this.editor.on('component:drag', (component) => {
      var domElement = this.editor.getSelected();

      if (domElement !== undefined && parseInt(domElement.getStyle().left) < 0) {
        var domElementStyle = this.editor.getSelected().getStyle();
        domElementStyle.left = '0px'
        this.editor.getSelected().setStyle({ ...domElementStyle });
      }
      if (domElement !== undefined && parseInt(domElement.getStyle().top) < 0) {
        var domElementStyle = this.editor.getSelected().getStyle();
        domElementStyle.top = '0px'
        this.editor.getSelected().setStyle({ ...domElementStyle });
      }
      if (domElement !== undefined && parseInt(domElement.getStyle().left) > 250) {
        var domElementStyle = this.editor.getSelected().getStyle();
        domElementStyle.left = '245px'
        this.editor.getSelected().setStyle({ ...domElementStyle });
      }
      if (domElement !== undefined && parseInt(domElement.getStyle().top) > 235) {
        var domElementStyle = this.editor.getSelected().getStyle();
        domElementStyle.top = '228px'
        this.editor.getSelected().setStyle({ ...domElementStyle });
      }
    });

    //Drag End Event of component 
    this.editor.on('component:drag:end', (component) => {
      var domElement = this.editor.getSelected().getStyle();

      //const style = window.getComputedStyle(domElement)
      const $currentIFrame = $('iframe');
      const wrapperHeight = $currentIFrame.contents().find("body #wrapper").height();

      // To check if the element is going out of canvas from bottom limit
      if (parseInt(domElement.top) > this.canvasHeight) {
        domElement.top = this.canvasHeight * 95 / 100;
        this.editor.getSelected().setStyle({ ...domElement })
      }

      // To check if the element is going out of canvas from left limit
      if (domElement !== undefined && parseInt(domElement.left) < 0) {
        domElement.left = '0px'
        this.editor.getSelected().setStyle({ ...domElement });
      }
      if (domElement !== undefined && parseInt(domElement.top) < 0) {
        domElement.top = '0px'
        this.editor.getSelected().setStyle({ ...domElement });
      }
      if (domElement !== undefined && parseInt(domElement.left) > 250) {
        domElement.left = '245px'
        this.editor.getSelected().setStyle({ ...domElement });
      }
      if (domElement !== undefined && parseInt(domElement.top) > 235) {
        domElement.top = '228px'
        this.editor.getSelected().setStyle({ ...domElement });
      }
    });
    this.editor.on('component:selected', () => {

      // whenever a component is selected in the editor
  
      // set your command and icon here
      const commandToAdd = 'tlb-setfront';
      const commandIcon = 'fa fa-clipboard';
  
      // get the selected componnet and its default toolbar
      const selectedComponent = this.editor.getSelected();
      const defaultToolbar = selectedComponent.get('toolbar');
  
      // check if this command already exists on this component toolbar
      const commandExists = defaultToolbar.some(item => item.command === commandToAdd);
  
      // if it doesn't already exist, add it
      if (!commandExists) {
        selectedComponent.set({
          toolbar: [ ...defaultToolbar, {  attributes: {class: commandIcon}, command: commandToAdd }]
        });
      }
       this.commands.add('tlb-setfront', {
         someFunction1() {
          alert('This is function 1');
         },
         run() {
           this.someFunction1();
        },
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
  ngAfterViewInit() {
    const newBlocksEl = this.blockManager.render(this.filtered, { external: true });
    this.renderer.appendChild(this.divView.nativeElement, newBlocksEl);
    const newSector = this.styleManager.render(this.customStyle, { external: true });
    this.renderer.appendChild(this.textStyle.nativeElement, newSector);
  }

  private initializeEditor(): any {
    return grapesjs.init({
      container: '#gjs',
      autorender: true,
      forceClass: false,
      plugins: [plistaAdbuilderPresetPlugin, grapesjsTabs],
      pluginsOpts: {
        grapesjsTabs: {
          // options
        }
      },
      components: '',
      style: '',
      layerManager: {
        appendTo: '#layers-container',
      },
      
      commands: {
        defaults: [
          {
            // id and run are mandatory in this case
            id: 'my-command-id',
            run() {
              alert('This is my command');
            },
          }, {
            id: '...',
            // ...
          }
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
                   { value: 'left', className: 'fa fa-align-left' },
                   { value: 'center', className: 'fa fa-align-center'},
                   { value: 'right', className: 'fa fa-align-right' },
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
 
}