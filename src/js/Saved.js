import React from 'react';
import {useState} from 'react';
import Track from './Track';


class Saved extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      musics: []
    }
  }
  componentDidMount(){
    this.getFavoriteMusics();

  }
  componentWillMount(){
    this.getFavoriteMusics();
  }

  async getFavoriteMusics(){
   // const request = indexedDB.open("musics", 1);
   // let db = request.result;
  
    const db = window.db;
    var newdata = [];
    console.log(db);
    //const db = await open('musics',1);
    await db.open().catch(function (e) {
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
            musics : newdata
          })
          console.log("artissssssssss");
        console.log(this.state.musics);
    }, 500)

  }

  render(){
    return(
      <div>
			
			<h1>my favorite </h1>
			<div className="card-group search-results">
				{this.state.musics.map(music => (
					<Track {...this.state.props} key={music.id} 
						music={music} 
            //isSaved= {true}
            artist= {music.artist}
            imageUrl = {music.imageUrl}
            
					/>
				))}

			</div>
		</div>	

    )
  }
}

  
  


export default Saved;