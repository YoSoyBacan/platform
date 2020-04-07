export namespace APIResponse {
  export interface BusinessResponse {
    data: {
      informacion_del_negocio: {
        nombre: string;
        direccion: string;
        fecha_de_registro: Date;
        telefono: string;
        ciudad: string; 
        pais: string;
        email: string; 
        industria: string;
        link: string;
        avatar: string;
        imagenes: string[];
        legalId: string;
        banco: string;
        numero_de_cuenta: string;
      },
      informacion_del_usuario: {
        nombre: string;
        email: string;
        numero: string;
        codigo_del_pais: string;
      }
    }
  }
}
