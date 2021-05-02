import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessagesComponent } from './UIElements/messages/messages.component';
import { SpinnerComponent } from './UIElements/spinner/spinner.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [MessagesComponent, SpinnerComponent, SafeUrlPipe, ShortenPipe],
  imports: [CommonModule, FontAwesomeModule],
  exports: [MessagesComponent, SpinnerComponent, SafeUrlPipe, ShortenPipe],
})
export class SharedModule {}
