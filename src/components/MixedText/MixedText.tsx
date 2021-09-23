/* eslint-disable react/destructuring-assignment */
import { Box, Typography } from '@mui/material';
import React from 'react';

type props = {
    boldedText: string,
    normalText: string
}
const MixedText: React.FC<props> = (props) => (
  <Typography component="div" variant="h5">
    <Box display="inline" fontWeight="fontWeightBold">{props.boldedText}</Box>
    {props.normalText}
  </Typography>
);

export default MixedText;
