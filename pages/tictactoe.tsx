import type { NextPage } from 'next'
import { stringify } from 'querystring';
import styles from '../styles/Tictactoe.module.sass'

let dragged : any = null;

const drag = (e: any) => {
    e.dataTransfer.setData("text", e.target.id)
    e.dataTransfer.setData("hatdog", e.target.id)
    dragged = e.target
}

const dragOver = (e: any) => {
    e.preventDefault()
}

const drop = (e: any) => {
    console.log(e)
    dragged.parentNode.removeChild(dragged);
    e.target.appendChild(dragged)
    console.log("dropped")
}

const TicTacToe: NextPage = () => {

    const createPieces = (player:number) => {
        let pieces: any = []
        for (let i = 0, size = 30; i < 5; i++, size+=5) {
            let p = <div 
                id={"p" + player +"s" + i} 
                className={"piece p" + player} 
                draggable="true" 
                style={{ width: size + "px", height: size + "px" }}
                onDrag={drag}> </div>
            pieces.push(p)
        }
        return pieces;
    }

    const createTiles = () => {
        let rows: any = []
        let tileNum = 0
        for (let i = 0; i < 3; i++) {
            let tiles = []
            for (let i = 0; i < 3; i++, tileNum++) {
                let tile = <div 
                className="tile" 
                id={"t" + tileNum} 
                onDragOver={dragOver} 
                onDrop={drop}></div>
                tiles.push(tile)
            }
            let row: any = <div className="row">{tiles}</div>
            rows.push(row)
        }
        return rows;
    }

    return (
        <div id="main-container">
            <div className="pieces-container" onDrop={drop} onDragOver={dragOver}>
                {createPieces(1)}
            </div>

            <div className="parent">
                {createTiles()}
            </div>

            <div className="pieces-container" onDrop={drop} onDragOver={dragOver}>
                {createPieces(2)}
            </div>
        </div>
    )
}

export default TicTacToe