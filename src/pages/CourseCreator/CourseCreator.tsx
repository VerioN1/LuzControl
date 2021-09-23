import Button from '@material-ui/core/Button';
import React from 'react';
import CreateClass from '../../assets/CreateClass';

const CourseCreator = () => (
  <div className="middle-login" style={{ height: '90%', overflow: 'hidden' }}>
    <CreateClass />
    <Button style={{ padding: '20px 50px' }} variant="contained" color="secondary" size="large">צור קורס</Button>
  </div>
);

export default CourseCreator;
