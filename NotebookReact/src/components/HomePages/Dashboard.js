import React, { useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../../styleSheets/Dashboard.css'
import noteImage from '../../static/noteImage.png'
import cameraImage from '../../static/cameraIcon.jpg'
import drawImage from '../../static/drawImage.svg'

export default function Dashboard() {

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
  }

  return (
    <React.Fragment>
      <CssBaseline />
        <main>
          <div class="wrapper-flex">
            <div class="container" onClick={(event) => {createRipple(event)}}>
              <img src={drawImage} alt='profile image' class="profile-img"/>
              <h1 class="name">Canvas</h1>
            </div>
            
            <div class="container" onClick={(event) => {createRipple(event)}}>
              <img src={noteImage} alt='profile image' class="profile-img"/>
              <p class="name">Notes</p>
            </div>

            <div class="container" onClick={(event) => {createRipple(event)}}>
              <img src={cameraImage} alt='profile image' class="profile-img"/>
              <p class="name">Images</p>
            </div>
          </div>
        </main>
    </React.Fragment>
  );
}