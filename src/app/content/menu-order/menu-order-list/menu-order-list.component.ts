// modules
import { Component } from '@angular/core' ;
import { Router } from '@angular/router' ;

// énumérations
import { OrderStatus } from '../../../enum/order-status' ;

// objets
import { DishOrder } from '../../../model/dish-order' ;
import { MenuOrder } from '../../../model/menu-order' ;

@Component({
  selector: 'app-menu-order-list',
  templateUrl: './menu-order-list.component.html',
  styleUrl: './menu-order-list.component.css',
})
export class MenuOrderListComponent
{
  // attributs
  public orders! : MenuOrder[] ;

  // constructeur
  constructor(private router : Router) {}

  // initialisation de la vue
  public ngOnInit(): void {
    this.orders = JSON.parse(
      localStorage.getItem('orders') || '[]'
    ).map((menuOrder:any) =>
      new MenuOrder(
        menuOrder.id,
        menuOrder.menuId,
        menuOrder.menuName,
        new Date(menuOrder.orderedAt),
        OrderStatus[menuOrder.status as keyof typeof OrderStatus],
        menuOrder.dishes?.map(
          (dishOrder:any) => new DishOrder(
            dishOrder.id,
            dishOrder.dishName,
            dishOrder.servedAt,
            OrderStatus[dishOrder.status as keyof typeof OrderStatus]
          )
        ) || []
      )
    ).sort((mo1: MenuOrder, mo2: MenuOrder) => {
      return mo1.orderedAt.getTime() - mo2.orderedAt.getTime()
    }) ;
  }

  // accesseur : donne les commandes à servir
  public get ordersToServe(): MenuOrder[] {
    return this.orders.filter(o => o.status != OrderStatus.SERVED) ;
  }

  // accesseur : donne les commandes servies
  public get ordersServed(): MenuOrder[] {
    return this.orders.filter(o => o.status == OrderStatus.SERVED) ;
  }

  // action : ajouter une nouvelle commande
  public onAddANewOrder(): void {
    localStorage.setItem('addOrderFrom', this.router.url == '/orders' ? 'orders' : 'home') ;
    this.router.navigateByUrl('/order/new') ;
  }

  // action : nettoyer la liste des commandes à servir
  public onClearOrdersToServe(): void {
    this.orders = this.orders.filter(o => o.status == OrderStatus.SERVED) ;
    this.saveOrdders() ;
  }

  // action : nettoyer la liste des commandes servies
  public onClearOrdersServed(): void {
    this.orders = this.orders.filter(o => o.status != OrderStatus.SERVED) ;
    this.saveOrdders() ;
  }

  // gestion d'évènement : plat marqué comme "servi" dans un menu
  public onDishMarkedAsServed(payload: { orderId: number, dishId: number }): void {
    const order = this.orders.find(o => o.id == payload.orderId) ;
    if (order) {
      const dish = order.dishes.find(d => d.id == payload.dishId) ;
      if (dish) {
        // mise à jour du statut du plat
        dish.status = OrderStatus.SERVED ;
        dish.servedAt = new Date() ;
        // mise à jour éventuelle du statut de la commande
        if (order.dishes.every(d => d.status == OrderStatus.SERVED)) {
          order.status = OrderStatus.SERVED ;
        }
        // mise à jour des commandes
        localStorage.setItem('orders', JSON.stringify(this.orders)) ;
      }
    }
  }

  // gestion d'évènement : commande marquée comme "servie"
  public onOrderMarkedAsServed(orderId: number): void {
    const order = this.orders.find(o => o.id == orderId) ;
    if (order) {
      // mise à jour du statut de la commande
      order.status = OrderStatus.SERVED ;
      // mise à jour du statut des plats du menu
      order.dishes.forEach(dish => {
        dish.status = OrderStatus.SERVED ;
        dish.servedAt = new Date() ;
      }) ;
      // mise à jour des commandes
      localStorage.setItem('orders', JSON.stringify(this.orders)) ;
    }
  }

  // gestion d'évènement : fermeture d'une commande
  public onOrderClosed(orderId: number): void {
    this.orders = this.orders.filter(order => order.id !== orderId) ;
    this.saveOrdders() ;
  }

  // méthode privée : enregistre les commandes dans le localstorage
  private saveOrdders(): void {
    localStorage.setItem('orders', JSON.stringify(
      this.orders.map(menuOrder => ({
        id        : menuOrder.id,
        menuId    : menuOrder.menuId,
        menuName  : menuOrder.menuName,
        orderedAt : menuOrder.orderedAt.toISOString(),
        status    : menuOrder.status,
        dishes    : menuOrder.dishes.map(dishOrder => ({
          id       : dishOrder.id,
          dishName : dishOrder.dishName,
          servedAt : dishOrder.servedAt,
          status   : dishOrder.status
        }))
      }))
    )) ;
  }
}