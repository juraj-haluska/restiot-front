import { Routes } from '@angular/router';

import { SettingsComponent } from './components/settings/settings.component';
import { AclComponent } from './components/acl/acl.component';

export const ROUTES: Routes = [
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'acl',
        component: AclComponent
    },
];
