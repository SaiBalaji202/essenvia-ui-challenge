import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '@app/doc-editor/model/document.model';
import { DocumentStore } from '@app/doc-editor/store/document.store';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'essenvia-doc-history-list-item',
  templateUrl: './doc-history-list-item.component.html',
  styleUrls: ['./doc-history-list-item.component.scss'],
})
export class DocHistoryListItemComponent implements OnInit, OnDestroy {
  faArrowAltCircleUp = faArrowAltCircleUp;
  @Input() history: Document;
  @Output() historyRestore = new EventEmitter<string>();

  editor: Editor;

  constructor() {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor.setContent(this.history.content);
  }

  onRestore(): void {
    this.historyRestore.emit(this.history._id);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
