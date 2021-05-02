import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullDocument } from '@app/doc-editor/model/document.model';
import { DocumentStore } from '@app/doc-editor/store/document.store';

@Component({
  selector: 'essenvia-doc-history',
  templateUrl: './doc-history.component.html',
  styleUrls: ['./doc-history.component.scss'],
})
export class DocHistoryComponent implements OnInit {
  document: FullDocument;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private documentStore: DocumentStore
  ) {}

  ngOnInit(): void {
    const documentId = this.route.snapshot.params.id;
    this.document = this.documentStore.getDocumentById(documentId);

    if (!this.document) {
      alert('Invalid Document Selected!');
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
