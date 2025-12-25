// modules
import { AppRoutingModule }         from './app-routing.module' ;
import { AppComponent }             from './app.component' ;
import { NgModule }                 from '@angular/core' ;
import { BrowserModule }            from '@angular/platform-browser' ;
import { FormsModule }              from '@angular/forms' ;
import { HttpClientModule }         from '@angular/common/http' ;

// composants
import { MenuListComponent }  from './content/menu/menu-list/menu-list.component' ;
import { MenuItemComponent }  from './content/menu/menu-item/menu-item.component' ;
import { FooterComponent }    from './include/footer/footer.component' ;

// pipes
import { FormattedDatePipe }            from './pipe/formated-date.pipe' ;
import { HeaderComponent }              from './include/header/header.component' ;
import { ItemListAutoWidthsDirective }  from './directive/auto-width.directive' ;
import { MenuStatusBadgeComponent }     from './content/menu/menu-status-badge/menu-status-badge.component' ;
import { HeroComponent }                from './content/hero/hero.component' ;
import { MenuEditionFormComponent }     from './content/menu/menu-edition-form/menu-edition-form.component';
import { LoadingPopUpComponent }        from './pop-up/loading-pop-up/loading-pop-up.component';
import { DishListComponent } from './content/dish/dish-list/dish-list.component';
import { DishItemComponent } from './content/dish/dish-item/dish-item.component';
import { MenuViewComponent } from './content/menu/menu-view/menu-view.component';
import { ProcessingPopUpComponent } from './pop-up/processing-pop-up/processing-pop-up.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { DishTemplateListComponent } from './content/dish-template/dish-template-list/dish-template-list.component';
import { DishTemplateSuggestionComponent } from './content/dish-template/dish-template-suggestion/dish-template-suggestion.component';
import { SplitForHighlightPipe } from './pipe/split-for-highlight.pipe';
import { DropDownMenuComponent } from './ui/drop-down-menu/drop-down-menu.component';
import { TranslatePipe } from './pipe/translate.pipe';
import { MenuOrderItemComponent } from './content/menu-order/menu-order-item/menu-order-item.component';
import { MenuOrderListComponent } from './content/menu-order/menu-order-list/menu-order-list.component';
import { OrderStatusBadgeComponent } from './content/order/order-status-badge/order-status-badge.component';
import { AddOrderFormComponent } from './content/order/add-order-form/add-order-form.component';
import { DishOrderItemComponent } from './content/dish-order/dish-order-item/dish-order-item.component';
import { DishOrderListComponent } from './content/dish-order/dish-order-list/dish-order-list.component';
import { MenuOrderIdBadgeComponent } from './content/menu-order/menu-order-id-badge/menu-order-id-badge.component';
import { DebugConsoleComponent } from './content/hidden/debug-console/debug-console.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuListComponent,
    MenuItemComponent,
    FormattedDatePipe,
    FooterComponent,
    HeaderComponent,
    ItemListAutoWidthsDirective,
    MenuStatusBadgeComponent,
    HeroComponent,
    MenuEditionFormComponent,
    LoadingPopUpComponent,
    DishListComponent,
    DishItemComponent,
    MenuViewComponent,
    ProcessingPopUpComponent,
    ConfirmationDialogComponent,
    DishTemplateListComponent,
    DishTemplateSuggestionComponent,
    SplitForHighlightPipe,
    DropDownMenuComponent,
    TranslatePipe,
    MenuOrderItemComponent,
    MenuOrderListComponent,
    OrderStatusBadgeComponent,
    AddOrderFormComponent,
    DishOrderItemComponent,
    DishOrderListComponent,
    MenuOrderIdBadgeComponent,
    DebugConsoleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }