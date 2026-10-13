import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventsApi, fetchEventDetailsApi } from '../services/ticketmasterApi';

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (customParams = {}, { getState }) => {
    const state = getState().events;
    const params = {
      keyword: customParams.keyword !== undefined ? customParams.keyword : state.filters.keyword,
      classificationName:
        customParams.classificationName !== undefined
          ? customParams.classificationName
          : state.filters.classificationName,
      city: customParams.city !== undefined ? customParams.city : state.filters.city,
      sort: customParams.sort !== undefined ? customParams.sort : state.filters.sort,
      page: customParams.page !== undefined ? customParams.page : state.filters.page,
      size: 9,
    };
    const res = await fetchEventsApi(params);
    return res;
  }
);

export const getEventDetails = createAsyncThunk(
  'events/getEventDetails',
  async (eventId) => {
    const res = await fetchEventDetailsApi(eventId);
    return res;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    selectedEvent: null,
    loading: false,
    error: null,
    isLive: false,
    page: {
      number: 0,
      size: 9,
      totalElements: 0,
      totalPages: 1,
    },
    filters: {
      keyword: '',
      classificationName: 'All',
      city: '',
      sort: 'date,asc',
      page: 0,
    },
    categories: ['All', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'],
  },
  reducers: {
    setKeyword: (state, action) => {
      state.filters.keyword = action.payload;
      state.filters.page = 0;
    },
    setCategory: (state, action) => {
      state.filters.classificationName = action.payload;
      state.filters.page = 0;
    },
    setCity: (state, action) => {
      state.filters.city = action.payload;
      state.filters.page = 0;
    },
    setSort: (state, action) => {
      state.filters.sort = action.payload;
      state.filters.page = 0;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        keyword: '',
        classificationName: 'All',
        city: '',
        sort: 'date,asc',
        page: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.events || [];
        state.page = action.payload.page || state.page;
        state.isLive = action.payload.isLive || false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload.event || null;
      })
      .addCase(getEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setKeyword,
  setCategory,
  setCity,
  setSort,
  setPage,
  resetFilters,
} = eventsSlice.actions;

export default eventsSlice.reducer;
