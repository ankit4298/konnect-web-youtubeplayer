// pass list, it will automatially arrange every item in MusicCard view

import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
        // pass parameters which needs to pass to final IndexPanel component with music Obj
        props.loadMediaRef(musicObj);
    }

    const handleloadPlaylist = (playlistObj) => {
      // pass parameters which needs to pass to final IndexPanel component with playlist Obj
      props.playlistRef(playlistObj);
  }

    // run's on component load
    // useEffect for loading YT Query cards
    useEffect(() => {

        if(props.list == null){
          return;
        }

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


    // useEffect for loading playlists
    useEffect(() => {

      if(props.playlists == null){
        return;
      }

      setCardList(props.playlists.map(item=>{
          return (
              <Grid item xs={12} sm={6} md={3} lg={3} key={item.id}>
                  <MusicCard
                      key={item.id}
                      id={item.id}
                      name={item.playlistname}
                      src={"https://picsum.photos/600/400"}
                      channelName={new Date(Date.parse(item.CreatedDate)).toLocaleString()}
                      disableAdd={true}
                      playlistCard={true}
                      loadPlaylist={handleloadPlaylist}
                  />
              </Grid>
          )
      }));
    }, [props.playlists])
    

    // useEffect for loading playlist music cards
    useEffect(() => {

      if(props.playlistTracks == null){
        return;
      }

      setCardList(props.playlistTracks.map(item=>{
          return (
              <Grid item xs={12} sm={6} md={3} lg={3} key={item.videoID}>
                  <MusicCard
                      key={item.videoID}
                      id={item.videoID}
                      name={item.videoName}
                      src={item.imageSrc}
                      channelName={item.channelName}
                      loadMedia={handleloadMedia}
                  />
              </Grid>
          )
      }));
    }, [props.playlistTracks])


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
