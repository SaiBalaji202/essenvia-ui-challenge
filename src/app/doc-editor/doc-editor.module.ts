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
import { DocumentHistoryComponent } from './pages/document-history/document-history.component';
import { NgxEditorModule } from 'ngx-editor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DocEditorHomeComponent,
    DocListComponent,
    DocListItemComponent,
    DocEditComponent,
    DocumentHistoryComponent,
  ],
  imports: [
    CommonModule,
    DocEditorRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxEditorModule,
    SharedModule,
  ],
  providers: [DocumentStore],
})
export class DocEditorModule {}
