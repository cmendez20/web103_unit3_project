import { useState, useEffect } from "react";

const Card = props => {
  const [event, setEvent] = useState({
    name: "",
    pricepoint: "",
    image: "",
  });

  useEffect(() => {
    setEvent({
      name: props.event_name,
      pricepoint: props.ticket_price
        ? parseFloat(props.ticket_price).toFixed(2)
        : "0.00",
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
        {/* Display "Free" for $0.00 price point */}
        <p>
          {event.pricepoint === "0.00" ? "Free" : `Price: $${event.pricepoint}`}
        </p>
        {/* The link is removed because the route /event/:id does not exist yet */}
      </div>
    </div>
  );
};

export default Card;
