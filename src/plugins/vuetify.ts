// src/plugins/vuetify.ts
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Création de l'instance Vuetify
export default createVuetify({
    components,
    directives,
});
