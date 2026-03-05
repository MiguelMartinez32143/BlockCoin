/**
 * CryptoService — Servicio para proveer datos simulados de criptomonedas
 *
 * Todos los datos son inventados (mock) — no se conecta a ninguna API externa.
 *
 * CONCEPTOS CLAVE:
 * - @Injectable({ providedIn: 'root' }) → Servicio singleton disponible en toda la app.
 * - Los métodos devuelven datos directamente (sin async/await ni fetch).
 */

import { Injectable } from '@angular/core';

/** Estructura de los datos del resumen del mercado */
export interface MarketOverview {
    totalMarketCap: number;
    btcDominance: number;
    volume24h: number;
}

/** Estructura de los datos de Bitcoin */
export interface BitcoinData {
    price: number;
    change24h: number;
    marketCap: number;
    volume: number;
}

@Injectable({ providedIn: 'root' })
export class CryptoService {

    /** Precio simulado de Bitcoin */
    private btcPrice = 67432.18;

    /** Devuelve el precio simulado de BTC */
    getBitcoinPrice(): number {
        return this.btcPrice;
    }

    /** Devuelve datos simulados de Bitcoin */
    getBitcoinData(): BitcoinData {
        return {
            price: this.btcPrice,
            change24h: 2.34,
            marketCap: 1_320_000_000_000,
            volume: 28_500_000_000,
        };
    }

    /** Devuelve datos simulados del resumen del mercado global */
    getMarketOverview(): MarketOverview {
        return {
            totalMarketCap: 2_540_000_000_000,
            btcDominance: 52.4,
            volume24h: 89_200_000_000,
        };
    }

    /**
     * Genera datos simulados para el gráfico de precios.
     * Usa un "random walk" para crear movimiento de precio realista.
     *
     * @param range — '1D' (1 día), '7D' (7 días), '30D' (30 días)
     */
    getChartData(range: '1D' | '7D' | '30D'): { labels: string[]; prices: number[] } {
        const now = Date.now();
        const basePrice = this.btcPrice;

        let points: number;
        let stepMs: number;
        let volatility: number;

        switch (range) {
            case '1D':
                points = 24;
                stepMs = 3600_000;
                volatility = 300;
                break;
            case '7D':
                points = 7 * 4;
                stepMs = 6 * 3600_000;
                volatility = 800;
                break;
            case '30D':
                points = 30;
                stepMs = 86400_000;
                volatility = 2000;
                break;
        }

        const labels: string[] = [];
        const prices: number[] = [];
        let price = basePrice - volatility * 2;

        for (let i = 0; i < points; i++) {
            const date = new Date(now - (points - i) * stepMs);

            if (range === '1D') {
                labels.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            } else {
                labels.push(date.toLocaleDateString([], { month: 'short', day: 'numeric' }));
            }

            price += (Math.random() - 0.45) * volatility;
            price = Math.max(price, basePrice - volatility * 3);
            prices.push(Math.round(price * 100) / 100);
        }

        return { labels, prices };
    }
}
