/**
 * TransactionService — Servicio para gestionar transacciones simuladas
 *
 * Este servicio almacena las compras simuladas de Bitcoin en memoria.
 * "En memoria" significa que los datos se pierden al recargar la página.
 *
 * CONCEPTOS CLAVE:
 * - signal() → Es una forma reactiva de manejar estado en Angular (Angular 16+).
 *   Cuando el valor de un signal cambia, Angular actualiza automáticamente
 *   los componentes que lo estén leyendo.
 * - asReadonly() → Expone el signal como solo lectura para que los componentes
 *   puedan LEER los datos pero NO modificarlos directamente.
 * - update() → Permite modificar el valor del signal basándose en el valor anterior.
 */

import { Injectable, signal } from '@angular/core';

/**
 * Interfaz que define la estructura de una transacción de compra.
 * En TypeScript, las interfaces definen "contratos" de forma de datos.
 */
export interface Transaction {
    name: string;       // Nombre del comprador
    email: string;      // Correo electrónico
    usdAmount: number;  // Monto invertido en USD
    btcAmount: number;  // Cantidad de BTC recibida
    date: string;       // Fecha de la transacción (formato YYYY-MM-DD)
}

@Injectable({ providedIn: 'root' })
export class TransactionService {
    /**
     * Signal privado que almacena la lista de transacciones.
     * Es privado (_transactions) para que solo este servicio pueda modificarlo.
     */
    private _transactions = signal<Transaction[]>([]);

    /**
     * Versión de solo lectura del signal, disponible para los componentes.
     * Los componentes pueden LEER con transactions() pero no pueden
     * llamar a .set() o .update() directamente.
     */
    readonly transactions = this._transactions.asReadonly();

    /**
     * Agrega una nueva transacción al inicio de la lista.
     * Usamos update() para crear un nuevo array con la transacción
     * al principio, seguida de las transacciones existentes.
     *
     * @param tx — La transacción a agregar
     */
    addTransaction(tx: Transaction): void {
        // El spread operator (...list) crea una copia del array existente
        this._transactions.update(list => [tx, ...list]);
    }

    /**
     * Devuelve la lista actual de transacciones.
     * Al llamar a un signal con (), se obtiene su valor actual.
     */
    getTransactions(): Transaction[] {
        return this._transactions();
    }
}
