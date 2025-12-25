// modules
import { ActivatedRoute, Router }  from '@angular/router' ;
import { Component }               from '@angular/core' ;
import { NgForm }                  from '@angular/forms' ;
import { forkJoin, of, switchMap } from 'rxjs' ;

// objets
import { Menu } from '../../../model/menu' ;
import { Dish } from '../../../model/dish' ;

// énumérations
import { LoadingStatus }    from '../../../enum/loading-status' ;
import { Processing }       from '../../../enum/processing' ;
import { ProcessingStatus } from '../../../enum/processing-status' ;
import { MenuStatus }       from '../../../enum/menu-status' ;
import { ViewMode }         from '../../../enum/view-mode' ;

// services
import { DateService } from '../../../service/date.service' ;
import { MenuService } from '../../../service/menu.service' ;
import { DishService } from '../../../service/dish.service' ;

@Component({
  selector: 'app-menu-edition-form',
  templateUrl: './menu-edition-form.component.html',
  styleUrl: './menu-edition-form.component.css'
})

/**
 * Composant représentant le formulaire d'édition d'un menu.
 * 
 * Date de dernière modification :
 * - Mercredi 19 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuEditionFormComponent
{
  // attributs
  public menu!          : Menu ;
  public menuDishes!    : Dish[] ;
  public mode!          : ViewMode ;
  public dishTemplates! : Dish[] ;

  // états
  public loadingStatus    : LoadingStatus         = LoadingStatus.LOADING ;
  public processing       : Processing|null       = null ;
  public processingStatus : ProcessingStatus|null = null ;

  // utilitaires
  public menuOriginalName! : string ;
  public from!             : string | undefined ;

  // constructeur
  constructor(
    private router         : Router,
    private activatedRoute : ActivatedRoute,
    private menuService    : MenuService,
    private dishService    : DishService,
    public  dateService    : DateService
  ) {}

  // initialisation du formulaire
  ngOnInit(): void {
    // récupération de la page source
    this.from = localStorage.getItem('editMenuFrom') || undefined ;
    localStorage.removeItem('editMenuFrom') ;
    // initialisation du menu
    const menuId = this.activatedRoute.snapshot.params['id'] ;
    if (menuId) {
      // récupération du menu à modifier
      this.mode = ViewMode.EDITION_MODE ;
      forkJoin({
        menu          : this.menuService.getMenu(menuId),
        menuDishes    : this.dishService.getMenuDishes(menuId),
        dishTemplates : this.dishService.getDishTemplates()
      }).subscribe({
        next: ({ menu, menuDishes, dishTemplates }) => {
          this.menu          = menu ;
          this.menuOriginalName      = menu.name ;
          this.menuDishes    = menuDishes ;
          this.dishTemplates = dishTemplates ;
          this.loadingStatus = LoadingStatus.LOADED ;
        },
        error: () => this.router.navigateByUrl('/')
      }) ;
    } else {
      // création d'un nouveau menu
      this.mode = ViewMode.ADDITION_MODE ;
      localStorage.removeItem('dishesToAdd') ;
      forkJoin({
        nextMenuId    : this.menuService.getNextMenuId(),
        dishTemplates : this.dishService.getDishTemplates()
      }).subscribe({
        next: ({ nextMenuId, dishTemplates }) => {
          this.menu = new Menu(
            Number(nextMenuId),
            "",
            "",
            this.dateService.getCurrentDate(),
            MenuStatus.ACTIVE
          ) ;
          this.dishTemplates = dishTemplates ;
          this.loadingStatus = LoadingStatus.LOADED ;
        },
        error: () => this.router.navigateByUrl('/')
      }) ;
    }
  }

  // complétion du chargement
  public onLoadingCompleted(): void { this.loadingStatus = LoadingStatus.SUCCESS ; }

  // action : ajouter le nouveau menu / enregistrer les modifications
  public onSaveMenu(pForm : NgForm): void {
    if (pForm.valid)
    {
      if (this.mode == ViewMode.EDITION_MODE) {
        this.processing       = Processing.UPDATE ;
        this.processingStatus = ProcessingStatus.PROCESSING ;
        // mise à jour du menu
        this.menuService.updateMenu(this.menu).subscribe({
          next: () => {
            this.processingStatus = ProcessingStatus.PROCESSED ;
            setTimeout(() => {
              this.processing       = null ;
              this.processingStatus = null ;
              this.router.navigateByUrl('/menu/'+this.menu.id) ;
            }, 300) ;
          },
          error: e => { this.processingStatus = ProcessingStatus.FAILED ; }
        })
      } else if (this.mode == ViewMode.ADDITION_MODE) {
        this.processing       = Processing.ADD ;
        this.processingStatus = ProcessingStatus.PROCESSING ;
        // récupération des plats à ajouter
        let dishesToAdd : Dish[] = JSON.parse(
          localStorage.getItem('dishesToAdd') || '[]'
        ).map((dish:any) => new Dish(0, this.menu.id, dish.name, Number(dish.calories))) ;
        // ajout du menu et de ses plats
        this.menuService.addMenu(this.menu).pipe(
          switchMap(() => {
            return dishesToAdd.length > 0 ? forkJoin(
              dishesToAdd.map(dish => this.dishService.addDish(dish))
            ) : of([]) ;
          })
        ).subscribe({
          next: () => {
            localStorage.removeItem('dishesToAdd') ;
            this.processingStatus = ProcessingStatus.PROCESSED ;
            setTimeout(() => {
              this.processing       = null ;
              this.processingStatus = null ;
              this.router.navigateByUrl('/menus') ;
            }, 300) ;
          },
          error: e => { this.processingStatus = ProcessingStatus.FAILED ; }
        }) ;  
      }
    }
  }

  // action : annuler
  public onCancel(): void {
    if (this.from == 'menu-view') {
      this.router.navigateByUrl('/menu/'+this.menu.id) ;
    } else {
      this.router.navigateByUrl('/menus') ;
    }
  }
}