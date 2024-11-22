import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MartialStatusPipe } from './pipes/martial-status.pipe';
import { VerifyStringPipe } from './pipes/verify-string.pipe';
import { PhoneTypePipe } from './pipes/phone-type.pipe';
import { AdressTypePipe } from './pipes/adress-type.pipe';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CpfFormatPipe } from './pipes/cpf-format.pipe';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    MartialStatusPipe,
    VerifyStringPipe,
    PhoneTypePipe,
    AdressTypePipe,
    CpfFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNgxMask({}),
    provideNativeDateAdapter(),
    {
      provide: LOCALE_ID,
      useValue: 'pt'
  },
  {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
