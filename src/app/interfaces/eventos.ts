import { Categoria } from './categorias';
import { Usuario } from './usuarios';

export class Evento {
  _id: string;
  titulo: string;
  descripcion: string;
  estaActivo: boolean;
  habilitaTelefono: boolean;
  geolocalizacion: string;
  fechaPublicacion: Date;
  categoria: Categoria;
  usuario: Usuario;
  comentarios: string[];
}
