import { HttpError } from 'wasp/server'

export const getVisitas = async ({ from, to }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const visitas = await context.entities.Visita.findMany({
    where: {
      fecha: {
        gte: new Date(from),
        lte: new Date(to)
      }
    },
    orderBy: {
      ordenDia: 'asc'
    }
  });

  return visitas.reduce((acc, visita) => {
    const dateKey = visita.fecha.toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(visita);
    return acc;
  }, {});
}

export const getClienteDetails = async ({ clienteId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const cliente = await context.entities.Cliente.findUnique({
    where: { id: clienteId },
    include: {
      pedidos: true,
      predicciones: {
        orderBy: { prob: 'desc' },
        take: 3
      }
    }
  });

  if (!cliente) throw new HttpError(404, 'No cliente found with id ' + clienteId);

  return cliente;
}
