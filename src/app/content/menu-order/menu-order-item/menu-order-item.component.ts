// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;

// objects
import { MenuOrder } from '../../../model/menu-order' ;

@Component({
  selector: 'app-menu-order-item',
  templateUrl: './menu-order-item.component.html',
  styleUrl: './menu-order-item.component.css'
})
export class MenuOrderItemComponent
{
  // attributs
  @Input() public menuOrder! : MenuOrder ;

  // évènements
  @Output() public onMarkAsServedEvent       = new EventEmitter<number>() ;
  @Output() public onCloseEvent              = new EventEmitter<number>() ;
  @Output() public onDishMarkedAsServedEvent = new EventEmitter<{
    orderId : number,
    dishId  : number
  }>() ;

  // marque une commande comme "servie"
  public onMarkAsServed(): void {
    this.onMarkAsServedEvent.emit(this.menuOrder.id) ;
  }

  // ferme la commande
  public onClose(): void {
    this.onCloseEvent.emit(this.menuOrder.id) ;
  }

  // gestion d'évènement : plat marqué comme servi
  public onDishMarkedAsServed(payload: { orderId: number, dishId: number }): void {
    this.onDishMarkedAsServedEvent.emit(payload) ;
  }
}