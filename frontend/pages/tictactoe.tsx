import type { NextPage } from 'next'
import { stringify } from 'querystring';
import React from 'react';
import styles from '../styles/Tictactoe.module.sass'
import { useEffect, useState, } from "react";
import io from 'socket.io-client'

const socket = io("http://localhost:3001", {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});

const TicTacToe: NextPage = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [lastPong, setLastPong] = useState<any>(null);
    const [dragged, setDragged] = useState<any>(null);
    const [playerNum, setPlayerNum] = useState<number>(1);
    const [playerTurn, setPlayerTurn] = useState<number>(1);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('pong', () => {
            setLastPong(new Date().toISOString());
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    const onDragStart = (e: any) => {
        // e.dataTransfer.setData("text", e.target.id)
        // e.dataTransfer.setData("hatdog", e.target.id)
        setDragged(e.target)
        socket.emit("ping", "hello")
        console.log(socket);
    }

    const dragOver = (e: any) => {
        e.preventDefault()
    }

    const onDragEnd = (e: any) => {
        setDragged(null)
    }

    const drop = (e: any, accepts?: string) => {
        if (e.target.id.substring(0, 1) == "p") {
            if (dragged.id.substring(dragged.id.length - 1) > e.target.id.substring(e.target.id.length - 1)) {
                let parent = e.target.parentNode
                parent.removeChild(parent.children[0])
                parent.appendChild(dragged)
                dragged.setAttribute("draggable", "return false")
                dragged.setAttribute("onDragStart", "return false")
            }
            return;
        } else { // if dropped on tile
            if (e.target.hasChildNodes()) {
                if (dragged.id.substring(dragged.id.length - 1) <= e.target.children[0].id.substring(e.target.id.length - 1))
                    return
                e.target.removeChild(e.target.children[0])
            }
            e.target.appendChild(dragged)
            dragged.setAttribute("draggable", "return false")
            dragged.setAttribute("onDragStart", "return false")
        }
        socket.emit("ping", "sheesh");
        console.log("dropped");
    }

    const createPieces = (player: number) => {
        let pieces: any = []
        for (let i = 0, size = 30; i < 5; i++, size += 5) {
            let p = <React.Fragment key={"p" + player + "s" + i} ><div
                id={"p" + player + "s" + i}
                className={"piece p" + player}
                draggable="true"
                style={{ width: size + "px", height: size + "px" }}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={dragOver}
                onDrop={drop}> </div> </React.Fragment>
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
                let tile =
                    <React.Fragment key={"t" + tileNum} >
                        <div
                            className="tile"
                            id={"t" + tileNum}
                            onDragOver={dragOver}
                            onDrop={e => drop(e)}>
                        </div>
                    </React.Fragment>

                tiles.push(tile)
            }
            let row: any = <React.Fragment key={"r" + i}> <div className="row">{tiles} </div></React.Fragment>
            rows.push(row)
        }
        return rows;
    }

    return (
        <div id="main-container">
            <div className="pieces-container">
                {createPieces(playerNum == 1 ? 2 : 1)}
            </div>

            <div className="parent">
                {createTiles()}
            </div>

            <div className="pieces-container">
                {createPieces(playerNum)}
            </div>
        </div>
    )
}

export default TicTacToe