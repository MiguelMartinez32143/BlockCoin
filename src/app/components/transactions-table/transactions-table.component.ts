/**
 * TransactionsTableComponent — Tabla de historial de transacciones
 *
 * Si no hay transacciones, muestra un estado vacío (empty state).
 * CONCEPTOS CLAVE:
 * - transactionService.transactions() → Lee el signal del servicio.
 *   Como es un signal, Angular re-renderiza la tabla automáticamente
 *   cuando se agrega una nueva transacción desde el formulario.
 * - "public" en el constructor → Hace que el servicio sea accesible
 *   desde el template HTML (sin "public", solo se puede usar dentro del .ts).
 */

import { Component } from '@angular/core';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-transactions-table',
    standalone: true,
    imports: [ScrollRevealDirective, DecimalPipe],
    templateUrl: './transactions-table.component.html',
    styleUrl: './transactions-table.component.css',
})
export class TransactionsTableComponent {
    /**
     * El servicio se inyecta como "public" para poder acceder a él
     * directamente desde el template con: transactionService.transactions()
     */
    constructor(public transactionService: TransactionService) { }
}
