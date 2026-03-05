/**
 * FooterComponent — Pie de página
 *
 * Componente simple que muestra el footer de la aplicación.
 * Incluye el año actual dinámico para el copyright.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    /** Año actual para el texto de copyright (se actualiza automáticamente) */
    year = new Date().getFullYear();
}
