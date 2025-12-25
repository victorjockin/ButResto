// modules
import { Router }    from '@angular/router' ;
import { Component } from '@angular/core' ;
import { map }       from 'rxjs' ;

// objets
import { Menu }      from '../../../model/menu' ;
import { DishOrder } from '../../../model/dish-order' ;

// énumérations
import { LoadingStatus }    from '../../../enum/loading-status' ;
import { MenuStatus }       from '../../../enum/menu-status' ;
import { OrderStatus }      from '../../../enum/order-status' ;
import { Processing }       from '../../../enum/processing' ;
import { ProcessingStatus } from '../../../enum/processing-status' ;

// services
import { DishService } from '../../../service/dish.service' ;
import { MenuService } from '../../../service/menu.service' ;

@Component({
  selector: 'app-add-order-form',
  templateUrl: './add-order-form.component.html',
  styleUrl: './add-order-form.component.css'
})

/**
 * Formulaire d'ajout d'une commande.
 * 
 * Date de dernière modification :
 * - Dimanche 18 mai 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class AddOrderFormComponent
{
  // attributs
  public menus!       : Menu[] ;
  public selectedMenu : Menu|null = null ;

  // états
  public loadingStatus    : LoadingStatus = LoadingStatus.LOADING ;
  public processing       : Processing|null       = null ;
  public processingStatus : ProcessingStatus|null = null ;

  // utilitaires
  public from! : string|undefined ;

  // constructeur
  constructor (
    private router         : Router,
    private menuService    : MenuService,
    private dishService    : DishService
  ) {}

  // initialisation de la vue
  ngOnInit(): void {
    // récupération de la page source
    this.from = localStorage.getItem('addOrderFrom') || undefined ;
    localStorage.removeItem('addOrderFrom') ;
    // récupération des menus
    this.menuService.getMenus().pipe(
      map(menu => menu.filter(menu => menu.status == MenuStatus.ACTIVE))
    ).subscribe({
      next: menus => {
        this.menus = menus ;
        this.loadingStatus = LoadingStatus.LOADED ;
      },
      error: () => this.loadingStatus = LoadingStatus.ERROR
    }) ;
  }

  // complétion du chargement
  public onLoadingCompleted(): void {
    this.loadingStatus = LoadingStatus.SUCCESS ;
  }

  // indique si un menu est sélectionné
  public isAMenuSelected(): boolean {
    return this.selectedMenu != null ;
  }

  // gestion d'évènement : sélection d'un menu
  public onMenuSelected(menu: Menu): void {
    this.selectedMenu = menu ;
  }

  // action : ajouter la commande
  public onAdd(): void {
    if (!this.selectedMenu) return ;
    this.processing       = Processing.ADD ;
    this.processingStatus = ProcessingStatus.PROCESSING ;
    this.dishService.getMenuDishes(this.selectedMenu.id).subscribe(menuDishes => {
      // récupération des plats du menu sélectionné
      const dishes = menuDishes.map(dish => new DishOrder(dish.id, dish.name)) ;
      // récupération des commandes
      const orders = JSON.parse(localStorage.getItem('orders') || '[]') ;
      // calcul du numéro de la commande à ajouter
      const nextId = orders.length > 0
        ? Math.max(...orders.map((order: any) => order.id)) + 1
        : 1 ;
      // création de la commande
      const newOrder = {
        id        : nextId,
        menuId    : this.selectedMenu?.id,
        menuName  : this.selectedMenu?.name,
        orderedAt : new Date().toISOString(),
        status    : OrderStatus.NOT_SERVED,
        dishes    : dishes
      } ;
      // mise à jour des commandes
      orders.push(newOrder) ;
      localStorage.setItem('orders', JSON.stringify(orders)) ;
      localStorage.removeItem('selectedMenu') ;
      this.processingStatus = ProcessingStatus.PROCESSED ;
      setTimeout(() => {
        this.processing       = null ;
        this.processingStatus = null ;
        // redirection vers la liste des commandes
        if (this.from == 'orders') {
          this.router.navigateByUrl('/orders') ;
        } else {
          this.router.navigateByUrl('/') ;
        }
      }, 300) ;
    }) ;
  }

  // action : annuler
  public onCancel(): void {
    localStorage.removeItem('selectedMenu') ;
    if (this.from == 'orders') {
      this.router.navigateByUrl('/orders') ;
    } else {
      this.router.navigateByUrl('/') ;
    }
  }
}