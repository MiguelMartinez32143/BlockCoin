/**
 * HeroComponent — Sección principal (hero) con efecto parallax
 *
 * El efecto parallax hace que el fondo se mueva más lento que el contenido
 * al hacer scroll, creando una sensación de profundidad.
 *
 * CÓMO FUNCIONA:
 * 1. Escuchamos el evento de scroll con @HostListener
 * 2. Calculamos un offset: scrollY * 0.4 (el fondo se mueve al 40% de la velocidad)
 * 3. Aplicamos ese offset como translateY en el fondo via [style.transform]
 */

import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css',
})
export class HeroComponent {
    /** Offset del parallax: el fondo se desplaza a 40% de la velocidad del scroll */
    parallaxOffset = signal(0);

    @HostListener('window:scroll')
    onScroll(): void {
        // Multiplicamos scrollY por 0.4 para que el fondo se mueva más lento
        this.parallaxOffset.set(window.scrollY * 0.4);
    }

    /** Navega suavemente a una sección específica */
    scrollTo(id: string): void {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
}
