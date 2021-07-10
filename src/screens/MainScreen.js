import React from 'react'
import IndexPanel from './IndexPanel'
import MusicScreen from './MusicScreen'

function MainScreen() {

   
    const splitScreen = {
        display: 'flex',
        flexDirection: 'column'
    }
    const topPane = {
        height: '85vh',
    }
    const bottomPane = {
        height: '10vh',
    }

    return (
        <div style={splitScreen}>
            <div style={topPane}><IndexPanel/></div>
            <div style={bottomPane}><MusicScreen/></div>
        </div>
    )
}

export default MainScreen
