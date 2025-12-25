// modules
import { HttpClient } from '@angular/common/http' ;
import { Injectable } from '@angular/core' ;

// environnements
import { environment }      from '../../environments/environment.development' ;
import { map, Observable }  from 'rxjs' ;

// classes
import { Menu } from '../model/menu' ;

// utilitaires
import { toMenuData, toMenuObject } from '../utility/object-conversion' ;

@Injectable({ providedIn: 'root' })

/**
 * Service d'accès aux données des menus.
 * 
 * Date de dernière modification :
 * - Mercredi 12 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuService
{
  // constantes
  readonly menuAPIUrl = environment.restaurantAPIUrl+'/menus' ;

  // constructeur par défaut
  constructor(private httpClient : HttpClient) { }

  // accesseur : donne la liste des menus
  public getMenus(): Observable<Menu[]>
  {
    return this.httpClient.get<Menu[]>(this.menuAPIUrl).pipe(
      map(menus => menus.map(toMenuObject))
    ) ;
  }

  // accesseur : donne le menu associé à l'id passé en paramètre
  public getMenu(pId:number): Observable<Menu>
  {
    return this.httpClient.get<Menu>(this.menuAPIUrl+'/'+pId).pipe(
      map(toMenuObject)
    ) ;
  }

  // accesseur : donne l'id du prochain menu à ajouter
  public getNextMenuId(): Observable<number>
  {
    return this.httpClient.get<Menu[]>(this.menuAPIUrl).pipe(
      map(menus => menus.length > 0 ? Math.max(...menus.map(m => m.id))+1 : 1)
    ) ;
  }

  // transformateur : ajoute le menu passé en paramètre à la liste des menus
  public addMenu(pNewMenu:Menu): Observable<Menu>
  {
    return this.httpClient.post<Menu>(this.menuAPIUrl, toMenuData(pNewMenu)).pipe(
      map(toMenuObject)
    ) ;
  }

  // transformateur : met à jour le menu passé en paramètre
  public updateMenu(pMenu:Menu): Observable<Menu>
  {
    return this.httpClient.put<Menu>(this.menuAPIUrl+'/'+pMenu.id, toMenuData(pMenu)).pipe(
      map(toMenuObject)
    ) ;
  }

  // transformateur : supprime le menu passé en paramètre
  public deleteMenu(pMenu:Menu): Observable<Menu>
  {
    return this.httpClient.delete<Menu>(this.menuAPIUrl+'/'+pMenu.id).pipe(
      map(toMenuObject)
    ) ;
  }
}