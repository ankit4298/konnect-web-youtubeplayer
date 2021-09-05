import { useState, useEffect } from "react";
import Card from "./DnDCard";
import update from "immutability-helper";
import { updatePlaylistByID } from "../../services/DBService";

const style = {
  width: 400,
};

export default function DnDContainer(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (props.musicObj == null && props.musicObj.length == 0) {
      return;
    }

    setCards(props.musicObj);
  }, [props.musicObj]);

  useEffect(() => {
    if (props.onPlaylistSave == null) {
      return;
    }

    handlePlayListDBUpdate(props.onPlaylistSave.playlistID, cards);
  }, [props.onPlaylistSave]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  // fires when card drop is completed
  const handleDropComplete = () => {};

  // updated DB
  const handlePlayListDBUpdate = (playlistID, musicObj) => {
    const result = updatePlaylistByID(playlistID, musicObj);

    if (result != null) {
      console.log("Updated Playlist");
      alert("Playlist updated successfully !!!");
    } else {
      console.error("Error while updating Playlist !!!");
    }
  };

  return (
    <div style={style}>
      {cards.map((card, i) => (
        <Card
          key={card.videoID}
          index={i}
          id={card.videoID}
          text={card.videoName}
          image={card.imageSrc}
          moveCard={moveCard}
          dropComplete={handleDropComplete}
        />
      ))}
    </div>
  );
}
