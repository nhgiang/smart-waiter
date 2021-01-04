import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { TableComponent } from '../table/table.component';
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'category',
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'table',
        component: TableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
