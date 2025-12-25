// objets
import { Dish } from "../model/dish" ;
import { Menu } from "../model/menu" ;

// énumérations
import { MenuStatus } from "../enum/menu-status" ;

/**
 * Fonctions utilitaires de conversion d'objets.
 * 
 * Date de dernière modification :
 * - Dimanche 9 février 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */

// conversiion de données en objet de type Menu
export function toMenuObject(data:any): Menu
{
  return new Menu(
    data.id,
    data.nom,
    data.description,
    data.date_creation,
    data.statut == "actif" ? MenuStatus.ACTIVE : MenuStatus.INACTIVE
  ) ;
}

// conversion d'un objet de type Menu en données JSON API
export function toMenuData(menu:Menu): any
{
  return {
    id            : menu.id,
    nom           : menu.name,
    description   : menu.description,
    date_creation : menu.creationDate,
    statut        : menu.status == "ACTIVE" ? "actif" : "inactif"
  } ;
}

// conversion de données en objet de type Dish (plat)
export function toDishObject(data:any): Dish
{
  return new Dish(
    data.menuId ? data.id : 0,
    data.menuId || null,
    data.nom,
    data.calories || data.calories_defaut
  ) ;
}

// conversion d'un objet de type Dish (plat) en données JSON API
export function toDishData(dish:Dish): any
{
  return {
    id       : dish.id,
    menuId   : dish.menuId,
    nom      : dish.name,
    calories : dish.calories
  } ;
}