import React, { useState , useContext } from 'react';
import { getInteresAnual } from '@/Api/api';
import { MiembroContext } from '@/Provider/provider';

const InteresAnual = ( setIdentificadorComponente) => {
  const [fecha, setFecha] = useState('');
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);

  const {cooperativa} = useContext(MiembroContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    console.log(fecha)
    console.log(cooperativa)
    if (!fecha || !cooperativa.idCooperativa) {
        console.error('Fecha o ID de cooperativa no definidos');
        return;
      }
    try {
      const response = await getInteresAnual(fecha, cooperativa.idCooperativa);
      setResultados(response);
      console.log(response)
    } catch (error) {
      console.error("Error al obtener el informe:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Informe de Interés Anual</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 text-sm font-medium">
          Selecciona el año:
        </label>
        <input
          type="date" 
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border rounded px-2 py-1 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Obtener Informe
        </button>
      </form>

      {loading && <p>Cargando...</p>}

      {resultados != null && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Resultados:</h3>
          <ul className="list-disc pl-5">
            {resultados.listaInteresAnual.map((dato) => (
              <li key={dato.socio.cedulaSocio}>
                <strong>{dato.socio.nombreSocio}:</strong> {dato.interes} €
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InteresAnual;
