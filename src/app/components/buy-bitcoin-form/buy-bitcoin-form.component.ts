/**
 * BuyBitcoinFormComponent — Simulador de compra de Bitcoin
 *
 * Formulario interactivo que permite al usuario:
 * 1. Ingresar nombre, email y monto en USD
 * 2. Ver el equivalente en BTC calculado automáticamente
 * 3. Enviar la "compra" simulada (se guarda en TransactionService)
 *
 * CONCEPTOS CLAVE:
 * - FormsModule → Módulo de Angular para formularios basados en templates.
 *   Habilita [(ngModel)] para enlace bidireccional de datos (two-way binding).
 * - Two-way binding [(ngModel)] → Sincroniza el valor del input con la variable.
 * - (ngModelChange) → Evento que se dispara cuando el valor del modelo cambia.
 * - (ngSubmit) → Evento que se dispara al enviar el formulario.
 */

import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CryptoService } from '../../services/crypto.service';
import { TransactionService } from '../../services/transaction.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-buy-bitcoin-form',
    standalone: true,
    imports: [FormsModule, ScrollRevealDirective, DecimalPipe],
    templateUrl: './buy-bitcoin-form.component.html',
    styleUrl: './buy-bitcoin-form.component.css',
})
export class BuyBitcoinFormComponent implements OnInit {
    // --- Variables del formulario (enlazadas con ngModel) ---
    name = '';
    email = '';
    usdAmount: number | null = null;

    // --- Signals para estado reactivo ---
    btcPrice = signal(0);
    btcAmount = signal(0);
    submitted = signal(false);

    /** Fecha actual en formato YYYY-MM-DD */
    today = new Date().toISOString().split('T')[0];

    constructor(
        private cryptoService: CryptoService,
        private transactionService: TransactionService
    ) { }

    /** Al iniciar, obtenemos el precio simulado de BTC */
    ngOnInit(): void {
        this.btcPrice.set(this.cryptoService.getBitcoinPrice());
    }

    /**
     * Calcula cuántos BTC recibiría el usuario según el monto en USD.
     * Fórmula: BTC = USD / Precio_BTC
     */
    calculateBtc(): void {
        if (this.usdAmount && this.btcPrice()) {
            this.btcAmount.set(this.usdAmount / this.btcPrice());
        } else {
            this.btcAmount.set(0);
        }
    }

    /**
     * Procesa el envío del formulario.
     * Valida, guarda la transacción y limpia después de 3 segundos.
     */
    onSubmit(): void {
        if (!this.name || !this.email || !this.usdAmount || this.usdAmount <= 0) return;

        this.transactionService.addTransaction({
            name: this.name,
            email: this.email,
            usdAmount: this.usdAmount,
            btcAmount: this.btcAmount(),
            date: new Date().toISOString().split('T')[0],
        });

        this.submitted.set(true);

        setTimeout(() => {
            this.name = '';
            this.email = '';
            this.usdAmount = null;
            this.btcAmount.set(0);
            this.submitted.set(false);
        }, 3000);
    }
}
