import { useEffect, useState } from 'react';
import Card from '../components/Card';

function getAllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:3001/events`);
      const data = await response.json();
      console.log(`events data: ${data}`);
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="events">
      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => (
            <Card
              id={event.id}
              key={event.id}
              image={event.image_url}
              name={event.event_name}
              pricepoint={event.ticket_price}
              // audience={event.artists}
            />
          ))
        ) : (
          <h3 className="noResults">{'No events Yet 😞'}</h3>
        )}
      </main>
    </div>
  );
}

export { getAllEvents };
