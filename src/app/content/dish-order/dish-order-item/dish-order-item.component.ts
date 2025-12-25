// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;

// objets
import { DishOrder } from '../../../model/dish-order' ;

@Component({
  selector: 'app-dish-order-item',
  templateUrl: './dish-order-item.component.html',
  styleUrl: './dish-order-item.component.css'
})
export class DishOrderItemComponent
{
  // attributs
  @Input() public dishOrder! : DishOrder ;
  @Input() public orderId!   : number ;

  // évènements
  @Output() public onMarkAsServedEvent = new EventEmitter<{
    orderId : number,
    dishId  : number
  }>() ;

  // marque la plat comme "servi"
  public onMarkAsServed(): void {
    this.onMarkAsServedEvent.emit({
      orderId : this.orderId,
      dishId  : this.dishOrder.id
    }) ;
  }
}