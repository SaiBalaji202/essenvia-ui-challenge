import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '@app/shared/UIElements/spinner/spinner.service';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Document, FullDocument } from '../model/document.model';

@Injectable()
export class DocumentStore {
  documentsSubject = new BehaviorSubject<FullDocument[]>([]);
  documents$ = this.documentsSubject.asObservable();

  constructor(private http: HttpClient, private loading: SpinnerService) {
    this.fetchDocuments().subscribe((data) => console.log(data));
  }

  // //////////////////
  // Fetch Logic
  // //////////////////
  private fetchDocuments(): Observable<FullDocument[]> {
    const documents$ = this.http
      .get<FullDocument[]>('./assets/documents.json')
      .pipe(tap((documents) => this.documentsSubject.next(documents)));
    return this.loading.spinUntilComplete(documents$);
  }

  // //////////////////
  // Store APIs
  // //////////////////

  getDocumentById(documentId: string): FullDocument {
    return this.documentsSubject
      .getValue()
      ?.find((document) => document._id === documentId);
  }

  addNewDocument(document: Partial<Document>): void {
    if (!document) {
      return;
    }

    let documents = this.documentsSubject.getValue() ?? [];
    documents = documents.concat({
      _id: uuidv4(),
      name: document.name,
      content: document.content,
      updatedBy: document.updatedBy,
      updatedDate: new Date(),
      history: [],
    });

    this.documentsSubject.next(documents);
  }

  backupAndUpdateDocument(
    documentId: string,
    document: Partial<Document>
  ): void {
    const documents = this.documentsSubject.getValue();
    if (!documents?.length) {
      return;
    }

    const idx = documents.findIndex((doc) => doc._id === documentId);
    if (idx === -1) {
      return;
    }

    const history = documents[idx].history ?? [];
    const oldDocument = {
      _id: documents[idx]._id,
      name: documents[idx].name,
      content: documents[idx].content,
      updatedBy: documents[idx].updatedBy,
      updatedDate: documents[idx].updatedDate,
    };
    history.push(oldDocument);

    documents[idx] = {
      _id: uuidv4(),
      name: document.name,
      content: document.content,
      updatedBy: document.updatedBy,
      updatedDate: new Date(),
      history,
    };

    this.documentsSubject.next(documents);
  }

  deleteDocument(documentId: string): void {
    const documents = this.documentsSubject.getValue();
    if (!documents?.length) {
      return;
    }

    const filteredDocuments = documents.filter(
      (document) => document._id !== documentId
    );
    this.documentsSubject.next(filteredDocuments);
  }
}
