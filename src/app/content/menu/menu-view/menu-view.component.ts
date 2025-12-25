// modules
import { ActivatedRoute, Router }           from '@angular/router' ;
import { Component, EventEmitter, Output }  from '@angular/core' ;
import { forkJoin, map, of, switchMap }     from 'rxjs' ;

// objets
import { Dish } from '../../../model/dish' ;
import { Menu } from '../../../model/menu' ;

// énumérations
import { LoadingStatus }    from '../../../enum/loading-status' ;
import { Processing }       from '../../../enum/processing' ;
import { ProcessingStatus } from '../../../enum/processing-status' ;

// services
import { DishService } from '../../../service/dish.service' ;
import { MenuService } from '../../../service/menu.service' ;

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.css'
})

/**
 * Composant représentant la page de visualisation du détail d'un menu.
 * 
 * Date de dernière modification :
 * - Dimanche 2 mars 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuViewComponent
{
  // attributs
  public menu!          : Menu ;
  public menuDishes!    : Dish[] ;
  public dishTemplates! : Dish[] ;

  // états
  public loadingStatus    : LoadingStatus         = LoadingStatus.LOADING ;
  public processing       : Processing|null       = null ;
  public processingStatus : ProcessingStatus|null = null ;

  // évènements
  @Output() public openRemovalConfirmationDialogEvent = new EventEmitter<{
    title        : string,
    message      : any,
    confirmLabel : string,
    cancelLabel  : string,
    data         : any
  }>() ;

  // constructeur
  constructor(
    private router         : Router,
    private activatedRoute : ActivatedRoute,
    private menuService    : MenuService,
    private dishService    : DishService
  ) {}

  // initialisation de la vue
  ngOnInit(): void
  {
    const menuId = this.activatedRoute.snapshot.params['id'] ;
    forkJoin({
      menu          : this.menuService.getMenu(menuId),
      menuDishes    : this.dishService.getMenuDishes(menuId),
      dishTemplates : this.dishService.getDishTemplates()
    }).subscribe({
      next: ({ menu, menuDishes, dishTemplates }) => {
        this.menu          = menu ;
        this.menuDishes    = menuDishes ;
        this.dishTemplates = dishTemplates ;
        this.loadingStatus = LoadingStatus.LOADED ;
      },
      error: () => this.router.navigateByUrl('/')
    }) ;
  }

  // complétion du chargement
  public onLoadingCompleted(): void { this.loadingStatus = LoadingStatus.SUCCESS ; }

  // action : modifier le menu
  public onModify(): void {
    localStorage.setItem('editMenuFrom', 'menu-view') ;
    this.router.navigate(['/menu', this.menu.id, 'edit']) ;
  }

  // acction : supprimer le menu
  public onRemove(): void {
    this.openRemovalConfirmationDialogEvent.emit({
      title        : 'actions.confirm-removal',
      message      : {
        key    : 'content.menu.confirm-removal-message',
        params : { id: this.menu.id, name: this.menu.name }
      },
      confirmLabel : 'actions.remove',
      cancelLabel  : 'actions.cancel',
      data         : this.menu
    }) ;
  }

  // gestion d'évènement : supprimer un menu
  public onDelete(pMenu:Menu): void {
    const menuId = pMenu.id ;
    this.processing       = Processing.DELETE ;
    this.processingStatus = ProcessingStatus.PROCESSING ;
    forkJoin({
      menu       : this.menuService.getMenu(menuId),
      menuDishes : this.dishService.getMenuDishes(menuId)
    }).pipe(
      switchMap(({ menu, menuDishes }) => menuDishes.length
        ? forkJoin(
            menuDishes.map(dish => this.dishService.deleteDish(dish))
          ).pipe(map(() => menu))
        : of(menu)
      ),
      switchMap(menu => this.menuService.deleteMenu(menu))
    ).subscribe({
      next: (menus) => {
        this.processingStatus = ProcessingStatus.PROCESSED ;
        setTimeout(() => {
          this.processing       = null ;
          this.processingStatus = null ;
          this.router.navigateByUrl('/menus') ;
        }, 300) ;
      },
      error: e => { this.processingStatus = ProcessingStatus.FAILED ; }
    })
  }
}