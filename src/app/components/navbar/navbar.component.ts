/**
 * NavbarComponent — Barra de navegación fija (sticky)
 *
 * Este componente implementa una barra de navegación que:
 * - Se fija en la parte superior de la pantalla (position: fixed)
 * - Cambia de estilo al hacer scroll (fondo transparente → fondo oscuro)
 * - Incluye un menú hamburguesa para dispositivos móviles
 *
 * CONCEPTOS CLAVE:
 * - @HostListener('window:scroll') → Decorador que escucha eventos del navegador.
 *   Cada vez que el usuario hace scroll, se ejecuta la función decorada.
 * - signal() → Estado reactivo. Cuando cambia, Angular actualiza la vista automáticamente.
 * - scrollIntoView() → Método nativo que desplaza suavemente hacia un elemento del DOM.
 */

import { Component, HostListener, signal } from '@angular/core';

@Component({
    selector: 'app-navbar',       // Etiqueta HTML: <app-navbar></app-navbar>
    standalone: true,              // No requiere un NgModule
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    /** Indica si el usuario ha hecho scroll más de 50px */
    isScrolled = signal(false);

    /** Controla si el menú móvil está abierto o cerrado */
    mobileMenuOpen = signal(false);

    /**
     * Se ejecuta cada vez que el usuario hace scroll.
     * Si el scroll supera 50px, activamos el estilo "scrolled" del navbar.
     */
    @HostListener('window:scroll')
    onScroll(): void {
        this.isScrolled.set(window.scrollY > 50);
    }

    /** Alterna (toggle) el menú móvil entre abierto y cerrado */
    toggleMenu(): void {
        // update() recibe el valor anterior y devuelve el nuevo
        this.mobileMenuOpen.update(v => !v);
    }

    /**
     * Navega suavemente hacia una sección de la página.
     * @param id — El id del elemento HTML al que queremos ir (ej: 'market', 'chart')
     */
    scrollTo(id: string): void {
        this.mobileMenuOpen.set(false); // Cerramos el menú móvil
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
}
