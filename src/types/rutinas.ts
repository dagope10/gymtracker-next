// Definición de tipos para el módulo de rutinas

// Tipo para Ejercicio
export interface Ejercicio {
    id: number;
    nombre: string;
    descripcion?: string;
    grupoMuscular?: string;
    urlImagen?: string;
    videoUrl?: string;
    instrucciones?: string;
  }
  
  // Tipo para EjercicioDia - Relación entre un día y un ejercicio con detalles específicos
  export interface EjercicioDia {
    id: number;
    ejercicio: Ejercicio;
    series: number;
    repeticiones: number;
    descansoSegundos: number;
    peso: string;
    notas?: string;
    orden: number;
  }
  
  // Tipo para DiaRutina
  export interface DiaRutina {
    id: number;
    nombre: string;
    numeroDia: number;
    notas?: string;
    ejercicios: EjercicioDia[];
  }
  
  // Tipo para Rutina
  export interface Rutina {
    id?: number;
    nombre: string;
    descripcion?: string;
    fechaCreacion?: string;
    dias: DiaRutina[];
  }
  
  // Tipo para las respuestas de API
  export interface ApiResponse<T> {
    data: T;
    mensaje?: string;
    exito: boolean;
  }