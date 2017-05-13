import { Routes } from '@angular/router';

import { SettingsComponent } from './components/settings/settings.component';
import { AclComponent } from './components/acl/acl.component';
import { LedsComponent } from './components/leds/leds.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { FilesComponent } from './components/files/files.component';

export const ROUTES: Routes = [
    {
        path: 'leds',
        component: LedsComponent
    },
    {
        path: 'sensors',
        component: SensorsComponent
    },
    {
        path: 'files',
        component: FilesComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'acl',
        component: AclComponent
    },
];
