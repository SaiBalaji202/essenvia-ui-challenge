import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocEditComponent } from './pages/doc-edit/doc-edit.component';
import { DocEditorHomeComponent } from './pages/doc-editor-home/doc-editor-home.component';

const routes: Routes = [
  {
    path: '',
    component: DocEditorHomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DocListComponent,
      },
      {
        path: ':id',
        component: DocEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocEditorRoutingModule {}
