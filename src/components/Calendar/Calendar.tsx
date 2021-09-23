/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { TextField, Button, DialogActions } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField as TextMuiField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  ProcessedEvent,
  Scheduler,
  SchedulerHelpers,
} from '@aldabil/react-scheduler';
import { LocalizationProvider } from '@mui/lab';

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {
  const event = scheduler.edited;

  // Make your own form/state
  const [state, setState] = useState({
    title: event?.title || '',
    description: event?.description || '',
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
            event_id: event?.event_id || Math.random(),
            title: state.title,
            start: state.start,
            end: state.end,
            description: state.description,
            group: state.group,
            location: state.location,
          });
        }, 3000);
      })) as ProcessedEvent;
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
            label="כותרת"
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
  return (
    <Scheduler
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      viewerExtraComponent={(fields, event) => (
        <div>
          <p>Useful to render custom fields...</p>
          <p>
            Description:
            {event.location || 'Nothing...'}
          </p>
        </div>
      )}
    />
  );
}

export default Calender;
