import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
class TopBar extends Component{

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className="title">
            {this.props.title}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const styles = theme => ({
  root: {
    width: '100%',
    background: '#07bdbe'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
});
export default withStyles(styles)(TopBar);
