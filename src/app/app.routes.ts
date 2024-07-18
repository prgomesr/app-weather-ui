import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {DetailComponent} from "./pages/home/detail/detail.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detail/:lat/:lon', component: DetailComponent},
  {path: '**', redirectTo: ''}
];
