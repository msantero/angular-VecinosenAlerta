export interface Categoria {
  _id: string;
  nombre: string;
  minutosExpiracion: number;
}

export interface CategoriaRequest {
  nombre: string;
  minutosExpiracion: number;
}
