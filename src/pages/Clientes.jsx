import React, { useState } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getClientes } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ClientesPage = () => {
  const { data: clientes, isLoading, error } = useQuery(getClientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory ? cliente.categoria === filterCategory : true)
  );

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-2 py-1 border rounded"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="ml-2 px-2 py-1 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Nombre</th>
            <th className="py-2">Categor?a</th>
            <th className="py-2">Tel?fono</th>
            <th className="py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map(cliente => (
            <tr key={cliente.id} className="border-t">
              <td className="py-2 px-4">
                <Link to={`/clientes/${cliente.id}`} className="text-blue-500 hover:underline">
                  {cliente.nombre}
                </Link>
              </td>
              <td className="py-2 px-4">{cliente.categoria}</td>
              <td className="py-2 px-4">{cliente.telefono}</td>
              <td className="py-2 px-4">{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesPage;
