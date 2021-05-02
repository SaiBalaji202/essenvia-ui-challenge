import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '@app/shared/UIElements/spinner/spinner.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Document, FullDocument } from '../model/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentStore {
  documentsSubject = new BehaviorSubject<FullDocument[]>(null);
  documents$ = this.documentsSubject.asObservable();

  constructor(private http: HttpClient, private loading: SpinnerService) {
    this.fetchDocuments().subscribe();
  }

  // //////////////////
  // Fetch Logic
  // //////////////////
  private fetchDocuments(): Observable<FullDocument[]> {
    const documents$ = this.http
      .get<FullDocument[]>('./assets/documents.json')
      .pipe(tap((documents) => this.documentsSubject.next(documents ?? [])));
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

  getDocumentIdxById(documentId: string): number {
    return this.documentsSubject
      .getValue()
      ?.findIndex((document) => document._id === documentId);
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
    history.unshift(oldDocument);

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

  restoreHistory(documentId: string, historyId: string): void {
    const filteredDocumnetIdx = this.getDocumentIdxById(documentId);
    if (!filteredDocumnetIdx || filteredDocumnetIdx === -1 || !historyId) {
      return;
    }

    const documents = this.documentsSubject.getValue();
    const document = { ...documents[filteredDocumnetIdx] };

    const historyIdx = document.history.findIndex(
      (history) => history._id === historyId
    );
    if (historyIdx === -1) {
      return;
    }

    const documentToRestore = document.history[historyIdx];
    const backupDocument = {
      _id: document._id,
      name: document.name,
      content: document.content,
      updatedBy: document.updatedBy,
      updatedDate: document.updatedDate,
    };
    document.history.splice(historyIdx, 1);
    document.history.unshift(backupDocument);

    document._id = documentToRestore._id;
    document.name = documentToRestore.name;
    document.content = documentToRestore.content;
    document.updatedBy = documentToRestore.updatedBy;
    document.updatedDate = documentToRestore.updatedDate;

    documents[filteredDocumnetIdx] = document;
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
