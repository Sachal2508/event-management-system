export const formatDate = (dateString, timeString) => {
  if (!dateString) return 'Date TBA';
  try {
    const combined = timeString ? `${dateString}T${timeString}` : dateString;
    const date = new Date(combined);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [h, m] = timeString.split(':');
  if (!h) return '';
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m || '00'} ${ampm}`;
};

export const isEventPast = (dateString, timeString) => {
  if (!dateString) return false;
  try {
    const combined = timeString ? `${dateString}T${timeString}` : `${dateString}T23:59:59`;
    const eventDate = new Date(combined);
    return eventDate.getTime() < new Date().getTime();
  } catch {
    return false;
  }
};

export const formatPriceRange = (priceRanges) => {
  if (!priceRanges || !priceRanges.length) return 'Standard Admission';
  const p = priceRanges[0];
  if (p.min && p.max && p.min !== p.max) {
    return `$${p.min} - $${p.max} ${p.currency || 'USD'}`;
  }
  if (p.min) return `From $${p.min} ${p.currency || 'USD'}`;
  return 'Paid Event';
};

export const getBestEventImage = (images) => {
  if (!images || !images.length) {
    return 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80';
  }
  return images[0].url;
};

export const getVenueInfo = (event) => {
  const venue = event?._embedded?.venues?.[0];
  if (!venue) return { name: 'Venue TBA', city: 'Location TBA', address: '' };

  const name = venue.name || 'Venue TBA';
  const city = venue.city?.name || '';
  const state = venue.state?.stateCode || '';
  const country = venue.country?.name || '';
  const address = venue.address?.line1 || '';

  const location = [city, state, country].filter(Boolean).join(', ');

  return {
    name,
    city: location || 'Location TBA',
    address,
    postalCode: venue.postalCode || '',
  };
};

export const getCategoryBadge = (event) => {
  const seg = event?.classifications?.[0]?.segment?.name;
  const genre = event?.classifications?.[0]?.genre?.name;
  if (seg && genre && genre !== 'Undefined') {
    return `${seg} / ${genre}`;
  }
  return seg || 'General';
};
