import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocEditComponent } from './pages/doc-edit/doc-edit.component';
import { DocEditorHomeComponent } from './pages/doc-editor-home/doc-editor-home.component';
import { DocHistoryComponent } from './pages/doc-history/doc-history.component';

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
        pathMatch: 'full',
        component: DocEditComponent,
      },
      {
        path: ':id/history',
        component: DocHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocEditorRoutingModule {}
