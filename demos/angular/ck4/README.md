# CKEditor integration in Angular

A simple Angular App integrating WIRIS MathType on a CKEditor 4 and step-by-step information on how to build it. The  code of this example loads a rich text editor instance with a default value.

## Requirements

* **npm** (*Currently* v6.13.4)
* **@angular/cli** (*Currently* v9.1.4)

## How to run the demo

```sh
$ npm install
$ npm run start
```

Runs the app in the development mode.<br />
Open [http://localhost:4200/](http://localhost:4200/) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## How to add MathType to CKEditor 4 from scratch

1. Run the following through the terminal

    Notice that **$APP_NAME** needs to be replaced by the name that you choose.

    ```sh
    $ ng new $APP_NAME
    $ cd $APP_NAME
    $ npm install ckeditor4-angular
    $ npm install ckeditor4
    $ npm install --save @wiris/mathtype-ckeditor4
    ```

2. Open the *src/app/app.module.ts* file and add:

    ```ts
    // Import CKEditor module for angular
    import { CKEditorModule } from 'ckeditor4-angular';

    // Declare require
    declare const require: any; 

    // Wait until the window is load so that the CKEDITOR is loaded too
    window.onload = function(e){ 
        require('@wiris/mathtype-ckeditor4/plugin');
    }
    ```
    ...
    ```ts
    @NgModule({
        ...
        imports: [... CKEditorModule, ... ],
        ...
    })
    ```

3. Open *src/app/app.component.ts* and replace all with:

    ```ts
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

    ```

    *Notice that the content can be empty or set as you prefer in the component*

4. Open *src/app/app.component.html* and leave it empty.

5. Add the following line in the angular.json, on the assets options:

    ```json
    "assets": [
        ...
        { "glob": "**/*", "input": "./node_modules/@wiris/mathtype-ckeditor4", "output": "/mathtype-ckeditor4/" },
        ...
    ],
    ```

6. Finally, you are ready to run the development server through the specified command ```ng serve```

## How to run the tests

```sh
$ npm run test
```

Execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Learn More

Checkout the [FAQ](FAQs.md) file learn more about the most frequent asked questions.

You can learn more in the [Create Angular App documentation](https://angular.io/cli/new).

To learn more about Angular, check out the [Angular documentation](https://angular.io/).

For more information about the CKEditor or it’s options, you can check their [documentation](https://ckeditor.com/docs/ckeditor4/latest/guide/dev_angular.html#customizing-ckeditor-preset-or-version).

To get more information about wiris MathType you can check on the [official documentation](http://www.wiris.com/mathtype)

## License

Copyright © 2010-2020 [WIRIS](http://www.wiris.com). Released under the [MIT License](../../../LICENSE).
