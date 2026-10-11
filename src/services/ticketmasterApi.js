import { MOCK_EVENTS } from './mockEvents';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const getApiKey = () => {
  const localKey = localStorage.getItem('user_api_key');
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  return import.meta.env.VITE_TICKETMASTER_API_KEY || '';
};

export const saveApiKey = (key) => {
  if (key && key.trim()) {
    localStorage.setItem('user_api_key', key.trim());
  } else {
    localStorage.removeItem('user_api_key');
  }
};

export const fetchEventsApi = async (params = {}) => {
  const apiKey = getApiKey();
  const {
    keyword = '',
    classificationName = '',
    city = '',
    sort = 'date,asc',
    page = 0,
    size = 9,
  } = params;

  if (!apiKey || apiKey === 'your_ticketmaster_api_key_here') {
    return filterMockEvents({
      keyword,
      classificationName,
      city,
      sort,
      page,
      size,
    });
  }

  try {
    const query = new URLSearchParams({
      apikey: apiKey,
      size: size.toString(),
      page: page.toString(),
      sort,
    });

    if (keyword) query.append('keyword', keyword);
    if (classificationName && classificationName !== 'All') {
      query.append('classificationName', classificationName);
    }
    if (city) query.append('city', city);

    const response = await fetch(`${BASE_URL}/events.json?${query.toString()}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    const events = data._embedded ? data._embedded.events : [];
    const pageInfo = data.page || {
      size,
      totalElements: events.length,
      totalPages: Math.ceil(events.length / size),
      number: page,
    };

    return {
      events,
      page: pageInfo,
      isLive: true,
    };
  } catch (error) {
    return {
      ...filterMockEvents({ keyword, classificationName, city, sort, page, size }),
      isLive: false,
      error: error.message,
    };
  }
};

export const fetchEventDetailsApi = async (eventId) => {
  const apiKey = getApiKey();

  if (eventId.startsWith('tm_mock_') || !apiKey || apiKey === 'your_ticketmaster_api_key_here') {
    const found = MOCK_EVENTS.find((e) => e.id === eventId);
    return { event: found || MOCK_EVENTS[0], isLive: false };
  }

  try {
    const response = await fetch(`${BASE_URL}/events/${eventId}.json?apikey=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Failed to load event details`);
    }
    const data = await response.json();
    return { event: data, isLive: true };
  } catch (err) {
    const fallback = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0];
    return { event: fallback, isLive: false, error: err.message };
  }
};

function filterMockEvents({ keyword, classificationName, city, sort, page, size }) {
  let list = [...MOCK_EVENTS];

  if (keyword) {
    const kw = keyword.toLowerCase();
    list = list.filter(
      (ev) =>
        ev.name.toLowerCase().includes(kw) ||
        (ev.info && ev.info.toLowerCase().includes(kw))
    );
  }

  if (classificationName && classificationName !== 'All') {
    list = list.filter((ev) => {
      const seg = ev.classifications?.[0]?.segment?.name;
      return seg && seg.toLowerCase() === classificationName.toLowerCase();
    });
  }

  if (city) {
    const c = city.toLowerCase();
    list = list.filter((ev) => {
      const cityName = ev._embedded?.venues?.[0]?.city?.name;
      return cityName && cityName.toLowerCase().includes(c);
    });
  }

  if (sort === 'date,asc') {
    list.sort((a, b) => new Date(a.dates?.start?.localDate || 0) - new Date(b.dates?.start?.localDate || 0));
  } else if (sort === 'date,desc') {
    list.sort((a, b) => new Date(b.dates?.start?.localDate || 0) - new Date(a.dates?.start?.localDate || 0));
  } else if (sort === 'name,asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name,desc') {
    list.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalElements = list.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const start = page * size;
  const paginated = list.slice(start, start + size);

  return {
    events: paginated,
    page: {
      size,
      totalElements,
      totalPages,
      number: page,
    },
    isLive: false,
  };
}
