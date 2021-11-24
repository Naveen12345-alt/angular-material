import { BrowserModule } from "@angular/platform-browser"

/*AJAX */
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { JwtInterceptor, ErrorInterceptor } from "./_helpers"

/* Routing */
import { AppRoutingModule } from "./app-routing.module"

import { AppComponent } from "./app.component"
import { fakeBackendProvider } from "./_helpers"

/* Angular Material */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { AngularMaterialModule } from "./angular-material.module"
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { MatTableModule } from "@angular/material/table"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout"

/* Components */
import { LogInComponent } from "./components/log-in/log-in.component"
import { RegisterComponent } from "./components/register/register.component"
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component"
import { ViewTaskComponent } from "./components/view-task/view-task.component"
import { TopNavbarComponent } from "./components/top-navbar/top-navbar.component"
import { DialogBoxComponent } from "./components/dialog-box/dialog-box.component"
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component"
import { NotificationsComponent } from "./components/notifications/notifications.component"

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ViewTaskComponent,
    TopNavbarComponent,
    DialogBoxComponent,
    ResetPasswordComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
