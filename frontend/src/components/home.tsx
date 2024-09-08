import React from "react";
import {useNavigate} from "react-router-dom";


export function Home() {
    const nav = useNavigate();
    return (
        <div className="hcContentContainer hcMarginTop5 hcMarginBottom5">
            <div className="hcBasicSideMargin">
                <h1>Huygens Letters browser</h1>
                <div><h2>TODO:</h2></div>
                <ul>
                    <li>Extra facetten toevoegen</li>
                    <li>Volledig hyperlinken</li>
                    <li>Verfijning datamodel, voor aggregaties (aantallen brieven per persoon en plaats)</li>
                    <li>Kaartmodule: marker stylen</li>
                    <li>Styling?</li>
                    <li>MySQL migreren naar Postgres?</li>
                </ul>

            </div>
        </div>
    )
}