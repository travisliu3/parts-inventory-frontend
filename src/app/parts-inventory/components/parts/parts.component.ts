import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { PartsService } from '../../services/parts.service';
import { Router } from '@angular/router';
import { Parts } from 'src/app/shared/interface/Parts';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {
  displayedColumns: string[] = [
    'part_name',
    'part_id',
    'part_price',
    'part_stock',
    'part_min',
    'part_max',
  ];
  ELEMENT_DATA: Parts[] = [];
  dataSource = new MatTableDataSource<Parts>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private authService: AuthService,
    private partsService: PartsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.partsService.getParts().subscribe(
      (result: any) => {
        result.forEach((element: any) => {
          this.ELEMENT_DATA.push({
            part_name: element.name,
            part_id: element.id,
            part_price: element.price,
            part_stock: element.stock,
            part_min: element.min,
            part_max: element.max,
            companyName: element.companyName,
            machineId: element.machineId,
            product: element.product,
          });

          this.dataSource.data = this.ELEMENT_DATA;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onRowClicked(e: Event, row: any) {
    console.log(row);
    this.router.navigate(['parts-inventory/part-details/'], { state: { data: row } });
  }

  addPart() {
    this.router.navigate(['parts-inventory/part-details/']);
  }

  applyFilter(e: any) {
    let filterValue = e.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
