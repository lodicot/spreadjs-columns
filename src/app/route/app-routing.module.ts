import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QuickStartComponent} from '../quickStart/app-quickStart.component';
import {SpreadSheetsComponent} from '../spreadSheets/app-spreadSheets.component';
import {WorksheetComponent} from '../worksheet/app-worksheet.component';
import {ColumnComponent} from '../column/app-column.component';
import {DataBindComponent} from '../dataBind/app-dataBind.component';
import {StyleComponent} from '../style/app-style.component';
import {OutlineComponent} from '../outline/app-outline.component';
import {TestComponent} from '../test/test.component';
import {SelectorComponent} from '../selector/selector.component';

const routes: Routes = [
    {path: '', redirectTo: '/quick-start', pathMatch: 'full'},
    {path: 'quick-start', component: QuickStartComponent},
    {path: 'gc-spread-sheets', component: SpreadSheetsComponent},
    {path: 'gc-worksheet', component: WorksheetComponent},
    {path: 'gc-column', component: ColumnComponent},
    {path: 'data-binding', component: DataBindComponent},
    {path: 'style', component: StyleComponent},
    {path: 'outline', component: OutlineComponent},
    {path: 'test', component: TestComponent},
    {path: 'selector', component: SelectorComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
