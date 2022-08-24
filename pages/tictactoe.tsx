import type { NextPage } from 'next'
import { stringify } from 'querystring';
import styles from '../styles/Tictactoe.module.sass'

let dragged : any = null;

const drag = (e: any) => {
    e.dataTransfer.setData("text", e.target.id)
    e.dataTransfer.setData("hatdog", e.target.id)
    dragged = e.target
    // console.log(e.target);
    // console.log("dragged")
}

const dragOver = (e: any) => {
    e.preventDefault()
    // console.log(e);
}

const drop = (e: any) => {
    console.log(e)

    // e.preventDeafult()
    // let data = e.dataTransfer.getData("text")
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

    return (
        <div id="main-container">
            <div className="pieces-container" onDrop={drop} onDragOver={dragOver}>
                {createPieces(1)}
            </div>

            <div className="parent">
                <div className="row">
                    <div className="tile" id="t1" onDragOver={dragOver} onDrop={drop}></div>
                    <div className="tile" id="t2"></div>
                    <div className="tile" id="t3"></div>
                </div>
                <div className="row">
                    <div className="tile" id="t4"></div>
                    <div className="tile" id="t5"></div>
                    <div className="tile" id="t6"></div>
                </div>
                <div className="row">
                    <div className="tile" id="t7"></div>
                    <div className="tile" id="t8"></div>
                    <div className="tile" id="t9"></div>
                </div>
            </div>

            <div className="pieces-container">
                {createPieces(2)}
            </div>
        </div>
    )
}

export default TicTacToe