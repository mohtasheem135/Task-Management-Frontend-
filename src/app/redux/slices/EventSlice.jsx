// store/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    // addEvent: (state, action) => {
    //   state.events.push(action.payload);
    // },
    // updateEvent: (state, action) => {
    //   const { id, updatedEvent } = action.payload;
    //   const index = state.events.findIndex(event => event.id === id);
    //   if (index !== -1) {
    //     state.events[index] = updatedEvent;
    //   }
    // },
    // removeEvent: (state, action) => {
    //   state.events = state.events.filter(event => event.id !== action.payload);
    // },
  },
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;

