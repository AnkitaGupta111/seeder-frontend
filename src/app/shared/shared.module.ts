import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridContainerDirective } from './directives/gridContainer.directive';
import { GridItemDirective } from './directives/grid-item.directive';
import { HeaderContentComponent } from './components/header-content/header-content.component';
import { TableComponent } from './components/table/table.component';
import { KeyValueComponent } from './components/key-value/key-value.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SummaryTileComponent } from './components/summary-tile/summary-tile.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GridContainerDirective,
    GridItemDirective,
    HeaderContentComponent,
    TableComponent,
    KeyValueComponent,
    DialogComponent,
    SummaryTileComponent
  ],
  exports: [GridContainerDirective, GridItemDirective, HeaderContentComponent, TableComponent, KeyValueComponent, DialogComponent, SummaryTileComponent
  ]
})
export class SharedModule { }

