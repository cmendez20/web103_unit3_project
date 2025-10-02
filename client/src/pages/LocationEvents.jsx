import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI';
import LocationsAPI from '../services/LocationsAPI';
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const [location, setLocation] = useState(null);
    const [events, setEvents] = useState([]);
    const { locationId } = useParams();

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                // This is not efficient as it fetches all locations to find one.
                // A better approach would be to have a `getLocationById` endpoint.
                const locationsData = await LocationsAPI.getAllLocations();
                const currentLocation = locationsData.find(l => l.id.toString() === locationId);
                setLocation(currentLocation);

                if (currentLocation) {
                    const eventsData = await EventsAPI.getEventsByLocationId(locationId);
                    setEvents(eventsData);
                }
            } catch (error) {
                console.error("Failed to fetch location and events:", error);
            }
        };

        fetchLocationAndEvents();
    }, [locationId]);


    if (!location) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image_url} alt={location.location_name} />
                </div>

                <div className='location-info'>
                    <h2>{location.location_name}</h2>
                    <p>{location.address}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.event_name}
                            date={event.date}
                            time="Time not available" // You need to add a time field to your events data
                            image={event.image_url}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents;