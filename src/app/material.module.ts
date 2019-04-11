import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material';

const MODULES = [
  MatCardModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule {}
