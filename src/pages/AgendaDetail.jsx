import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getVisitas, updateVisita } from 'wasp/client/operations';
import Map from 'react-map-gl';

const AgendaDetailPage = () => {
  const { fecha } = useParams();
  const { data: visitas, isLoading, error } = useQuery(getVisitas, { from: fecha, to: fecha });
  const updateVisitaFn = useAction(updateVisita);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleMarkAsCompleted = (visitaId) => {
    updateVisitaFn({ visitaId, estado: 'REALIZADA' });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Itinerary for {fecha}</h1>
      <div className="mb-4">
        {visitas[fecha]?.map((visita) => (
          <div key={visita.id} className="flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-lg">
            <div>
              <p>{visita.cliente.nombre}</p>
              <p>{visita.notas}</p>
            </div>
            <button
              onClick={() => handleMarkAsCompleted(visita.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Mark as Completed
            </button>
          </div>
        ))}
      </div>
      <Map
        initialViewState={{
          longitude: -3.7038,
          latitude: 40.4168,
          zoom: 10
        }}
        style={{ width: '100%', height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
      />
    </div>
  );
};

export default AgendaDetailPage;
