    import { useState } from "react"

    export default function Player({ initialname, symbol }){
        const [playerName, setPlayerName] = useState(initialname);
        const [isEditing, setIsEditing ] = useState(false);
        
        function handleEditClick(){
            setIsEditing((editing) => !editing);
        }

        function handleChange(event){
            console.log(event);
            setPlayerName(event.target.value);
        }

        let editablePlayerName = <span className="player-name">{playerName}</span>

        if(isEditing){
            editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
        }
        return(
            <li>
                <span className="player">  
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditClick}>{isEditing ? 'SAVE' : 'EDIT'}</button>
            </li>
        )
    }