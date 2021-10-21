import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


//Routing
import { AppRoutingModule } from './Routes/app.routes';

//Service
import { HelperService } from './service/helper.service';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SigninComponent } from './Components/signin/signin.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  providers: [HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
