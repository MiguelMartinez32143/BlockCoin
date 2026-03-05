/**
 * App — Componente raíz de la aplicación
 *
 * Este es el componente principal que Angular renderiza primero.
 * Su único propósito es componer (organizar) todos los componentes
 * de la página en el orden correcto.
 *
 * ESTRUCTURA DE LA PÁGINA:
 * 1. Navbar    → Barra de navegación fija
 * 2. Hero      → Sección principal con CTA
 * 3. Market    → Resumen del mercado
 * 4. Metrics   → Métricas de Bitcoin
 * 5. Chart     → Gráfico de precios
 * 6. Buy Form  → Simulador de compra
 * 7. Table     → Historial de transacciones
 * 8. Footer    → Pie de página
 *
 * CONCEPTOS CLAVE:
 * - imports[] → En componentes standalone, listamos aquí todos los componentes
 *   hijo que usamos en el template. Sin esto, Angular no los reconoce.
 * - templateUrl → Apunta al archivo HTML del componente.
 * - styleUrl → Apunta al archivo CSS del componente (estilos encapsulados).
 */

import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { MarketOverviewComponent } from './components/market-overview/market-overview.component';
import { BitcoinMetricsComponent } from './components/bitcoin-metrics/bitcoin-metrics.component';
import { BitcoinChartComponent } from './components/bitcoin-chart/bitcoin-chart.component';
import { BuyBitcoinFormComponent } from './components/buy-bitcoin-form/buy-bitcoin-form.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',  // Corresponde a <app-root> en index.html
  standalone: true,
  imports: [
    NavbarComponent,          // Barra de navegación
    HeroComponent,            // Sección principal
    MarketOverviewComponent,  // Resumen del mercado
    BitcoinMetricsComponent,  // Métricas de BTC
    BitcoinChartComponent,    // Gráfico de precios
    BuyBitcoinFormComponent,  // Formulario de compra
    TransactionsTableComponent, // Tabla de transacciones
    FooterComponent,          // Pie de página
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App { }
