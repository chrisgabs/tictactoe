import type { NextPage } from 'next'
import { stringify } from 'querystring';
import styles from '../styles/Tictactoe.module.sass'

let dragged : any = null

const onDragStart = (e: any) => {
    // e.dataTransfer.setData("text", e.target.id)
    // e.dataTransfer.setData("hatdog", e.target.id)
    dragged = e.target
}

const dragOver = (e: any) => {
    e.preventDefault()
}

const onDragEnd = (e: any) => {
    dragged = null
}

const drop = (e: any, accepts?:string) => {
    // console.log(dragged)    
    // remove when implementing kain mechanics
    if (dragged == null || e.target.children.length > 0) 
        return
    if (accepts == undefined || accepts == dragged.id.substring(0,2)) {
        dragged.parentNode.removeChild(dragged)
        e.target.appendChild(dragged)
        dragged.setAttribute("draggable", "return false")
        dragged.setAttribute("onDragStart", "return false")
    }
    console.log("dropped")
}

const createPieces = (player: number) => {
    let pieces: any = []
    for (let i = 0, size = 30; i < 5; i++, size += 5) {
        let p = <div
            id={"p" + player + "s" + i}
            className={"piece p" + player}
            draggable="true"
            style={{ width: size + "px", height: size + "px" }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}> </div>
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
                onDrop={e => drop(e)}></div>
            tiles.push(tile)
        }
        let row: any = <div className="row">{tiles}</div>
        rows.push(row)
    }
    return rows;
}

const TicTacToe: NextPage = () => {

    return (
        <div id="main-container">
            <div className="pieces-container">
                {createPieces(1)}
            </div>

            <div className="parent">
                {createTiles()}
            </div>

            <div className="pieces-container">
                {createPieces(2)}
            </div>
        </div>
    )
}

export default TicTacToe