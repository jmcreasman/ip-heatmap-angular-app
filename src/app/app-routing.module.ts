import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapResolverService } from './map/map-resolver.service';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent, resolve: [MapResolverService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
