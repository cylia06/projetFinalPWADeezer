import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import { MDBMedia, MDBCol, MDBIcon } from 'mdbreact';


class Track extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        music: props.music,
        isSaved: '',
        imageUrl: props.imageUrl,
        artist: props.artist,
        favoriteSongs: []
  
      }
      console.log("track here");
      console.log(props.artist);

      //this.onSearch();
    }
    componentWillMount(){
        this.getFavoriteMusic()
    }
    /*componentDidMount(){
       // this.getisFavorite()
        this.getFavoriteMusic()
       
    }*/
    getFavoriteMusic(){
        const db = window.db;
        var newdata = [];

        db.open().catch(function (e) {
            console.error('Could not open local database: ', e);
        });
        db.transaction('r', db.musics, async function () {
        newdata = await db.musics.toArray();
            console.log(newdata);
        }).catch(function (e) {
            console.error(e);
        });
        setTimeout(() => {

            this.setState({
                favoriteSongs : newdata
            })
            console.log("favorite songs");
            console.log(this.state.favoriteSongs);
            this.isFavorite(newdata);
        }, 500)
       

    }

    
    isFavorite(songs) {
        console.log(songs);
        this.state.favoriteSongs.forEach(song => {
            if(song.id === this.state.music.id){
                this.setState({
                    isSaved : true
                  })
                console.log(this.state.isSaved)
            }
        });
    }

     removeTrackFromFavorite(song){
        console.log("remove ");
        console.log(song.title);
        const db = window.db;
        db.open()
            .catch(e => console.error('Could not open local db:', e));
        db.transaction('rw', db.musics, () => {
            console.log("trans");
            db.musics.delete(song.id);
        }).catch(e => console.error(e));
        caches.open('musics')
        .then(cache => {
            cache.delete(this.state.imageUrl);
        })
        .catch(e => console.error('Could not save GIF image to cache:', e));
    }
     addTrackToFavorite(song) {   
        console.log("add ");
        console.log(song.title);
        const db = window.db;
        db.open()
            .catch(e => console.error('Could not open local db:', e));
        db.transaction('rw', db.musics, () => {
            console.log("trans");
            db.musics.add({
                id: song.id,
                title: song.title,
                imageUrl: song.album.cover,
                artist: song.artist.name,
                duration: song.duration,
                album: song.album,
                preview: song.preview
            });
        }).catch(e => console.error(e));

          // Put music image in cache
        caches.open('musics')
        .then(cache => {
            console.log(this.state.imageUrl);
            cache.add(this.state.imageUrl);
        })
        .catch(e => console.error('Could not save GIF image to cache:', e));

    // Set button in 'liked' state (disable the button)
// likeButton.disabled = true;
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
                <MDBMedia object src={this.state.imageUrl} alt="" />
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
                        this.setState({isSaved: false})
                        this.removeTrackFromFavorite(this.state.music)
                        this.updateList()
                    }} />
                    }
                </MDBMedia>
            
                {this.state.artist}<br/>  
                <label className="ttx"><strong>Duration : </strong>{((this.state.music.duration) - (this.state.music.duration % 60)) / 60}:{this.state.music.duration % 60}</label>
                
            </MDBMedia>
            <Link  to= {{
				pathname: "/player",
                music: this.state.music,
                artist: this.state.artist
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

export default Track;