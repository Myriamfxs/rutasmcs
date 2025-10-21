import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { createVisita } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const NewVisitaPage = () => {
  const [clienteId, setClienteId] = useState('');
  const [fecha, setFecha] = useState('');
  const [notas, setNotas] = useState('');
  const createVisitaFn = useAction(createVisita);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVisitaFn({ clienteId, fecha, notas });
      setClienteId('');
      setFecha('');
      setNotas('');
      alert('Visita creada con ?xito!');
    } catch (error) {
      alert('Error al crear visita: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Nueva Visita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Cliente ID</label>
          <input
            type="text"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Notas</label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Visita
        </button>
      </form>
      <div className="mt-4">
        <Link to="/agenda" className="text-blue-500 hover:underline">
          Volver a la Agenda
        </Link>
      </div>
    </div>
  );
};

export default NewVisitaPage;
