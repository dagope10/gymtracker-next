"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RequireAuth from '@/components/RequireAuth';
import api from '@/lib/api';
import { DiaRutinaForm } from '@/components/rutinas/DiaRutinaForm';
import { Ejercicio, DiaRutina, EjercicioDia } from '@/types/rutinas';

export default function NuevaRutinaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  
  // Estado de la rutina
  const [nombreRutina, setNombreRutina] = useState('');
  const [descripcionRutina, setDescripcionRutina] = useState('');
  const [dias, setDias] = useState<DiaRutina[]>([
    {
      id: 0,
      nombre: 'Día 1',
      numeroDia: 1,
      notas: '',
      ejercicios: []
    }
  ]);

  // Cargar ejercicios disponibles
  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await api.get('/ejercicios');
        setEjercicios(response.data);
      } catch (error) {
        console.error('Error al cargar los ejercicios', error);
        setError('No se pudieron cargar los ejercicios disponibles');
      }
    };

    fetchEjercicios();
  }, []);

  // Agregar un nuevo día a la rutina
  const agregarDia = () => {
    const nuevoDia: DiaRutina = {
      id: 0,
      nombre: `Día ${dias.length + 1}`,
      numeroDia: dias.length + 1,
      notas: '',
      ejercicios: []
    };
    setDias([...dias, nuevoDia]);
  };

  // Eliminar un día de la rutina
  const eliminarDia = (index: number) => {
    if (dias.length <= 1) {
      setError('La rutina debe tener al menos un día');
      return;
    }
    
    const nuevosDias = [...dias];
    nuevosDias.splice(index, 1);
    
    // Actualizar números de día para mantener la secuencia
    nuevosDias.forEach((dia, i) => {
      dia.numeroDia = i + 1;
      dia.nombre = `Día ${i + 1}`;
    });
    
    setDias(nuevosDias);
  };

  // Actualizar datos de un día
  const actualizarDia = (index: number, diaNuevo: DiaRutina) => {
    const nuevosDias = [...dias];
    nuevosDias[index] = diaNuevo;
    setDias(nuevosDias);
  };

  // Guardar la rutina completa usando envío por lotes
  const guardarRutina = async () => {
    if (!nombreRutina.trim()) {
      setError('El nombre de la rutina es obligatorio');
      return;
    }

    if (dias.some(dia => dia.ejercicios.length === 0)) {
      setError('Todos los días deben tener al menos un ejercicio');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Crear objeto completo con toda la información
      const rutinaCompleta = {
        nombre: nombreRutina,
        descripcion: descripcionRutina,
        dias: dias.map(dia => ({
          nombre: dia.nombre,
          numeroDia: dia.numeroDia,
          notas: dia.notas,
          ejercicios: dia.ejercicios.map(ejercicio => ({
            ejercicioId: ejercicio.ejercicio.id,
            series: ejercicio.series,
            repeticiones: ejercicio.repeticiones,
            descansoSegundos: ejercicio.descansoSegundos,
            peso: ejercicio.peso,
            notas: ejercicio.notas,
            orden: ejercicio.orden
          }))
        }))
      };
      
      // Una sola petición con todos los datos
      await api.post('/api/rutinas/completa', rutinaCompleta);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/rutinas');
      }, 2000);
      
    } catch (error) {
      console.error('Error al guardar la rutina', error);
      setError('Error al guardar la rutina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Crear nueva rutina</h1>
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                Rutina creada exitosamente. Redirigiendo...
              </div>
            )}
            
            {/* Datos de la rutina */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Información general</h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre de la rutina *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="nombre"
                      value={nombreRutina}
                      onChange={(e) => setNombreRutina(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Ej: Rutina de fuerza"
                      required
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="descripcion"
                      rows={3}
                      value={descripcionRutina}
                      onChange={(e) => setDescripcionRutina(e.target.value)}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Describe el objetivo o características de esta rutina"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Días de la rutina */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Días de entrenamiento</h2>
                <button
                  type="button"
                  onClick={agregarDia}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Agregar día
                </button>
              </div>
              
              <div className="space-y-6">
                {dias.map((dia, index) => (
                  <DiaRutinaForm
                    key={index}
                    dia={dia}
                    ejerciciosDisponibles={ejercicios}
                    onUpdate={(diaNuevo) => actualizarDia(index, diaNuevo)}
                    onDelete={() => eliminarDia(index)}
                    isLastDay={dias.length === 1}
                  />
                ))}
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/rutinas')}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardarRutina}
                disabled={loading}
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? 'Guardando...' : 'Guardar rutina'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}