import React from 'react';
import '../player.scss'



import { MDBIcon, MDBCol, MDBContainer, MDBRow } from 'mdbreact';


function Player(props) {
    //const music = props.music;
    const isSaved = props.isSaved;
    //const artist= props.artist;
    //const imageUrl = props.imageUrl;
    console.log(props.location);
    console.log(props);
    console.log("gggggggggggggggg");
    console.log(props.location.artist);

    function launchPlay(){
      var a = document.querySelector("audio_w");
    }

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
                  <label className="ttx"><strong>Artiste : </strong>{props.location.artist}</label><br/>
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