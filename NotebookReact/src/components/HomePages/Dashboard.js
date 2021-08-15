import React, { useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../../styleSheets/Dashboard.css'
import noteImage from '../../static/noteImage.png'
import cameraImage from '../../static/cameraIcon.jpg'
import drawImage from '../../static/drawImage.svg'
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
  const history = useHistory();

  function createRipple(event) {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;


    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple"); 

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    
    history.push('/'+button.children[0].innerHTML)
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <main>
          <div class="wrapper-flex">
              <div class="container" onClick={(event) => {createRipple(event)}}>
                <h1 hidden>canvas</h1>
                <img src={drawImage} alt='profile image' class="profile-img"/>
                <p class="name">Canvas</p>
              </div>
            
              <div class="container middleButton" onClick={(event) => {createRipple(event)}}>
                  <h1 hidden>note</h1>
                  <img src={noteImage} alt='profile image' class="profile-img"/>
                  <p class="name">Notes</p> 
              </div>
            
              <div class="container" onClick={(event) => {createRipple(event)}}>
                <h1 hidden>gallery</h1>
                <img src={cameraImage} alt='profile image' class="profile-img"/>
                <p class="name">Images</p>
              </div>
          </div>
        </main>
    </React.Fragment>
  );
}