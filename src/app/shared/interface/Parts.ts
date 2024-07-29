import { Products } from './Product';

export interface Parts {
  part_name: string;
  part_id: string;
  part_price: string;
  part_stock: string;
  part_min: string;
  part_max: string;
  machineId: string;
  companyName: string;
  product: Products;
}
