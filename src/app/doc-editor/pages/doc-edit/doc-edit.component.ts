import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '@app/doc-editor/model/document.model';
import { DocumentStore } from '@app/doc-editor/store/document.store';
import { MessagesService } from '@app/shared/UIElements/messages/messages.service';
import { Editor, Toolbar } from 'ngx-editor';

enum FormOperation {
  ADD,
  EDIT,
}

@Component({
  selector: 'essenvia-doc-edit',
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.scss'],
})
export class DocEditComponent implements OnInit {
  // Editor Config
  editor: Editor;
  toolbar: Toolbar;

  FormOperation = FormOperation;
  formOperation: FormOperation;
  documentForm: FormGroup;
  defaultFormData: Partial<Document>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messages: MessagesService,
    private documentStore: DocumentStore
  ) {}

  ngOnInit(): void {
    this.initEditor();

    this.formOperation = this.getFormOperation();
    this.initFormData();
    this.initForm();
  }

  initEditor(): void {
    this.toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['ordered_list', 'bullet_list'],
      ['link'],
      ['text_color', 'background_color'],
    ];
    this.editor = new Editor();
  }

  initForm(): void {
    this.documentForm = new FormGroup({
      name: new FormControl(this.defaultFormData?.name, [
        Validators.required,
        Validators.minLength(5),
      ]),
      updatedBy: new FormControl(this.defaultFormData?.updatedBy, [
        Validators.required,
        Validators.minLength(3),
      ]),
      content: new FormControl(this.defaultFormData?.content, [
        Validators.required,
        this.notEmptyHtml,
      ]),
    });
  }

  initFormData(): void {
    if (this.formOperation === FormOperation.EDIT) {
      const documentId = this.route.snapshot.params.id;
      const formData = this.documentStore.getDocumentById(documentId);
      if (formData) {
        this.defaultFormData = {
          _id: formData._id,
          name: formData.name,
          content: formData.content,
          updatedBy: formData.updatedBy,
        };
      } else {
        alert('Invalid Document Selected!');
        this.goBack();
      }
    } else {
      this.defaultFormData = {
        name: null,
        content: null,
        updatedBy: null,
      };
    }
  }

  getFormOperation(): FormOperation {
    return this.route.snapshot.params.id === 'new'
      ? FormOperation.ADD
      : FormOperation.EDIT;
  }

  cancel(): void {
    if (!this.documentForm.dirty) {
      this.goBack();
    } else if (confirm('Do you want to discard your changes?')) {
      this.goBack();
    }
  }

  submit(): void {
    if (!this.documentForm.valid) {
      this.messages.showMessages('Fill the Form');
      return;
    }

    if (this.formOperation === FormOperation.ADD) {
      this.documentStore.addNewDocument(this.documentForm.value);
    } else {
      this.documentStore.backupAndUpdateDocument(
        this.defaultFormData._id,
        this.documentForm.value
      );
    }
    this.goBack();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // /////////////////////
  // Form Validators
  // /////////////////////
  notEmptyHtml(ctrl: FormControl): { [s: string]: boolean } {
    const value = ctrl?.value?.trim().toLowerCase();
    const emptyHtml = '<p></p>';
    if (value && value === emptyHtml) {
      return { emptyHtml: true };
    }
  }
}
