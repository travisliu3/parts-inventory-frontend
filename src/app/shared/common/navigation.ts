import { PartsInventoryRoutingModule } from "../../parts-inventory/parts-inventory-routing.module";
import { NavLink } from "../interface/NavLink";

export class NavigationHelper {
  public static GetNavLinks(url: string): NavLink[] {
    if (url != undefined && (url.lastIndexOf("/parts-inventory") === 0 || url === "/")) {
      return PartsInventoryRoutingModule.GetNavLinks();
    }
    return [];
  }
}
