import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImgMediaCard from './Cards';


const Item = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));


let Products = () => {



return(

  

<Box sx={{ flexGrow: 1, display:"flex", justifyContent:"center", alignItems:"center", height:"100%", width:"100%" }}>
  <Grid container spacing={{ xs: 2, md: 3 }} columns={20} sx={{ flexGrow: 1, display:"flex", justifyContent:"center", alignItems:"center", height:"100%", width:"100%" }}>
    {Array.from(Array(10)).map((_, index) => (
      <Grid item xs={4} sm={4} md={4} key={index}  >
       <Item
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    p: 0,
    m: 0,
    border: "none",
  }}
>
          <ImgMediaCard  />
        </Item>
      </Grid>
    ))}
  </Grid>
</Box>


)



}

export default Products