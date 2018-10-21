import { BrowserModule ,} from '@angular/platform-browser';
import { NgModule, enableProdMode} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //sidenav 
enableProdMode();

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { BoardComponent } from './board/board.component';
import { WriteComponent } from './write/write.component';
import { ContactComponent } from './contact/contact.component';


/** util */
import { DataService } from './_util/data.service'; //dataService
import { UtilService } from './_util/util.service'; //utilSerrvice
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { FooterComponent } from './footer/footer.component';

import { MaterialModule } from './material';
import { CategoryComponent } from './category/category.component';
import { FreeBoardComponent } from './free-board/free-board.component';
import { EnCategoryComponent } from './en-category/en-category.component';

/** TEST MODULE  */
import { GroupComboComponent } from './_ui/group-combo/group-combo.component'; //test
import { DropDownComponent } from './_ui/drop-down/drop-down.component';// test
import { DropDown2Component } from './_ui/drop-down2/drop-down2.component'; //test
import { GroupCombo2Component } from './_ui/group-combo2/group-combo2.component'; // test
import { TestPageComponent } from './test-page/test-page.component';
import { CategoryEditComponent } from './_common/category-edit/category-edit.component';
import { FileUploaderComponent } from './_common/file-uploader/file-uploader.component';
import { ImgDetailComponent } from './_common/img-detail/img-detail.component';






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    BoardComponent,
    WriteComponent,
    ContactComponent,
    PostComponent,
    FooterComponent,
    CategoryComponent,
    FreeBoardComponent,
    EnCategoryComponent,
    GroupComboComponent,
    TestPageComponent,
    DropDownComponent,
    DropDown2Component,
    GroupCombo2Component,
    CategoryEditComponent,
    FileUploaderComponent,
    ImgDetailComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  entryComponents:[
    CategoryEditComponent,
    ImgDetailComponent
  ],
  providers: [CookieService, DataService, UtilService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
