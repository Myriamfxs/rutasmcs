import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery, getVisitas } from 'wasp/client/operations';

const AgendaPage = () => {
  const { data: visitas, isLoading, error } = useQuery(getVisitas, {
    from: new Date(),
    to: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000)
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const dates = Object.keys(visitas || {});

  return (
    <div className='grid grid-cols-7 gap-4 p-4'>
      {dates.map(date => (
        <Link key={date} to={`/agenda/${date}`} className='p-4 bg-blue-100 hover:bg-blue-200 rounded-lg text-center'>
          <div>{new Date(date).toLocaleDateString()}</div>
        </Link>
      ))}
    </div>
  );
}

export default AgendaPage;
