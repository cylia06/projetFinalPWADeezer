import React from 'react';
import NavBar from "./NavBar"
import '../player.scss'
import Vid from 'video.js'


import { MDBBtn, MDBCard, MDBCardBody,MDBIcon, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';


function Player(props) {
    const music = props.music;
    const isSaved = props.isSaved;
    
    console.log(props.location);

    function launchPlay(){
      var a = document.querySelector("audio_w");
    }
   /* const videoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: props.location.music.preview,
        type: 'video/mp3'
      }]
    }
    var elem = document.querySelector("audio");

/*elem.audioTrackList.onaddtrack = function(event) {
  trackEditor.addTrack(event.track);
};

elem.audioTrackList.onremovetrack = function(event) {
  trackEditor.removeTrack(event.track);
};*/

  return (  
        <div>
          {props.location.music != undefined && 
            <MDBContainer className="container_player">
              <MDBRow>
              <img className="img_builder" src={props.location.music.album.cover_big} />
              </MDBRow>
    
              <MDBRow>
                <MDBCol className="col_header"md="12">
                  <h1>{props.location.music.title}</h1> 
                  <label className="ttx" ><strong>Album : </strong>{props.location.music.album.title}</label><br/>
                  <label className="ttx"><strong>Artiste : </strong>{props.location.music.artist.name}</label><br/>
                  <label className="ttx"><strong>Duration : </strong>{((props.location.music.duration) - (props.location.music.duration % 60)) / 60}:{props.location.music.duration % 60}</label>
                </MDBCol>
              </MDBRow>  

              <MDBRow>
                <MDBCol className="col_body"md="12">
                
                <div className="body_1">
                  
                  <MDBIcon onClick={launchPlay()} className="bk" icon="step-backward" />
                  <MDBIcon className="ct" far icon="play-circle" />
                  <MDBIcon className="fr" icon="step-forward" />
                  
                </div>

                  <audio id="A" src={props.location.music.preview} className="audio_w" controls ></audio>
                                
                  <div className="body_3">
                  <MDBIcon className="retweet" icon="fas fa-retweet" />
                  {isSaved == true ?
                    <MDBIcon className="ht" icon="far fa-heart" />
                    :
                    <MDBIcon className="ht" far icon="far fa-heart" />
                  }
                  
                </div>
                </MDBCol>
              </MDBRow>  
            </MDBContainer>

          }
        
        </div>           
  );
  
  }
export default Player;