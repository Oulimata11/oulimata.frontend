import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ErrorComponent } from './public/error/error.component';
import { AuthGuard } from './service/controleur/auth.guard';
import { CoreThemeCustomizerModule } from '@core/components';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/public',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component:HomeComponent,
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),canActivate:[AuthGuard]
    },
    {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled', // Add options right here
            relativeLinkResolution: 'legacy',
            useHash: true
        }),
        CoreThemeCustomizerModule,

    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
