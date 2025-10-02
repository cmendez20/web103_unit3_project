import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = props => {
  const [event, setEvents] = useState({
    id: 0,
    name: '',
    pricepoint: '',
    audience: '',
    image: '',
  });

  useEffect(() => {
    setEvents({
      id: props.id,
      name: props.event_name,
      pricepoint: props.ticket_price,
      // audience: props.audience,
      image: props.image_url,
    });
  }, [props]);

  return (
    <div className="card">
      <div
        className="top-container"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>
      <div className="bottom-container">
        <h3>{event.name}</h3>
        <p>{'Price: ' + event.pricepoint}</p>
        <Link to={'/event/' + event.id}>
          <a>Read More →</a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
