/**
 * BitcoinMetricsComponent — Métricas detalladas de Bitcoin
 *
 * Muestra 4 tarjetas con datos simulados de BTC:
 * - Precio actual
 * - Cambio porcentual en 24h (verde si sube, rojo si baja)
 * - Capitalización de mercado
 * - Volumen de comercio 24h
 *
 * CONCEPTOS CLAVE:
 * - ngOnInit → Método del ciclo de vida que se ejecuta al iniciar el componente.
 * - DecimalPipe → Pipe integrado de Angular para formatear números.
 *   En el template: {{ valor | number:'1.2-2' }}
 *   Formato '1.2-2' = mínimo 1 entero, entre 2 y 2 decimales.
 */

import { Component, OnInit, signal } from '@angular/core';
import { CryptoService, BitcoinData } from '../../services/crypto.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-bitcoin-metrics',
    standalone: true,
    imports: [ScrollRevealDirective, DecimalPipe],
    templateUrl: './bitcoin-metrics.component.html',
    styleUrl: './bitcoin-metrics.component.css',
})
export class BitcoinMetricsComponent implements OnInit {
    /** Signal que almacena los datos de Bitcoin */
    btc = signal<BitcoinData | null>(null);

    constructor(private cryptoService: CryptoService) { }

    /** Al iniciar, cargamos los datos simulados de BTC */
    ngOnInit(): void {
        this.btc.set(this.cryptoService.getBitcoinData());
    }
}
