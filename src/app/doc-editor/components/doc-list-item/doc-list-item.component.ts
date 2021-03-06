import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullDocument } from '@app/doc-editor/model/document.model';
import { DocumentStore } from '@app/doc-editor/store/document.store';
import {
  faPencilAlt,
  faTrashAlt,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'essenvia-doc-list-item',
  templateUrl: './doc-list-item.component.html',
  styleUrls: ['./doc-list-item.component.scss'],
})
export class DocListItemComponent implements OnInit {
  @Input() document: FullDocument;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faHistory = faHistory;

  constructor(private router: Router, private documentStore: DocumentStore) {}

  ngOnInit(): void {}

  onDocumentDelete(): void {
    if (confirm(`Do you want to delete the document ${this.document.name}?`)) {
      this.documentStore.deleteDocument(this.document._id);
    }
  }

  onDocumentUpdate(): void {
    this.router.navigate(['document', this.document._id]);
  }

  showHistory(): void {
    this.router.navigate(['document', this.document._id, 'history']);
  }
}
