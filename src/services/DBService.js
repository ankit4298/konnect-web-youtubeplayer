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


//#region ------ private Functions
async function updatePlaylistByID(playlistID, musicData){
    const { data, error } = await supabase
        .from('Playlist')
        .update({ data : musicData, 'ModifiedDate':new Date() })
        .eq('id', playlistID)
}

//#endregion -------------------------

export {Auth, getPlaylistsIDName, getPlaylistByID, saveToPlaylist}