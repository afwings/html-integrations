import { Component, OnInit } from '@angular/core';

// Load WIRISplugins.js dynamically
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
// Load generated scripts.
document.head.appendChild(jsDemoImagesTransform);

@Component({
  selector: '#editor',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  ngOnInit() {

    // Wait until window is load so the CKEDITOR component is load too
    window.onload = function(e){

      // Add wiris plugin as an external CKEditor 4 plugin
      (window as any).CKEDITOR.plugins.addExternal('ckeditor_wiris', 'http://localhost:4200/mathtype-ckeditor4/plugin.js');
      (window as any).CKEDITOR.config.extraPlugins = 'ckeditor_wiris';

      // Replace the editor by the following configurations
      (window as any).CKEDITOR.replace('editor', {
        allowedContent: true,
        toolbar: [
          { name: 'basicstyles', items: ['Bold', 'Italic', 'Strike'] },
          { name: 'clipboard', items: ['Undo', 'Redo'] },
          { name: 'wirisplugins', items: ['ckeditor_wiris_formulaEditor', 'ckeditor_wiris_formulaEditorChemistry'] },
        ],
      });

      // Define and set the CKEditor initiañ content
      const content = '<p class="text"> Double click on the following formula to edit it.</p><p style="text-align:center;"><math><mi>z</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&PlusMinus;</mo><msqrt><msup><mi>b</mi><mn>3</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>';
      (window as any).CKEDITOR.instances.editor.setData( content );
    }
  }

  title = 'CKEditor4';
}
