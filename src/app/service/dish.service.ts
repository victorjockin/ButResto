// modules
import { HttpClient }      from '@angular/common/http' ;
import { Injectable }      from '@angular/core' ;
import { map, Observable } from 'rxjs' ;

// environnements
import { environment } from '../../environments/environment.development' ;

// objets
import { Dish } from '../model/dish' ;

// utilitaires
import { toDishData, toDishObject } from '../utility/object-conversion' ;

@Injectable({ providedIn: 'root' })

/**
 * Service d'accès aux données des plats.
 * 
 * Date de dernière modification :
 * - Lundi 24 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class DishService
{
  // constantes
  readonly restaurantAPIUrl    = environment.restaurantAPIUrl ;
  readonly dishAPIUrl          = environment.restaurantAPIUrl+'/plats' ;
  readonly dishTemplatesAPIUrl = environment.restaurantAPIUrl+'/types_plats' ;

  // constructeur par défaut
  constructor(private httpClient : HttpClient) { }

  // accesseur : donne la liste des plats du menu dont l'id est passé en paramètre
  public getMenuDishes(pMenuId:number): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(
      this.restaurantAPIUrl+'/menus/'+pMenuId+'/plats'
    ).pipe(
      map(dishes => dishes.map(toDishObject))
    ) ;
  }

  // accesseur : donne la liste des modèles de plats
  public getDishTemplates(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(this.dishTemplatesAPIUrl).pipe(
      map(dishes => dishes.map(toDishObject))
    ) ;
  }

  // transformateur : ajoute le plat passé en paramètre à la liste des plats
  public addDish(pNewDish:Dish): Observable<Dish> {
    return this.httpClient.post<Dish>(this.dishAPIUrl, toDishData(pNewDish)).pipe(
      map(toDishObject)
    ) ;
  }

  // transformateur : met à jour le plat passé en paramètre
  public updateDish(pDish:Dish): Observable<Dish> {
    return this.httpClient.put<Dish>(this.dishAPIUrl+'/'+pDish.id, toDishData(pDish)).pipe(
      map(toDishObject)
    ) ;
  }

  // transformateur : supprime le plat passé en paramètre
  public deleteDish(pDish:Dish): Observable<Dish> {
    return this.httpClient.delete<Dish>(this.dishAPIUrl+'/'+pDish.id).pipe(
      map(toDishObject)
    ) ;
  }
}