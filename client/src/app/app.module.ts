import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserRoutingModule } from './user/user-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './shared/services/auth.interseptor';
import { GlobalErrorInterceptor } from './shared/services/global-error.interceptor';


import { RfpModule } from './rfp/rfp.module';
import { RfpRoutingModule } from './rfp/rfp-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    UserModule,
    AppRoutingModule,
    UserRoutingModule,
    RfpRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,

    RfpModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
