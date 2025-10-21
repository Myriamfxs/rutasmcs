import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'wasp/client/operations';
import { getClienteDetails } from 'wasp/client/operations';

const ClienteDetailPage = () => {
  const { id } = useParams();
  const { data: cliente, isLoading, error } = useQuery(getClienteDetails, { clienteId: parseInt(id) });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{cliente.nombre}</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Phone:</strong> {cliente.telefono}</p>
        <p><strong>Address:</strong> {cliente.direccion ? `${cliente.direccion.calle}, ${cliente.direccion.ciudad}, ${cliente.direccion.provincia}` : 'No address available'}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        {cliente.pedidos.length > 0 ? (
          <ul>
            {cliente.pedidos.map(pedido => (
              <li key={pedido.id} className="py-2">
                <span>{new Date(pedido.fecha).toLocaleDateString()} - Total: {pedido.total}?</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders available.</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Product Suggestions</h2>
        {cliente.predicciones.length > 0 ? (
          <ul>
            {cliente.predicciones.map(prediccion => (
              <li key={prediccion.productoId} className="py-2">
                <span>{prediccion.producto.descripcion} - Probability: {(prediccion.prob * 100).toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No product suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default ClienteDetailPage;
