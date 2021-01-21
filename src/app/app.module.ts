import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreativeEditorComponent } from './shared/creative-editor/creative-editor.component';
import { HomeComponent } from './layout/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { BasicAuthInterceptor } from '../app/auth/httpconfig.interceptor';
import { AdEditorComponent } from './layout/ad-editor/ad-editor.component';
import { FilterService } from './services/filter.service';
import { LoginService } from './services/login.service';
@NgModule({
  declarations: [
    AppComponent,
    CreativeEditorComponent,
    HomeComponent,
    HeaderComponent,
    AdEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},FilterService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
