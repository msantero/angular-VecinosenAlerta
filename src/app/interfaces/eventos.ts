export class Evento {
  _id: string;
  titulo: string;
  descripcion: string;
  estaActivo: boolean;
  habilitaTelefono: boolean;
  geolocalizacion: string;
  idCagteggoria: string;
  idUsuario: string;
  minutosExpiracion: Int16Array;
  comentarios: string[];
}
