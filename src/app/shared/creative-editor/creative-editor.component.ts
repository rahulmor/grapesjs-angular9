import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import * as $ from 'jquery';
import grapesjsTabs from 'grapesjs-tabs';
import { FilterService } from './../../services/filter.service';
import { Subscription } from 'rxjs';
import plistaAdbuilderPresetPlugin from '../plugins/popup-plugin';
import { isArray } from 'util';
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
     var block2 = this.blockManager.add('text', {
      id: 'text',
      label: `<i class="far fa-text"></i>`,
      content: '<p>Put your title here</p>',
      attributes: {
        title: 'Insert text',
      }
    });
    var block3 = this.blockManager.add('button', {
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
      label: '<i class="far fa-video"></i>',
      content: '',
      // category: 'Ad Elements',
      attributes: {
        title: 'Video',
      }
    });
    var block6 = this.blockManager.add('Logo', {
      id: 'Logo',
      label: '<i class="far fa-icons"></i>',
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
      const commandToAdd1 = 'tlb-setfront';
      const commandIcon1 = 'fa fa-clipboard';
      const commandToAdd2 = 'tlb-setBack';
      const commandIcon2 = 'fa fa-paste';
  
      // get the selected componnet and its default toolbar


      const selectedComponent = this.editor.getSelected();
      
      const defaultToolbar = selectedComponent.get('toolbar');
  
      // check if this command already exists on this component toolbar
      const commandExists = defaultToolbar.some(item => item.command === commandToAdd1);
      const commandExistsback = defaultToolbar.some(item => item.command === commandToAdd2);
  
      // if it doesn't already exist, add it
      if (!commandExists && !commandExistsback) {
        selectedComponent.set({
          toolbar: [ ...defaultToolbar, {  attributes: {class: commandIcon1}, command: commandToAdd1 },{  attributes: {class: commandIcon2}, command: commandToAdd2 }]
        });
      }
        this.commands.add('tlb-setfront', {
          run(editor) {
            let components = editor.getSelectedAll();
            components = isArray(components) ? [...components] : [components];
            // It's important to deselect components first otherwise,
            // with undo, the component will be set with the wrong `collection`
            editor.select(null);
        
            components.forEach(component => {
              component && component.addStyle({ 'z-index': '999' });
            });
        
            return components;
          }
        });
        this.commands.add('tlb-setBack', {
          run(editor) {
            let components = editor.getSelectedAll();
            components = isArray(components) ? [...components] : [components];
            // It's important to deselect components first otherwise,
            // with undo, the component will be set with the wrong `collection`
            editor.select(null);
        
            components.forEach(component => {
              const selectedComponent1 = component.parent();
              let emailBlock = component.detach();
              console.log(selectedComponent1);
              component && component.addAttributes({ index: '0'});
            });
            return components;
          }
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
    this.renderer.appendChild(this.textStyle.nativeElement, newSector)
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
      layerManager: {
        appendTo: '#layers-container',
      },
      
      richTextEditor: {
        // options
      },
      commands: {
        defaults: [
          {
            // id and run are mandatory in this case
            id: 'tlb-setfront',
            name: 'tlb-setfront',
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
 
}