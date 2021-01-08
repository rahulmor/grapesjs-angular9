import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('plista-adbuilder-preset', (editor, options) => {
    // Get the Asset Manager module first
    
    editor.on('block:drag:stop', model => {
      const modal = editor.Modal;
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
  })