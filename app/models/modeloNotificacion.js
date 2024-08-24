export class Notificacion {
  constructor(id, activa, sonido, vibracion, titulo) {
    this.id = id;
    this.activa = activa;
    this.sonido = sonido;
    this.vibracion = vibracion;
    this.titulo = titulo;
  }

  cambiarEstadoActiva () {
    this.activa = !this.activa
  }
}
