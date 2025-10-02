import React, { useState, useEffect } from "react";
import EventsAPI from "../services/EventsAPI";
import Card from "../components/Card";
import "../css/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const eventsData = await EventsAPI.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchAllEvents();
  }, []);

  return (
    <div className="events-container">
      <h2>All Events</h2>
      <div className="events-list">
        {events && events.length > 0 ? (
          events.map(event => (
            <Card
              key={event.id}
              id={event.id}
              event_name={event.event_name}
              ticket_price={event.ticket_price}
              image_url={event.image_url}
            />
          ))
        ) : (
          <h3 className="no-results">
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events found!"}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Events;
