import { Component, OnInit } from '@angular/core';
import { DocumentStore } from '@app/doc-editor/store/document.store';
import { SpinnerService } from '@app/shared/UIElements/spinner/spinner.service';

@Component({
  selector: 'essenvia-doc-editor-home',
  templateUrl: './doc-editor-home.component.html',
  styleUrls: ['./doc-editor-home.component.scss'],
})
export class DocEditorHomeComponent implements OnInit {
  constructor(public documentStore: DocumentStore) {}

  ngOnInit(): void {}
}
