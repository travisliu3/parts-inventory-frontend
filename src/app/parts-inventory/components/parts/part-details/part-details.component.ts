import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartsService } from 'src/app/parts-inventory/services/parts.service';
import { ProductsService } from 'src/app/parts-inventory/services/products.service';
import { Parts } from 'src/app/shared/interface/Parts';
import { Products } from 'src/app/shared/interface/Product';

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss'],
})
export class PartDetailsComponent implements OnInit {
  data: Parts = {
    part_name: '',
    part_id: '',
    part_price: '',
    part_stock: '',
    part_min: '',
    part_max: '',
    machineId: '',
    companyName: '',
    product: {
      product_name: '',
      product_id: '',
      product_price: '',
      product_stock: '',
      product_min: '',
      product_max: '',
    },
  };
  // type: string = 'ADD';
  products: { id: any; name: string }[] = [];
  editForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private partsService: PartsService,
    private productsService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    let rowData = navigation?.extras?.state?.['data'];
    this.productsService.getProducts().subscribe((data: any) => {
      data.forEach((element: { id: any; name: string }) => {
        this.products.push({ name: element.name, id: element.id });
      });

      // Find the product to pre-select
      const selectedProduct = this.products.find(
        (product) => product.name === rowData.product?.name
      );
      console.log('Selected Product:', selectedProduct);

      if (rowData) {
        this.editForm = this.fb.group({
          id: [rowData.part_id],
          max: [rowData.part_max],
          min: [rowData.part_min],
          name: [rowData.part_name],
          price: [rowData.part_price],
          stock: [rowData.part_stock],
          type: [rowData.machineId ? 'InHouse' : 'Outsourced'],
          machineId: [rowData.machineId],
          companyName: [rowData.companyName],
          product: [selectedProduct],
        });
      } else {
        this.editForm = this.fb.group({
          id: [''],
          max: [''],
          min: [''],
          name: [''],
          price: [''],
          stock: [''],
          product: [''],
          type: [''],
          machineId: [''],
          companyName: [''],
        });
      }
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.editForm.value.type == 'InHouse') {
      this.partsService
        .registerNewInHousePart(this.editForm.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['parts-inventory/parts']);
        });
    } else if (this.editForm.value.type == 'Outsourced') {
      this.partsService
        .registerNewOutsourcedPart(this.editForm.value)
        .subscribe((data) => {
          this.router.navigate(['parts-inventory/parts']);
        });
    } else {
      this.partsService
        .registerNewPart(this.editForm.value)
        .subscribe((data) => {
          this.router.navigate(['parts-inventory/parts']);
        });
    }
    if (this.editForm.value.product.id) {
      this.partsService
        .registerAssociatedProduct(
          this.editForm.value.product.id,
          this.editForm.value.id
        )
        .subscribe();
    }
  }

  onCancel() {
    this.router.navigate(['parts-inventory/parts']);
  }

  deletePart() {
    this.partsService.deletePart(this.editForm.value.id).subscribe();
    this.router.navigate(['parts-inventory/parts']);
  }
}
