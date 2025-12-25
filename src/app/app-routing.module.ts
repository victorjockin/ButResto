// modules
import { NgModule }             from '@angular/core' ;
import { RouterModule, Routes } from '@angular/router' ;

// composants
import { MenuEditionFormComponent } from './content/menu/menu-edition-form/menu-edition-form.component' ;
import { MenuViewComponent }        from './content/menu/menu-view/menu-view.component' ;
import { AddOrderFormComponent }    from './content/order/add-order-form/add-order-form.component' ;
import { MenuListComponent }        from './content/menu/menu-list/menu-list.component' ;
import { MenuOrderListComponent }   from './content/menu-order/menu-order-list/menu-order-list.component' ;
import { DebugConsoleComponent }    from './content/hidden/debug-console/debug-console.component';

// routes
const routes: Routes = [
  { path: 'menus',         component: MenuListComponent },
  { path: 'menu/new',      component: MenuEditionFormComponent },
  { path: 'menu/:id/edit', component: MenuEditionFormComponent },
  { path: 'menu/:id',      component: MenuViewComponent },
  { path: 'orders',        component: MenuOrderListComponent },
  { path: 'order/new',     component: AddOrderFormComponent },
  { path: '',              component: MenuOrderListComponent },
  { path: '12',            component: DebugConsoleComponent },
  { path: '**',            redirectTo: '', pathMatch: 'full' }
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }