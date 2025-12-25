// modules
import { Component, EventEmitter, Input, Output } from '@angular/core' ;
import { ActivatedRoute }                         from '@angular/router' ;
import { switchMap }                              from 'rxjs' ;

// objets
import { Dish } from '../../../model/dish' ;

// services
import { DishService } from '../../../service/dish.service' ;
import { FilteringService } from '../../../service/filtering.service' ;

// énumérations
import { Processing }       from '../../../enum/processing' ;
import { ProcessingStatus } from '../../../enum/processing-status' ;

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.css'
})

/**
 * Composant représentant la liste des plats d'un menu.
 * 
 * Date de dernière modification :
 * - Vendredi 28 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishListComponent
{
  // attributs récupérés
  @Input() public dishes        : Dish[] = [] ;
  @Input() public dishTemplates : Dish[] = [] ;

  public dishTemplatesFilter! : string ;
  public newDish              : Dish = new Dish() ;

  // attributs calculés
  public menuCalories!        : number ;
  public menuCaloriesPerDish! : number ;

  // états
  public processing        : Processing|null       = null ;
  public processingStatus  : ProcessingStatus|null = null ;
  public addingDish        : boolean               = false ;

  // évènements
  @Output() public processingCompletedEvent = new EventEmitter<void>() ;

  // constructeur
  constructor(
    private activatedRoute   : ActivatedRoute,
    private dishService      : DishService,
    private filteringService : FilteringService
  ) {}

  // initialisation de la vue
  ngOnInit(): void {
    this.calculateCalories() ;
  }

  // accesseur : donne les modèles de plats filtrés en fonction de la saisie du nom de plat
  // (cf. dish-item)
  public get filteredDishTemplates(): Dish[] {
    return this.filteringService.filterByKeywords(
      this.dishTemplates,
      [ 'name' ],
      this.dishTemplatesFilter
    ) ;
  }

  // action : ajouter un plat
  public onAddDish(): void {
    this.addingDish          = true ;
    this.newDish             = new Dish() ;
    this.dishTemplatesFilter = '' ;
  }

  // gestion d'évènement : selection d'un modèle de plat
  public onDishTemplateSelected(dishTemplate: Dish): void {
    this.newDish             = {...dishTemplate} ;
    this.dishTemplatesFilter = '' ;
  }

  // gestion d'évènement : réalisation d'un traitement
  public onProcessing(event : { processing : Processing, dish : Dish }): void {
    this.processing = event.processing ;
    this.processingStatus = ProcessingStatus.PROCESSING ;
    const menuId = this.activatedRoute.snapshot.params['id'] ;
    let observableAction ;
    switch (event.processing) {
      case Processing.ADD    : observableAction = this.dishService.addDish(event.dish) ;    break ;
      case Processing.UPDATE : observableAction = this.dishService.updateDish(event.dish) ; break ;
      case Processing.DELETE : observableAction = this.dishService.deleteDish(event.dish) ; break ;
    }
    observableAction.pipe(
      switchMap(() => this.dishService.getMenuDishes(menuId))
    ).subscribe({
      next: dishes => {
        this.dishes = dishes ;
        this.calculateCalories() ;
        this.addingDish = false ;
        this.processingStatus = ProcessingStatus.PROCESSED ;
        this.processingCompletedEvent.emit() ;
        setTimeout(() => {
          this.processing       = null ;
          this.processingStatus = null ;
        }, 300) ;
      },
      error: e => { this.processingStatus = ProcessingStatus.FAILED ; }
    }) ;
  }
  
  // met à jour la liste des plats à ajouter
  public onUpdateDishesToAdd(): void {
    this.dishes = JSON.parse(
      localStorage.getItem('dishesToAdd') || '[]'
    ).map((dish:any) => new Dish(dish.tmpId, 0, dish.name, Number(dish.calories))) ;
    this.calculateCalories() ;
  }

  // calcule le nombre de calories moyen par plat et le nombre total de calories du menu
  private calculateCalories(): void {
    this.menuCalories         = this.dishes.reduce((sum, dish) => sum + dish.calories, 0) ;
    this.menuCaloriesPerDish  = this.dishes.length ? Math.ceil(this.menuCalories/this.dishes.length) : 0 ;
  }
}