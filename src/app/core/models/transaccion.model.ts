export interface Transaccion {
  tipo: 'suscripcion' | 'cancelacion';
  fondoId: number;
  fondoNombre: string;
  monto: number;
  fecha: Date;
}