import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { CheckListCardComponent } from './check-list-card/check-list-card.component';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TestComponent } from './test/test.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { MatSelectModule } from '@angular/material/select';
import { DirectoryComponent } from './directory/directory.component';
import {MatTableModule} from '@angular/material/table';
import { AppLoadModule } from '../app/appInitializer/appInitializer.module';

@NgModule({
  declarations: [
    AppComponent,
    CheckListCardComponent,
    TestComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    DirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    MatRadioModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    AppLoadModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthGuard,
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
