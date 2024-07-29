import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsInventoryRoutingModule } from './parts-inventory-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './components/home/home.component';
import { PartsComponent } from './components/parts/parts.component';
import { ProductsComponent } from './components/products/products.component';
import { PartDetailsComponent } from './components/parts/part-details/part-details.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    PartsComponent,
    ProductsComponent,
    PartDetailsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    PartsInventoryRoutingModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class PartsInventoryModule { }
