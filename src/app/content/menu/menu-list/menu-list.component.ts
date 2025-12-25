// modules
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core' ;
import { forkJoin, map, of, switchMap }                       from 'rxjs' ;

// objets
import { Menu } from '../../../model/menu' ;

// énumérations
import { MenuStatus }       from '../../../enum/menu-status' ;
import { LoadingStatus }    from '../../../enum/loading-status' ;
import { Processing }       from '../../../enum/processing' ;
import { ProcessingStatus } from '../../../enum/processing-status' ;

// services
import { MenuService } from '../../../service/menu.service' ;
import { DishService } from '../../../service/dish.service' ;
import { FilteringService } from '../../../service/filtering.service' ;

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})

/**
 * Composant représentant la liste des menus.
 * 
 * Date de dernière modification :
 * - Samedi 22 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuListComponent
{
  // attributs
  public menus! : Menu[] ;

  // options
  public menuStatusFilterOptions      : MenuStatus[] = Object.values(MenuStatus) ;
  public menuCreationDateYearOptions! : string[] ;

  // filtres
  public menuStatusFilter        : MenuStatus|null = null ;
  public menuCreationDateFilter  : string|null     = null ;
  public keywords                : string          = "" ;

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

  // constructeur par défaut
  constructor(
    private changeDetectorRef : ChangeDetectorRef,
    private menuService       : MenuService,
    private dishService       : DishService,
    private filteringService  : FilteringService
  ) {}

  // initialisation de la vue
  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: (menus) => {
        this.menus = menus ;
        this.menuCreationDateYearOptions = [
          ...new Set(menus.map(menu => menu.creationDate.split('-')[0]))
        ].sort() ;
        this.loadingStatus = LoadingStatus.LOADED ;
      },
      error: () => this.loadingStatus = LoadingStatus.ERROR,
    }) ;
  }

  // complétion du chargement
  public onLoadingCompleted(): void { this.loadingStatus = LoadingStatus.SUCCESS ; }

  // accesseur : donne les menus filtrés par mots clés
  public get filteredMenus(): Menu[] {
    return this.filteringService.filterByKeywords(
      this.menus.filter(
        menu => !this.menuStatusFilter
             || menu.status == this.menuStatusFilter
      ).filter(
        menu => !this.menuCreationDateFilter
             || menu.creationDate.startsWith(this.menuCreationDateFilter)
      ),
      [ 'id', 'name', 'creationDate', 'status' ],
      this.keywords
    ) ;
  }

  // action : réinitialiser (tous) les filtres
  public onResetAllFilters(): void {
    this.menuStatusFilter       = null ;
    this.menuCreationDateFilter = null ;
    this.keywords               = "" ;
  }

  // gestion d'évènement : mise à jour du filtre sur le statut des menus
  public onUpdateMenuStatusFilter(event:MenuStatus|null): void {
    this.menuStatusFilter = event ;
  }

  // gestion d'évènement : mise à jour du filtre sur l'année de création des menus
  public onUpdateMenuCreationDateFilter(event:string|null): void {
    this.menuCreationDateFilter = event ;
  }

  // gestion d'évènement : confirmer la suppression d'un menu
  public onConfirmRemoval(event:any): void {
    this.openRemovalConfirmationDialogEvent.emit({
      title        : 'actions.confirm-removal',
      message      : {
        key    : 'content.menu.confirm-removal-message',
        params : { id: event.id, name: event.name }
      },
      confirmLabel : 'actions.remove',
      cancelLabel  : 'actions.cancel',
      data         : event
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
      switchMap(menu => this.menuService.deleteMenu(menu)),
      switchMap(() => this.menuService.getMenus())
    ).subscribe({
      next: (menus) => {
        this.menus = menus ;
        this.menuCreationDateYearOptions = [
          ...new Set(menus.map(menu => menu.creationDate.split('-')[0]))
        ].sort() ;
        this.processingStatus = ProcessingStatus.PROCESSED ;
        this.changeDetectorRef.detectChanges() ;
        setTimeout(() => {
          this.processing       = null ;
          this.processingStatus = null ;
        }, 300) ;
      },
      error: e => { this.processingStatus = ProcessingStatus.FAILED ; }
    })
  }
}