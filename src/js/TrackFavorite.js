import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import {useState} from 'react';
import { MDBMedia, MDBCol, MDBIcon } from 'mdbreact';
import { element } from 'prop-types';


class TrackFavorite extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        music: props.music,
        isSaved: props.isSaved
  
      }
    }

     removeTrackFromFavorite(song){
        console.log("remove ");
        console.log(song.title);
        const db = window.db;
        db.open()
            .catch(e => console.error('Could not open local db:', e));
        
        // delete  music from local database

        db.transaction('rw', db.musics, () => {
            console.log("trans");
            db.musics.delete(song.id);
        }).catch(e => console.error(e));

        caches.open('musics')
        .then(cache => {
            //cache.add(gifVideoUrl);
            cache.delete(song.imageUrl);
        })
        .catch(e => console.error('Could not save GIF image to cache:', e));


    }
    updateList(event){
        this.setState({
          music: ''
        })
    }

    render(){
        return (

      
            <MDBCol md="6">
                {this.state.music && 
                    <MDBMedia>
                    <MDBMedia left className="mr-3" href="#">
                        <MDBMedia object src={this.state.music.imageUrl} alt="" />
                    </MDBMedia>
                    <MDBMedia body>
                        <MDBMedia heading>
                            {this.state.music.title}
                            
                            {this.state.isSaved == false? 
                            
                            <MDBIcon far icon="heart" style={{
                                'color': 'blue',
                                'float': 'right',
                                'marginRight':'9%',
                                'cursor':'pointer'
                            }} 
                            onClick={() => {
                                
                                this.setState({isSaved: true})
                                this.addTrackToFavorite(this.state.music)
                                
        
                            }}/> 
                            :<MDBIcon icon="heart" style={{
                                'color': 'blue',
                                'float': 'right',
                                'cursor':'pointer',
                                'marginRight':'9%'
                            }}
                            onClick={() => {
                                //setIsSaved( false, console.log(isSaved))},
                                this.setState({isSaved: false})
                                this.removeTrackFromFavorite(this.state.music)
                                this.updateList()
                                
                            }} />
                            }
                        </MDBMedia>
                    
                        {this.state.music.artist.name}<br/>  
                        <label className="ttx"><strong>Duration : </strong>{((this.state.music.duration) - (this.state.music.duration % 60)) / 60}:{this.state.music.duration % 60}</label>
                        
                    </MDBMedia>
                    <Link to= {{
                        pathname: "/player",
                        music: this.state.music
                        
                    }}>
                    <MDBIcon icon="play-circle"  style={{
                                'color': 'blue',
                                'float': 'right',
                                'cursor':'pointer',
                                'marginRight':'9%'
                            }} />
                    </Link>
                    </MDBMedia>
                
                }
           
            </MDBCol>
        
        );

    }
}

export default TrackFavorite;