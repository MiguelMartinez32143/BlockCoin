/**
 * BitcoinChartComponent — Gráfico interactivo de precio de Bitcoin
 *
 * Muestra un gráfico de línea con el historial de precios de BTC.
 * El usuario puede seleccionar entre 3 rangos de tiempo: 1D, 7D, 30D.
 *
 * CONCEPTOS CLAVE:
 * - Chart.js → Librería JavaScript para crear gráficos de datos.
 * - ng2-charts → Wrapper de Angular para Chart.js (BaseChartDirective).
 * - Chart.register() → Registra los módulos necesarios de Chart.js.
 *   Chart.js usa "tree-shaking" — solo carga lo que registres.
 * - ChartConfiguration → Tipo de TypeScript que define la estructura del gráfico.
 */

import { Component, OnInit, signal } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

// Importamos y registramos solo los módulos de Chart.js que necesitamos
import {
    Chart,
    CategoryScale,   // Eje X con categorías (fechas/horas)
    LinearScale,      // Eje Y con valores numéricos
    PointElement,     // Puntos en el gráfico
    LineElement,      // Líneas entre puntos
    LineController,   // Controlador para gráficos de línea
    Filler,           // Relleno bajo la línea
    Tooltip,          // Tooltip al hacer hover
} from 'chart.js';

// Registramos los módulos — sin esto, Chart.js no funcionaría
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Filler, Tooltip);

@Component({
    selector: 'app-bitcoin-chart',
    standalone: true,
    imports: [ScrollRevealDirective, BaseChartDirective],
    templateUrl: './bitcoin-chart.component.html',
    styleUrl: './bitcoin-chart.component.css',
})
export class BitcoinChartComponent implements OnInit {
    /** Rango de tiempo actualmente seleccionado */
    activeRange = signal<'1D' | '7D' | '30D'>('7D');

    /** Lista de rangos disponibles para mostrar como botones */
    ranges: ('1D' | '7D' | '30D')[] = ['1D', '7D', '30D'];

    /** Datos del gráfico (etiquetas + datasets) — reactivos con signal */
    chartData = signal<ChartConfiguration<'line'>['data']>({
        labels: [],
        datasets: [],
    });

    /**
     * Opciones de configuración del gráfico.
     * Controlan la apariencia visual: colores, tooltip, ejes, grid, etc.
     */
    chartOptions: ChartConfiguration<'line'>['options'] = {
        responsive: true,            // Se adapta al contenedor
        maintainAspectRatio: false,  // Usamos height fijo del contenedor
        interaction: {
            intersect: false,          // El tooltip se muestra sin necesidad de estar exactamente sobre un punto
            mode: 'index',             // Muestra datos de todos los datasets en esa posición X
        },
        plugins: {
            tooltip: {
                backgroundColor: '#1E2026',
                titleColor: '#F9FAFB',
                bodyColor: '#9CA3AF',
                borderColor: 'rgba(255,255,255,0.08)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    // Formateamos el valor del tooltip como precio en USD
                    label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: { color: '#9CA3AF', font: { size: 11 }, maxTicksLimit: 8 },
                border: { display: false },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.04)' },
                ticks: {
                    color: '#9CA3AF',
                    font: { size: 11 },
                    callback: (v) => '$' + Number(v).toLocaleString(),
                },
                border: { display: false },
            },
        },
    };

    constructor(private cryptoService: CryptoService) { }

    /** Al iniciar, cargamos el gráfico con el rango por defecto (7D) */
    ngOnInit(): void {
        this.loadChart(this.activeRange());
    }

    /**
     * Cambia el rango de tiempo y recarga los datos del gráfico.
     * Se llama al hacer clic en los botones 1D, 7D, 30D.
     */
    selectRange(range: '1D' | '7D' | '30D'): void {
        this.activeRange.set(range);
        this.loadChart(range);
    }

    /**
     * Carga los datos del gráfico según el rango seleccionado.
     * Actualiza el signal chartData, lo cual re-renderiza el gráfico.
     */
    private loadChart(range: '1D' | '7D' | '30D'): void {
        const { labels, prices } = this.cryptoService.getChartData(range);

        this.chartData.set({
            labels,
            datasets: [
                {
                    data: prices,
                    label: 'Precio BTC',
                    borderColor: '#FCD535',                    // Color de la línea
                    backgroundColor: 'rgba(252,213,53,0.08)',  // Relleno bajo la línea
                    borderWidth: 2,
                    pointRadius: 0,                            // Sin puntos visibles normalmente
                    pointHoverRadius: 5,                       // Puntos visibles al hacer hover
                    pointHoverBackgroundColor: '#FCD535',
                    tension: 0.35,                             // Curvatura de la línea (0 = recta, 1 = muy curva)
                    fill: true,                                // Rellenar el área bajo la línea
                },
            ],
        });
    }
}
