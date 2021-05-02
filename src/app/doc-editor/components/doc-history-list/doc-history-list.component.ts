import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullDocument } from '@app/doc-editor/model/document.model';
import { DocumentStore } from '@app/doc-editor/store/document.store';
import { MessagesService } from '@app/shared/UIElements/messages/messages.service';

@Component({
  selector: 'essenvia-doc-history-list',
  templateUrl: './doc-history-list.component.html',
  styleUrls: ['./doc-history-list.component.scss'],
})
export class DocHistoryListComponent implements OnInit {
  @Input() documentId: string;
  document: FullDocument;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public documentStore: DocumentStore
  ) {}

  ngOnInit(): void {
    this.document = this.documentStore.getDocumentById(this.documentId);
  }

  restoreHistory(restoreHistoryId: string): void {
    if (
      confirm(
        'Do you want to restore the content to the selected previous version?'
      )
    ) {
      this.documentStore.restoreHistory(this.documentId, restoreHistoryId);
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
