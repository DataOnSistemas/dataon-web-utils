import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { HttpModule } from '../../config/http/http.module';
import { TimelineModule } from 'primeng/timeline';
import { BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import {LoadingComponent} from "../components/loading/loading.component";
import {AutoCompleteComponent} from "../components/inputs/auto-complete/auto-complete.component";
import {InputTextComponent} from "../components/inputs/input-text/input-text.component";
import {PickListModule} from "primeng/picklist";
import {DragDropModule} from "primeng/dragdrop";
import {Ripple} from "primeng/ripple";
import { TabsModule } from 'primeng/tabs';
import {DropdownComponent} from "../components/inputs/dropdown/dropdown.component";
import {InputDateComponent} from "../components/inputs/input-date/input-date.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingComponent,
    AutoCompleteComponent,
    InputTextComponent,
    DropdownComponent,
    Ripple,
    InputDateComponent
  ],
  exports: [
    NgIf,
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    SidebarModule,
    DropdownModule,
    FormsModule,
    HttpModule,
    TimelineModule,
    BarcodeScannerLivestreamModule,
    LoadingComponent,
    AutoCompleteComponent,
    InputTextComponent,
    PickListModule,
    DragDropModule,
    Ripple,
    TabsModule,
    DropdownComponent,
    InputDateComponent
  ]
})
export class SharedCommonModule { }
