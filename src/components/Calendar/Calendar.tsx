/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { TextField, Button, DialogActions, Typography } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField as TextMuiField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  ProcessedEvent,
  Scheduler,
  SchedulerHelpers,
} from '@aldabil/react-scheduler';
import { LocalizationProvider } from '@mui/lab';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../../store/store';
import { IEvent } from '../../types/EventType';
import Events from './Events';

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;
  const userData = useSelector((state: RootState) => state.userData);
  const config = {
    headers: { Authorization: `Bearer ${userData.token}` },
  };
  // Make your own form/state
  const [state, setState] = useState({
    event_id: event?.event_id || Math.random().toString(),
    title: event?.title || '',
    creator: userData.name,
    course: userData.course,
    group: event?.group || '',
    location: event?.location || '',
    start: event?.start || scheduler.state.start.value,
    end: event?.end || scheduler.state.end.value,
  });

  const handleChange = (value: string, name: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    // Your own validation
    if (state.title.length < 3) {
      return alert('error witn length');
    }

    try {
      scheduler.loading(true);

      /** Simulate remote data saving */
      const addedUpdatedEvent = (await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */

        setTimeout(() => {
          res({
            event_id: event?.event_id.toString() || Math.random().toString(),
            title: `${state.title} - ${state.location}`,
            start: state.start,
            end: state.end,
            group: state.group,
            location: state.location,
            creator: userData.name,
            course: userData.course,
          });
        }, 0);
      })) as ProcessedEvent;
      // await axios.post(`${process.env.REACT_APP_BACKEND_API}/v1/events`, state, config);
      window.localStorage.setItem('Events', JSON.stringify(state));
      scheduler.onConfirm(addedUpdatedEvent, event ? 'edit' : 'create');
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <div style={{
          padding: '2rem', display: 'flex', flexDirection: 'column', width: '450px',
        }}
        >
          <TextField
            style={{ marginBottom: '2rem' }}
            label="שם קורס"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, 'title')}
            helperText="at least 3 chars"
            fullWidth
          />
          <TextField
            style={{ marginBottom: '2rem' }}
            label="מיקום"
            value={state.location}
            onChange={(e) => handleChange(e.target.value, 'location')}
            fullWidth
          />
          <TextField
            style={{ marginBottom: '2rem' }}
            label="ציר"
            value={state.group}
            onChange={(e) => handleChange(e.target.value, 'group')}
            fullWidth
          />
          <div style={{ display: 'flex' }}>
            <DateTimePicker
              label="שעת התחלה"
              value={state.start}
              onChange={(e) => handleChange(e, 'start')}
              renderInput={(params) => <TextMuiField {...params} />}
            />
            <DateTimePicker
              label="שעת סיום"
              value={state.end}
              onChange={(e) => handleChange(e, 'end')}
              renderInput={(params) => <TextMuiField {...params} />}
            />
          </div>
        </div>
        <DialogActions>
          <Button onClick={scheduler.close}>ביטול</Button>
          <Button onClick={handleSubmit}>אישור</Button>
        </DialogActions>
      </div>
    </LocalizationProvider>
  );
};


function Calender() {

  const Events1 = window.localStorage.getItem('Events') ?? JSON.stringify(Events);
  console.log(Events1);
  return (
    <Scheduler
      events={Events}
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      viewerExtraComponent={(fields, event) => (
        <div>
          <Typography>
            יוצר:
            {event.creator || event.location}
          </Typography>
        </div>
      )}
    />
  );
}

export default Calender;
