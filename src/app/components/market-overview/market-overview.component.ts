/**
 * MarketOverviewComponent — Resumen del mercado con contadores animados
 *
 * Muestra 3 tarjetas con métricas clave del mercado:
 * - Capitalización total
 * - Dominio de BTC
 * - Volumen 24h
 *
 * Cada tarjeta usa la directiva CountUpDirective para animar los números
 * y ScrollRevealDirective para aparecer al hacer scroll.
 *
 * CONCEPTOS CLAVE:
 * - ngOnInit → Método del ciclo de vida que se ejecuta cuando el componente
 *   se inicializa. Aquí cargamos los datos iniciales.
 * - Inyección de dependencias → Angular inyecta CryptoService en el constructor
 *   automáticamente. No necesitas crear la instancia tú mismo.
 */

import { Component, OnInit, signal } from '@angular/core';
import { CryptoService, MarketOverview } from '../../services/crypto.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
    selector: 'app-market-overview',
    standalone: true,
    imports: [ScrollRevealDirective, CountUpDirective], // Directivas que usamos en el template
    templateUrl: './market-overview.component.html',
    styleUrl: './market-overview.component.css',
})
export class MarketOverviewComponent implements OnInit {
    /** Signal que almacena los datos del mercado (null hasta que se cargan) */
    data = signal<MarketOverview | null>(null);

    /** CryptoService se inyecta automáticamente via el constructor */
    constructor(private cryptoService: CryptoService) { }

    /** Se ejecuta al iniciar el componente — cargamos los datos del mercado */
    ngOnInit(): void {
        this.data.set(this.cryptoService.getMarketOverview());
    }
}
