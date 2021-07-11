// pass list, it will automatially arrange every item in MusicCard view

import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MusicCard from './MusicCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
export default function CardGridView(props) {
  const classes = useStyles();

    const [cardList, setCardList] = useState([]);


    const handleloadMedia = (musicObj) => {
        // pass parameters which needs to pass to final IndexPanel component
        props.loadMediaRef(musicObj);
    }

    // run's on component load
    useEffect(() => {
      
        setCardList(props.list.map(item=>{
            return (
                <Grid item xs={12} sm={6} md={3} lg={3} key={item.link}>
                    <MusicCard
                        key={item.link}
                        id={item.link}
                        name={item.title}
                        src={item.thumbnail}
                        channelName={item.channelName}
                        loadMedia={handleloadMedia}
                    />
                </Grid>
            )
        }));
    }, [props.list])



  return (
    <div>

        <Grid
        container
        spacing={2}
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        // style={{ minHeight: '100vh' }}
        >
            {cardList}
        </Grid>

        
    </div>
  );
}
