// normalize object to Array of JSON object
function normalizeObject(obj){
    let _obj = [];
    const arrayConstructor = [].constructor;
    const objectConstructor = ({}).constructor;

    // convert music object to array of object
    if(obj.constructor === objectConstructor){
        _obj.push(obj);
    }else{
        _obj = obj;
    }

    return _obj;
}


function musicDispatcher(list, pointer){
    if(list != null){   
        return list[pointer];
    }
}

function playNext(list, pointer){
    if(list != null){   
        const _p = pointer + 1;
        if(list[_p] !== undefined)
            return [list[_p], _p]
        else
            return [null, -1];
    }
}

function playPrevious(list, pointer){
    if(list != null){   
        const _p = pointer - 1;
        if(list[_p] !== undefined)
            return [list[_p], _p]
        else
            return [null, -1];
    }
}

function AddToQueue(list, newTrack){

    let _list = list;
    console.log(_list)
    if(_list!=null){
        _list.push(newTrack);
    }else{
        _list = [];
        _list.push(newTrack);
    }
    return _list;
}

export {normalizeObject, musicDispatcher, playNext, playPrevious, AddToQueue}