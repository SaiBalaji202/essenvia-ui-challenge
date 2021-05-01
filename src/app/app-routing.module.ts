import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/document', pathMatch: 'full' },
  {
    path: 'document',
    loadChildren: () =>
      import('./doc-editor/doc-editor.module').then((m) => m.DocEditorModule),
  },
  { path: '**', redirectTo: '/document' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
