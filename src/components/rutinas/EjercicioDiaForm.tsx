import React, { useState } from 'react';
import { Ejercicio, EjercicioDia } from '@/types/rutinas';
interface EjercicioDiaFormProps {
  ejercicioDia: EjercicioDia;
  ejerciciosDisponibles: Ejercicio[];
  onUpdate: (ejercicioDia: EjercicioDia) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const EjercicioDiaForm: React.FC<EjercicioDiaFormProps> = ({
  ejercicioDia,
  ejerciciosDisponibles,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleEjercicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ejercicioId = parseInt(e.target.value);
    const ejercicioSeleccionado = ejerciciosDisponibles.find(ej => ej.id === ejercicioId);
    
    if (ejercicioSeleccionado) {
      onUpdate({
        ...ejercicioDia,
        ejercicio: ejercicioSeleccionado
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    onUpdate({
      ...ejercicioDia,
      [name]: name === 'series' || name === 'repeticiones' || name === 'descansoSegundos' 
        ? parseInt(value) 
        : value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
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
          <span className="font-semibold text-gray-900">{ejercicioDia.orden}.</span>
          <span className="ml-2">{ejercicioDia.ejercicio.nombre}</span>
          <span className="ml-2 text-gray-500 text-sm">
            {ejercicioDia.series} series x {ejercicioDia.repeticiones} reps
          </span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-1 text-gray-500 hover:text-gray-700 focus:outline-none ${isFirst ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Mover hacia arriba"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-1 text-gray-500 hover:text-gray-700 focus:outline-none ${isLast ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Mover hacia abajo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button
            type="button"
            onClick={onDelete}
            className="p-1 text-red-600 hover:text-red-800 focus:outline-none"
            title="Eliminar ejercicio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor={`ejercicio-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Ejercicio
              </label>
              <div className="mt-1">
                <select
                  id={`ejercicio-${ejercicioDia.orden}`}
                  value={ejercicioDia.ejercicio.id}
                  onChange={handleEjercicioChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {ejerciciosDisponibles.map((ejercicio) => (
                    <option key={ejercicio.id} value={ejercicio.id}>
                      {ejercicio.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor={`series-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Series
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id={`series-${ejercicioDia.orden}`}
                  name="series"
                  value={ejercicioDia.series}
                  onChange={handleInputChange}
                  min="1"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor={`repeticiones-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Repeticiones
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id={`repeticiones-${ejercicioDia.orden}`}
                  name="repeticiones"
                  value={ejercicioDia.repeticiones}
                  onChange={handleInputChange}
                  min="1"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3 sm:col-start-1">
              <label htmlFor={`descanso-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Descanso (segundos)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id={`descanso-${ejercicioDia.orden}`}
                  name="descansoSegundos"
                  value={ejercicioDia.descansoSegundos}
                  onChange={handleInputChange}
                  min="0"
                  step="5"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor={`peso-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Peso / Resistencia
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id={`peso-${ejercicioDia.orden}`}
                  name="peso"
                  value={ejercicioDia.peso || ''}
                  onChange={handleInputChange}
                  placeholder="Ej: 10kg, Banda roja"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor={`notas-${ejercicioDia.orden}`} className="block text-sm font-medium text-gray-700">
                Notas (opcional)
              </label>
              <div className="mt-1">
                <textarea
                  id={`notas-${ejercicioDia.orden}`}
                  name="notas"
                  rows={2}
                  value={ejercicioDia.notas || ''}
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Observaciones o tips para este ejercicio"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};