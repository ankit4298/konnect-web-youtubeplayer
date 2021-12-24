import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie';
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function Auth() {
    // TODO: add supabase auth
    console.log('AUTH connected');
}

async function getPlaylistsIDName () {
    // console.log('Cache DEBUG:: ', Cookies.get('KXCACHE_PLAYLIST_LOAD') != "10-4", Cookies.get('KXUCHANGE') != "0");

    // caching for performance 
    // saving playlist id, name for 10 minutes and fetching from localstorage
    if(Cookies.get('KXCACHE_PLAYLIST_LOAD') != "10-4" || Cookies.get('KXUCHANGE') != "0"){   
        console.log('setting cache');
        const { data, error } = await supabase
        .from('Playlist')
        .select('id,playlistname,CreatedDate')
        .eq('userid', Cookies.get('KXUNAME'))

        Cookies.set('KXCACHE_PLAYLIST_LOAD', "10-4", { expires: 0.007, path: '' }); //cookie set for 10 mins
        Cookies.set('KXUCHANGE', "0"); // setting same user logged in
        localStorage.setItem('KXCACHE_PLAYLIST_LOAD', JSON.stringify(data));

        return data;
    }
    else{
        console.log('from cache');
        const data = localStorage.getItem('KXCACHE_PLAYLIST_LOAD');
        // console.log(JSON.parse(data))
        return JSON.parse(data);
    }
}

async function getPlaylistByID(playlistID) {
    const { data, error } = await supabase
        .from('Playlist')
        .select()
        .eq('userid', Cookies.get('KXUNAME'))
        .eq('id', playlistID)
    
    return data;
}

async function saveToPlaylist (playlistid, musicData) {

    musicData["AddedDate"] = new Date();

    const plist = await getPlaylistByID(playlistid);
    let plistData = plist[0]["data"];

    if(plistData == null){
        plistData = [];
    }

    plistData.push(musicData); // append new track to existing playlist
    await updatePlaylistByID(playlistid ,plistData);
    console.log('Saved to playlist')
}

async function createPlaylist (username, playlistName) {
    const data = await insertIntoPlaylistTable(username, playlistName)
    if(data != null){
        console.log('Playlist created successfully')
        Cookies.set('KXUCHANGE', '1'); // refresh cache as new playlist is created
        return data[0].id;
    }else{
        return null;
    }
}

async function removeFromPlaylistByID (playlistID, videoID) {
    // fetch full playlist
    const fullPlist = await getPlaylistByID(playlistID);
    
    // new list
    const newList = removeFromJSONArray(fullPlist[0]["data"], videoID);

    // update list into DB
    const data = await updatePlaylistByID(playlistID, newList);
    if(data != null) {
        console.log('Removed from playlist');
        return true;
    }else{
        return false;
    }
}

async function removePlaylistByID(playlistID) {
    const username = Cookies.get('KXUNAME');
    const error = await deletePlaylistByID(playlistID, username);
    if(error==null) {
        console.log('Playlist deleted successfully')
        Cookies.set('KXUCHANGE', '1'); // refresh cache as playlist is deleted
        return true;
    }else{
        return false;
    }
}

async function updatePlaylistByID(playlistID, musicData){
    const { data, error } = await supabase
        .from('Playlist')
        .update({ data : musicData, 'ModifiedDate':new Date() })
        .eq('id', playlistID)

    return data;
}


//#region ------ private Functions

async function insertIntoPlaylistTable(username, playlistName){
    const { data, error } = await supabase
        .from('Playlist')
        .insert([
            { playlistname: playlistName, userid: username, data:[] },
        ]);
    
    return data;
}

async function deletePlaylistByID(playlistID, username){
    const { data, error } = await supabase
        .from('Playlist')
        .delete()
        .eq('id', playlistID)
        .eq('userid', username);
    
    return error;
}

function removeFromJSONArray(obj, videoID) {
    let temp=obj;
    let vidx = -99;

    obj.forEach((e, i) => {
        if(e.videoID == videoID) {
            vidx=i;
        }
    });

    if(vidx != -99 || vidx != -1) {
        temp.splice(vidx, 1)
    }

    return temp;
}


//#endregion -------------------------

export {
    Auth,
    getPlaylistsIDName,
    getPlaylistByID,
    saveToPlaylist,
    createPlaylist,
    removeFromPlaylistByID,
    removePlaylistByID,
    updatePlaylistByID
}