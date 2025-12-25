// modules
import { Component, Input } from '@angular/core' ;

// énumérations
import { OrderStatus } from '../../../enum/order-status' ;

@Component({
  selector: 'app-order-status-badge',
  templateUrl: './order-status-badge.component.html',
  styleUrl: './order-status-badge.component.css'
})
export class OrderStatusBadgeComponent
{
  // attributs
  @Input() public status!   : OrderStatus ;
  @Input() public servedAt! : Date|null ;
}