import { Component, OnInit } from '@angular/core';
import { DocumentStore } from '@app/doc-editor/store/document.store';

@Component({
  selector: 'essenvia-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss'],
})
export class DocListComponent implements OnInit {
  constructor(public documentStore: DocumentStore) {}

  ngOnInit(): void {}
}
