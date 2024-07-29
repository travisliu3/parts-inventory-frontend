import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Products } from 'src/app/shared/interface/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  displayedColumns: string[] = [
    'product_name',
    'product_id',
    'product_price',
    'product_stock',
    'product_min',
    'product_max',
  ];
  ELEMENT_DATA: Products[] = [];
  dataSource = new MatTableDataSource<Products>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.productsService.getProducts().subscribe(
      (result: any) => {
        result.forEach((element: any) => {
          this.ELEMENT_DATA.push({
            product_name: element.name,
            product_id: element.id,
            product_price: element.price,
            product_stock: element.stock,
            product_min: element.min,
            product_max: element.max,
            // product: element.product,
          });

          this.dataSource.data = this.ELEMENT_DATA;
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onRowClicked(e: Event, row: any) {
    console.log(row);
    this.router.navigate(['parts-inventory/product-details/'], {
      state: { data: row },
    });
  }

  addProduct() {
    this.router.navigate(['parts-inventory/product-details/']);
  }

  applyFilter(e: any) {
    let filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
