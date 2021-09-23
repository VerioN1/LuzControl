import { Checkbox, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Calender from '../../components/Calendar/Calendar';
import { RootState } from '../../store/store';

const CalenderPage = () => {
  const getAllEvents = async () => {
    const config = {
      headers: { Authorization: `Bearer ${userData.token}` },
    };
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_API}/v1/events`, config);
    return data;
  };

  const userData = useSelector((state: RootState) => state.userData);
  const loadEvents = useQuery('events', getAllEvents, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  if (loadEvents.isSuccess) {
    return (
      <div>
        <Calender />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" color="initial">קורס ממס</Typography>
        <Checkbox />
        <Typography variant="h6" color="initial">קורס אחמ בוגרים</Typography>
        <Checkbox />
        <Typography variant="h6" color="initial">קורס אפולו</Typography>
        <Checkbox />
        <Typography variant="h6" color="initial">קורס ממס בוגרים</Typography>
        <Checkbox defaultChecked />

      </div>
      <Calender />
    </div>
  );
};

export default CalenderPage;
