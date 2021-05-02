import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocEditorRoutingModule } from './doc-editor-routing.module';
import { SharedModule } from './../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DocEditorHomeComponent } from './pages/doc-editor-home/doc-editor-home.component';

import { DocumentStore } from './store/document.store';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocListItemComponent } from './components/doc-list-item/doc-list-item.component';
import { DocEditComponent } from './pages/doc-edit/doc-edit.component';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { DocHistoryComponent } from './pages/doc-history/doc-history.component';
import { DocHistoryListComponent } from './components/doc-history-list/doc-history-list.component';
import { DocHistoryListItemComponent } from './components/doc-history-list-item/doc-history-list-item.component';

@NgModule({
  declarations: [
    DocEditorHomeComponent,
    DocListComponent,
    DocListItemComponent,
    DocEditComponent,
    DocHistoryComponent,
    DocHistoryListComponent,
    DocHistoryListItemComponent,
  ],
  imports: [
    CommonModule,
    DocEditorRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxEditorModule,
    SharedModule,
  ],
})
export class DocEditorModule {}
