import React, { useState } from 'react';
import { EjercicioDiaForm } from './EjercicioDiaForm';
import { Ejercicio, DiaRutina, EjercicioDia } from '@/types/rutinas';

interface DiaRutinaFormProps {
  dia: DiaRutina;
  ejerciciosDisponibles: Ejercicio[];
  onUpdate: (dia: DiaRutina) => void;
  onDelete: () => void;
  isLastDay: boolean;
}

export const DiaRutinaForm: React.FC<DiaRutinaFormProps> = ({
  dia,
  ejerciciosDisponibles,
  onUpdate,
  onDelete,
  isLastDay
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...dia,
      nombre: e.target.value
    });
  };

  const handleNotasChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      ...dia,
      notas: e.target.value
    });
  };

  const agregarEjercicio = () => {
    // Si no hay ejercicios disponibles, no hacer nada
    if (!ejerciciosDisponibles.length) return;

    const nuevoEjercicio: EjercicioDia = {
      id: 0,
      ejercicio: ejerciciosDisponibles[0],
      series: 3,
      repeticiones: 12,
      descansoSegundos: 60,
      peso: '',
      notas: '',
      orden: dia.ejercicios.length + 1
    };

    onUpdate({
      ...dia,
      ejercicios: [...dia.ejercicios, nuevoEjercicio]
    });
  };

  const actualizarEjercicio = (index: number, ejercicioNuevo: EjercicioDia) => {
    const nuevosEjercicios = [...dia.ejercicios];
    nuevosEjercicios[index] = ejercicioNuevo;
    
    onUpdate({
      ...dia,
      ejercicios: nuevosEjercicios
    });
  };

  const eliminarEjercicio = (index: number) => {
    const nuevosEjercicios = [...dia.ejercicios];
    nuevosEjercicios.splice(index, 1);
    
    // Actualizar orden de los ejercicios restantes
    nuevosEjercicios.forEach((ejercicio, i) => {
      ejercicio.orden = i + 1;
    });
    
    onUpdate({
      ...dia,
      ejercicios: nuevosEjercicios
    });
  };

  const moverEjercicioArriba = (index: number) => {
    if (index === 0) return;
    
    const nuevosEjercicios = [...dia.ejercicios];
    const temp = nuevosEjercicios[index];
    nuevosEjercicios[index] = nuevosEjercicios[index - 1];
    nuevosEjercicios[index - 1] = temp;
    
    // Actualizar órdenes
    nuevosEjercicios.forEach((ejercicio, i) => {
      ejercicio.orden = i + 1;
    });
    
    onUpdate({
      ...dia,
      ejercicios: nuevosEjercicios
    });
  };

  const moverEjercicioAbajo = (index: number) => {
    if (index === dia.ejercicios.length - 1) return;
    
    const nuevosEjercicios = [...dia.ejercicios];
    const temp = nuevosEjercicios[index];
    nuevosEjercicios[index] = nuevosEjercicios[index + 1];
    nuevosEjercicios[index + 1] = temp;
    
    // Actualizar órdenes
    nuevosEjercicios.forEach((ejercicio, i) => {
      ejercicio.orden = i + 1;
    });
    
    onUpdate({
      ...dia,
      ejercicios: nuevosEjercicios
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          className="text-left flex items-center text-gray-800 font-medium focus:outline-none"
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            className={`h-5 w-5 mr-2 transform ${expanded ? 'rotate-90' : ''} transition-transform`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {dia.nombre} ({dia.ejercicios.length} ejercicios)
        </button>
        <div className="flex items-center">
          <button
            type="button"
            onClick={onDelete}
            disabled={isLastDay}
            className={`p-1 text-red-600 hover:text-red-800 focus:outline-none ${isLastDay ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isLastDay ? "La rutina debe tener al menos un día" : "Eliminar día"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-white">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mb-6">
            <div className="sm:col-span-3">
              <label htmlFor={`dia-nombre-${dia.numeroDia}`} className="block text-sm font-medium text-gray-700">
                Nombre del día
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id={`dia-nombre-${dia.numeroDia}`}
                  value={dia.nombre}
                  onChange={handleNombreChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Ej: Día de pecho y hombros"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor={`dia-notas-${dia.numeroDia}`} className="block text-sm font-medium text-gray-700">
                Notas (opcional)
              </label>
              <div className="mt-1">
                <textarea
                  id={`dia-notas-${dia.numeroDia}`}
                  rows={2}
                  value={dia.notas || ''}
                  onChange={handleNotasChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Observaciones o instrucciones para este día"
                />
              </div>
            </div>
          </div>
          
          {/* Lista de ejercicios */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-700">Ejercicios</h3>
              <button
                type="button"
                onClick={agregarEjercicio}
                disabled={!ejerciciosDisponibles.length}
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Agregar ejercicio
              </button>
            </div>
            
            {dia.ejercicios.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-md">
                No hay ejercicios añadidos para este día. Agrega al menos uno.
              </div>
            ) : (
              <div className="space-y-4">
                {dia.ejercicios.map((ejercicio, index) => (
                  <EjercicioDiaForm
                    key={`${dia.numeroDia}-${index}`}
                    ejercicioDia={ejercicio}
                    ejerciciosDisponibles={ejerciciosDisponibles}
                    onUpdate={(ejercicioNuevo) => actualizarEjercicio(index, ejercicioNuevo)}
                    onDelete={() => eliminarEjercicio(index)}
                    onMoveUp={() => moverEjercicioArriba(index)}
                    onMoveDown={() => moverEjercicioAbajo(index)}
                    isFirst={index === 0}
                    isLast={index === dia.ejercicios.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};