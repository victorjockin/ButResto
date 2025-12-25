// modules
import { Component, Input } from '@angular/core' ;

@Component({
  selector: 'app-menu-order-id-badge',
  templateUrl: './menu-order-id-badge.component.html',
  styleUrl: './menu-order-id-badge.component.css'
})
export class MenuOrderIdBadgeComponent
{
  // attributs
  @Input() public id! : number ;
}