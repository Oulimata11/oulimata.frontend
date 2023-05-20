import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PublicComponent } from './public/public/public.component';
import { AuthGuard } from './guard/auth/auth.guard';

const routes: Routes =  [
  { path: "", pathMatch: "full", redirectTo: "public" },
  {
    path: "home",
    component:HomeComponent, 
    children: [
      {
        path: "",
        loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)
      }
    ],
   canActivate:[AuthGuard]
  },
  {
    path: "public",
    component:PublicComponent, 
    children: [
      {
        path: "",
        loadChildren: () => import("./public/public.module").then((m) => m.PublicModule)
      }
    ],
  },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }