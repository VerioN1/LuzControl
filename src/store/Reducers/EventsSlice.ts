/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from '../../types/EventType';

const initialState: IEvent[] = [];

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearEvents: (state) => {
      state = [];
    },
    deleteEvent: (state, action: PayloadAction<IEvent>) => {
      state.filter((value) => value === action.payload);
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearEvents, deleteEvent, addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
