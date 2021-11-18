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

export interface EventosxCategoria {
  idcategoria: string;
  idevento: string;
  nombre: string;
  titulo: string;
}

export interface CantCategoriaEventos {
  idcategoria: string;
  nombre: string;
  cantidad: number;
}

export interface CantEventosxMes {
  mes: number;
  anio: number;
  cantidad: number;
}
