import { HttpError } from 'wasp/server'

export const createVisita = async ({ clienteId, fecha, notas }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const cliente = await context.entities.Cliente.findUnique({
    where: { id: clienteId }
  });
  if (!cliente) { throw new HttpError(404, 'Cliente not found') };

  const visita = await context.entities.Visita.create({
    data: {
      fecha,
      notas,
      clienteId
    }
  });

  return visita;
}

export const updateVisita = async ({ visitaId, estado, notas }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const visita = await context.entities.Visita.findUnique({
    where: { id: visitaId }
  });
  if (!visita) { throw new HttpError(404, 'Visita not found') };

  const updateData = {};
  if (estado !== undefined) updateData.estado = estado;
  if (notas !== undefined) updateData.notas = notas;

  const updatedVisita = await context.entities.Visita.update({
    where: { id: visitaId },
    data: updateData
  });

  return updatedVisita;
}
