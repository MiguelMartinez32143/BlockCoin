/**
 * CountUpDirective — Directiva para animar números (de 0 al valor objetivo)
 *
 * Crea una animación tipo "contador" que incrementa un número suavemente
 * desde 0 hasta el valor deseado. Se activa cuando el elemento se hace
 * visible en la pantalla (usando IntersectionObserver).
 *
 * USO EN TEMPLATE:
 *   <span [appCountUp]="2540" countPrefix="$" countSuffix="B"></span>
 *   <span [appCountUp]="52.4" countSuffix="%" [countDecimals]="1"></span>
 *
 * CONCEPTOS CLAVE:
 * - requestAnimationFrame() → Método del navegador para animaciones suaves
 *   (se ejecuta ~60 veces por segundo, sincronizado con la pantalla).
 * - Easing (ease-out cubic) → Función matemática que hace que la animación
 *   empiece rápido y se desacelere al final, creando un efecto natural.
 */

import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appCountUp]',
    standalone: true,
})
export class CountUpDirective implements OnInit {
    /** Valor objetivo al que animará (se pasa como [appCountUp]="valor") */
    @Input('appCountUp') targetValue = 0;

    /** Duración de la animación en milisegundos (default: 1.5 segundos) */
    @Input() countDuration = 1500;

    /** Prefijo que se muestra antes del número (ej: "$") */
    @Input() countPrefix = '';

    /** Sufijo que se muestra después del número (ej: "B", "%") */
    @Input() countSuffix = '';

    /** Cantidad de decimales a mostrar */
    @Input() countDecimals = 0;

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef<HTMLElement>) { }

    ngOnInit(): void {
        // Mostramos "0" al inicio
        this.el.nativeElement.textContent = this.countPrefix + '0' + this.countSuffix;

        // Observamos cuando el elemento se hace visible
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.animate(); // Iniciamos la animación
                        this.observer.unobserve(entry.target); // Solo una vez
                    }
                });
            },
            { threshold: 0.3 } // Se activa cuando el 30% es visible
        );

        this.observer.observe(this.el.nativeElement);
    }

    /**
     * Ejecuta la animación del contador usando requestAnimationFrame.
     *
     * La función "step" se llama en cada frame (~60fps).
     * Calcula el progreso (0 a 1), aplica una función de easing,
     * y actualiza el texto del elemento.
     */
    private animate(): void {
        const start = performance.now(); // Marca de tiempo al inicio
        const duration = this.countDuration;
        const target = this.targetValue;

        const step = (now: number) => {
            const elapsed = now - start; // Tiempo transcurrido
            const progress = Math.min(elapsed / duration, 1); // Progreso de 0 a 1

            // Función de easing "ease-out cubic":
            // La fórmula 1 - (1 - t)^3 hace que la animación empiece rápido
            // y se desacelere suavemente al final
            const eased = 1 - Math.pow(1 - progress, 3);

            // Calculamos el valor actual basado en el progreso
            const current = eased * target;

            // Actualizamos el texto del elemento con formato localizado
            this.el.nativeElement.textContent =
                this.countPrefix +
                current.toLocaleString('en-US', {
                    minimumFractionDigits: this.countDecimals,
                    maximumFractionDigits: this.countDecimals,
                }) +
                this.countSuffix;

            // Si no hemos terminado, pedimos otro frame
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        // Iniciamos el loop de animación
        requestAnimationFrame(step);
    }
}
