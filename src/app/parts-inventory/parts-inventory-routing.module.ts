import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavLink } from '../shared/interface/NavLink';
import { HomeComponent } from './components/home/home.component';
import { PartsComponent } from './components/parts/parts.component';
import { PartDetailsComponent } from './components/parts/part-details/part-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'parts',
    component: PartsComponent,
  },
  {
    path: 'part-details',
    component: PartDetailsComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartsInventoryRoutingModule {
  public static GetNavLinks(): NavLink[] {
    return [
      {
        label: 'Home',
        link: './parts-inventory/',
        iconName: 'home',
        index: 0,
      },
      {
        label: 'Parts',
        link: 'parts-inventory/parts',
        iconName: 'inventory_1',
        index: 1,
      },
      {
        label: 'Products',
        link: 'parts-inventory/products',
        iconName: 'inventory_2',
        index: 2,
      },
      {
        label: 'Logout',
        link: './parts-inventory/logout',
        iconName: 'exit_to_app',
        index: 3,
      },
    ];
  }
}
