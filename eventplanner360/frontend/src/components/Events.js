import React, { useContext } from 'react';
import EventContext from '../contexts/EventContext';
import EventCard from './EventCard';

const Events = () => {
  const { events } = useContext(EventContext);

  return (
    <>
      <section className="events py-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Events</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id}><EventCard event={event} /></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
