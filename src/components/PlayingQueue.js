import React, {useState,useEffect} from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Paper } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import QueueListCard from './QueueListCard';

const DRAWER_DIRECTION = 'right';
const useStyles = makeStyles((theme) => ({
    list: {
      '@media only screen and (min-width: 960px)' :{
        /* styles for browsers larger than 960px; */
        width: '50vw',
      },
      '@media only screen and (min-width: 1440px)' :{
          /* styles for browsers larger than 1440px; */
        width: '50vw',
      },
      '@media only screen and (min-width: 2000px)' :{
          /* for sumo sized (mac) screens */
        width: '50vw',
      },
      '@media only screen and (max-device-width: 480px)' :{
        /* styles for mobile browsers smaller than 480px; (iPhone) */
        width: '90vw',
      },
      '@media only screen and (device-width: 768px)' :{
        /* default iPad screens */
        width: '90vw',
      },
      /* different techniques for iPad screening */
      '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)' :{
        /* For portrait layouts only */
        width: '90vw',
      },

      '@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)' :{
        /* For landscape layouts only */
        width: '90vw',
      }

    },
    fullList: {
      width: 'auto',
    },
    stickyQueue: {
      position: 'fixed',
      top:'50%',
      right:'0',
    },
    stickyQueue__Paper: {
      backgroundColor: '#a9dad9',
      paddingTop:'15px',
      paddingBottom:'15px',
      opacity: '0.7'
    },


    topPane: {
      height: "100%",
      width: "100%",
      backgroundColor: '#dddffe',
    },
    footer: {
      position: "fixed",
      width: "100%",
      color: "white",
    }

  }));

function PlayingQueue(props) {
    const classes = useStyles();
    const [list, setList] = useState(null);

    useEffect(()=>{

      if(props.queueList!=null){
        setList(props.queueList.map(item=>{
          return (
            <Grid item key={item.videoID}>
              <QueueListCard
                  key={item.videoID}
                  id={item.videoID}
                  name={item.videoName}
                  src={item.imageSrc}
                  channelName={item.channelName}

                  nowPlaying={props.currentTrack}
                  
                  // loadMedia={handleloadMedia}
                  // removeTrackFromPlaylist={handleRemoveTrackFromPlaylist}
              />
            </Grid>
          )
        }));

      }
      
    }, [props.queueList, props.currentTrack])



    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const queue = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className = {classes.topPane}>
          <Grid>
            {list}
          </Grid>
        </div>

        
        {/* <div className = {classes.footer}>
          FOOTER
        </div> */}

      </div>
    );





    return (
        <div>
           
          <React.Fragment key={DRAWER_DIRECTION}>

            {
              props.queueList !=null ?
            <div className={classes.stickyQueue}>
              <Paper className={classes.stickyQueue__Paper}>
                <IconButton size="small" edge="end" aria-label="queueList" onClick={toggleDrawer(DRAWER_DIRECTION, true)} title="Queue List">
                  <DragIndicatorIcon />
                </IconButton>
              </Paper>
            </div>
              :null

            }

            <Drawer 
              anchor={DRAWER_DIRECTION}
              open={state[DRAWER_DIRECTION]}
              onClose={toggleDrawer(DRAWER_DIRECTION, false)}
              onOpen={toggleDrawer(DRAWER_DIRECTION, true)}
            >
              {queue(DRAWER_DIRECTION)}
            </Drawer>
          </React.Fragment>



            
        </div>
    )
}

export default PlayingQueue
