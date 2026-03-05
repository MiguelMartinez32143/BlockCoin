/**
 * ScrollRevealDirective — Directiva para animar elementos al hacer scroll
 *
 * Las directivas en Angular permiten agregar comportamiento a elementos HTML.
 * Esta directiva usa el IntersectionObserver del navegador para detectar
 * cuándo un elemento se vuelve visible en la pantalla.
 *
 * USO EN TEMPLATE:
 *   <div appScrollReveal>...</div>
 *   <div appScrollReveal [revealDelay]="200">...</div>
 *
 * CONCEPTOS CLAVE:
 * - @Directive() → Decorador que define una directiva de Angular.
 * - @Input() → Permite recibir datos desde el template padre.
 * - IntersectionObserver → API del navegador que detecta visibilidad de elementos.
 * - standalone: true → La directiva se puede importar directamente sin módulos.
 */

import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
    selector: '[appScrollReveal]', // Se activa con el atributo appScrollReveal
    standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
    /**
     * Retraso opcional antes de que comience la animación (en milisegundos).
     * Útil para escalonar animaciones cuando hay varios elementos en una fila.
     */
    @Input() revealDelay = 0;

    // El observer que vigilará la visibilidad del elemento
    private observer!: IntersectionObserver;

    /**
     * ElementRef nos da acceso al elemento HTML real del DOM.
     * Angular lo inyecta automáticamente en el constructor (Inyección de Dependencias).
     */
    constructor(private el: ElementRef<HTMLElement>) { }

    /**
     * ngOnInit — Se ejecuta cuando la directiva se inicializa.
     * Aquí configuramos el observer y agregamos la clase CSS inicial.
     */
    ngOnInit(): void {
        const element = this.el.nativeElement;

        // Agregamos la clase CSS que hace el elemento invisible al inicio
        element.classList.add('scroll-reveal');

        // Si hay un retraso, lo aplicamos como transitionDelay en CSS
        if (this.revealDelay) {
            element.style.transitionDelay = `${this.revealDelay}ms`;
        }

        // Creamos un IntersectionObserver que observa cuándo el elemento
        // entra al viewport (la parte visible de la pantalla)
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // El elemento es visible → agregamos la clase que dispara la animación
                        entry.target.classList.add('revealed');
                        // Dejamos de observar (la animación solo ocurre una vez)
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 } // Se activa cuando el 15% del elemento es visible
        );

        // Empezamos a observar el elemento
        this.observer.observe(element);
    }

    /**
     * ngOnDestroy — Se ejecuta cuando el componente/directiva se destruye.
     * Desconectamos el observer para liberar memoria (buena práctica).
     */
    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
