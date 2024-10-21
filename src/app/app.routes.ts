import { Routes } from '@angular/router';
import { CheckPriceComponent } from './pages/check-price/check-price.component';
import { publicGuard } from './security/guards/public.guard';

export const routes: Routes = [
    { path: "check-price/:id?", component: CheckPriceComponent, pathMatch: "full", canActivate: [publicGuard] },
    { path: '', redirectTo: '/check-price', pathMatch: 'full' },
    { path: '**', redirectTo: '/check-price', pathMatch: 'full' },
];
