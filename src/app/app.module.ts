import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RequestFormComponent } from './collect/request-form/request-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ConfirmationPopupComponent } from './shared/confirmation-popup/confirmation-popup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RequestFormComponent,
    LoginComponent,
    NavbarComponent,
    ConfirmationPopupComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
