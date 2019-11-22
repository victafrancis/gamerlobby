import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-player' },
  { path: 'edit-player/:id', component: EditPlayerComponent },
  { path: 'add-player', component: AddPlayerComponent },
  { path: 'players-list', component: PlayersListComponent },
  { path: 'admin-home', component: AdminHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
