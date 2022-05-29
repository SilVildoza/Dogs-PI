import { React, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./Nav.css";

export default function Nav(){
    const [showLinks, setShowLinks] = useState(false);

    return (
        <>
        <div className="Navbar">
            <div className="leftSide">
                <div className="nav-links" id={showLinks ? "hidden" : ""}>
                    <a href="/home">Home</a>
                    <a href="/add">Create</a>
                </div>
                <button onClick={() => setShowLinks(!showLinks)}></button>
            </div>
            <div className="rightSide"></div>
            <SearchBar />
        </div>
        </>
    )
}