// pass list, it will automatially arrange every item in MusicCard view

import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MusicCard from './MusicCard'
import PlaylistHeaderView from './PlaylistHeaderView'

import {removeFromPlaylistByID} from "../services/DBService"

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
    const [playListHeaderObj, setPlayListHeaderObj] = useState([]);
    const [musicObj, setMusicObj] = useState([]);

    const handleloadMedia = (musicObj) => {
        // pass parameters which needs to pass to final IndexPanel component with music Obj
        props.loadMediaRef(musicObj);
    }

    const handleloadPlaylist = (playlistObj, queueStart=false) => {
      // pass parameters which needs to pass to final IndexPanel component with playlist Obj
      // runs playlistRef prop's function from IndexPanel
      props.playlistRef(playlistObj, queueStart);
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
                      playlistMode={true}
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

      // set selected playlist header view card object
      setPlayListHeaderObj(props.playlistObj)
      setMusicObj(props.playlistTracks)

      // set tracks card from playlist
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
                      playlistTrack={true}
                      playlistObj={props.playlistObj}
                      removeTrackFromPlaylist={handleRemoveTrackFromPlaylist}
                  />
              </Grid>
          )
      }));
    }, [props.playlistTracks, props.playlistObj])


    const handleRemoveTrackFromPlaylist = async (musicPlaylistObj) => {

      let _trackObj = musicPlaylistObj.track;
      let _playlistObj = musicPlaylistObj.playlist;

      try{
        const data = await removeFromPlaylistByID(_playlistObj.playlistID, _trackObj.videoID);
        
        if(data) {
          // refresh view
          props.playlistRef(_playlistObj, false);
        }else{
          console.log('Something went wrong !!!');
        }
      }catch(e){
        console.log(e);
      }

    }

  return (
    <div>
      {props.playlistObj === undefined ? null : (
        <Grid style={{ padding: "10px" }}>
          <PlaylistHeaderView
            musicObj={musicObj}
            playlistObj={playListHeaderObj}
            loadPlaylist={handleloadPlaylist}
          />
        </Grid>
      )}
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
