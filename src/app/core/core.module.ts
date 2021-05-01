import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [HeaderComponent],
  providers: [ErrorInterceptorProvider],
})
export class CoreModule {}
