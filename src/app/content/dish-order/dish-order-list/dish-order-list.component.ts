// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;

// objets
import { DishOrder } from '../../../model/dish-order' ;

@Component({
  selector: 'app-dish-order-list',
  templateUrl: './dish-order-list.component.html',
  styleUrl: './dish-order-list.component.css'
})
export class DishOrderListComponent
{
  // attributs
  @Input() public orderId! : number ;
  @Input() public dishes! : DishOrder[] ;

  // évènements
  @Output() public onDishMarkedAsServedEvent = new EventEmitter<{
    orderId : number,
    dishId  : number
  }>() ;

  // gestion d'évènement : plat marqué comme servi
  public onDishMarkedAsServed(payload: { orderId: number, dishId: number }): void {
    this.onDishMarkedAsServedEvent.emit(payload) ;
  }
}