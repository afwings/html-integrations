import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import CKEditor 4 module
import { CKEditorModule}  from 'ckeditor4-angular';

// Declare require
declare const require: any; 

// Wait until the window is load so that the CKEDITOR is loaded too
window.onload = function(e){ 
  require('@wiris/mathtype-ckeditor4/plugin');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }