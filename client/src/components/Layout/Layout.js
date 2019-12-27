import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import styles from './styles';

const useStyles = makeStyles(styles);

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Hush
          </Typography>
          <IconButton color="inherit" component={RouterLink} to="/new">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid className={classes.content} container justify="center">
        <Grid item xs={12} sm={10} md={8}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
