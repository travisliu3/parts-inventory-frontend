import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/parts-inventory/services/products.service';
import { Products } from 'src/app/shared/interface/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  data: Products = {
    product_name: '',
    product_id: '',
    product_price: '',
    product_stock: '',
    product_min: '',
    product_max: '',
  };
  type: string = 'ADD';
  editForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    let rowData = navigation?.extras?.state?.['data'];
    if (rowData) {
      this.type = 'UPDATE';
      this.editForm = this.fb.group({
        id: [rowData.product_id],
        max: [rowData.product_max],
        min: [rowData.product_min],
        name: [rowData.product_name],
        price: [rowData.product_price],
        stock: [rowData.product_stock],
      });
    } else {
      this.editForm = this.fb.group({
        id: [''],
        max: [''],
        min: [''],
        name: [''],
        price: [''],
        stock: [''],
      });
    }
  }

  ngOnInit(): void {
    // this.productsService
    //   .getSelectedProduct(this.route.snapshot.paramMap.get('id'))
    //   .subscribe((data) => {
    //     this.data = data;
    //     console.log(this.data);
    //   });
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.productsService
      .registerNewProduct(this.editForm.value)
      .subscribe((data) => {
        this.router.navigate(['parts-inventory/products']);
      });
  }

  onCancel() {
    this.router.navigate(['parts-inventory/products']);
  }

  onDelete() {
    this.productsService.deleteProduct(this.editForm.value.id).subscribe();
    this.router.navigate(['parts-inventory/products']);
  }
}
