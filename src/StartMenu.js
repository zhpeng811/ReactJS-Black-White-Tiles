/** 
 * Copyright: Ze Hui Peng
 * github URL: https://github.com/zhpeng811/ReactJS-Black-White-Tiles
*/

import React from 'react';
import './StartMenu.css';
import {config} from './Config';
import background from './background.jpg';

class StartMenu extends React.Component {

    render() {
        return (
            <React.Fragment>
                <img src = {background} alt = "bg" className = "bg"></img>

                <div className = "start-menu">
                    <div className = "title">
                        {config.startMenuTitle}
                    </div>

                    <span> {config.classicModeText} </span>
                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(1, 1)}
                    > 
                        {config.easyText}
                    </button>
                
                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(1, 2)}
                    > 
                        {config.mediumText}
                    </button>

                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(1, 3)}
                    > 
                        {config.hardText}
                    </button>

                    <div></div>
                    <span> {config.blindModeText} </span>
                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(2, 1)}
                    > 
                        {config.easyText}
                    </button>
                
                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(2, 2)}
                    > 
                        {config.mediumText}
                    </button>

                    <button
                        className = "startMenu-button"
                        onClick = {() => this.props.startGameHandler(2, 3)}
                    > 
                        {config.hardText}
                    </button>
    
                </div>
            </React.Fragment>
        );
    }
}

export default StartMenu;