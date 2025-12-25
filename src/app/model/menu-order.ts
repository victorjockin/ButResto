// énumérations
import { OrderStatus } from "../enum/order-status" ;

// objets
import { DishOrder } from "./dish-order" ;

/**
 * Classe modèle représentant une commande de menu.
 * 
 * Date de dernière modification :
 * - Lundi 12 mai 2025 -
 * 
 * @author Victor Jockin
 * Groupe 2B, BUT2
 */
export class MenuOrder
{
  // constructeur et attributs
  constructor(
    public id        : number      = 0,
    public menuId    : number      = 0,
    public menuName  : string      = "",
    public orderedAt : Date        = new Date(),
    public status    : OrderStatus = OrderStatus.NOT_SERVED,
    public dishes    : DishOrder[] = []
  ) {}
}