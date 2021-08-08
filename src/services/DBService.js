import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie';
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function Auth() {
    console.log('AUTH connected');
}

async function getAllPlaylistData() {
    const { data, error } = await supabase
        .from('Playlist')
        .select('playlistname,data,CreatedDate')
        .eq('userid', Cookies.get('KXUNAME'))
        
    console.log(data);
}

async function getPlaylists () {
    const { data, error } = await supabase
        .from('Playlist')
        .select('id,playlistname')
        .eq('userid', Cookies.get('KXUNAME'))
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


//#region ------ private Functions
async function getPlaylistByID(playlistID) {
    const { data, error } = await supabase
        .from('Playlist')
        .select()
        .eq('userid', Cookies.get('KXUNAME'))
        .eq('id', playlistID)
    
    return data;
}

async function updatePlaylistByID(playlistID, musicData){
    const { data, error } = await supabase
        .from('Playlist')
        .update({ data : musicData, 'ModifiedDate':new Date() })
        .eq('id', playlistID)
}

//#endregion -------------------------

export {Auth, getAllPlaylistData, getPlaylists, saveToPlaylist}