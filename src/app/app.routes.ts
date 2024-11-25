import { Routes } from '@angular/router';
import { CheckPriceComponent } from './pages/check-price/check-price.component';
import { publicGuard } from './security/guards/public.guard';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

export const routes: Routes = [
    { path: "check-price/:id?", component: CheckPriceComponent, canActivate: [publicGuard] },
    { path: "analytics", component: AnalyticsComponent, pathMatch: "full", canActivate: [publicGuard] },
    { path: '', redirectTo: '/analytics', pathMatch: 'full' },
    { path: '**', redirectTo: '/analytics', pathMatch: 'full' },
];
