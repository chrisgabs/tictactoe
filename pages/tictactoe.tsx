import type { NextPage } from 'next'
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
    return (
        <div id="main-container">
            <div className="pieces-container" onDrop={drop} onDragOver={dragOver}>
                <div id="PIECE1" className="piece s1 p1" draggable="true" onDrag={drag}></div>
                <div className="piece s2 p1"></div>
                <div className="piece s3 p1"></div>
                <div className="piece s4 p1"></div>
                <div className="piece s5 p1"></div>
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
                <div className="piece s1 p2"></div>
                <div className="piece s2 p2"></div>
                <div className="piece s3 p2"></div>
                <div className="piece s4 p2"></div>
                <div className="piece s5 p2"></div>
            </div>
        </div>
    )
}

export default TicTacToe