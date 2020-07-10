import React from 'react';
import Track from './Track';

class Trending extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      musics: []
    }
    //this.onSearch();
  }
  componentDidMount(){
    this.onSearch();
  }
  
  async onSearch() {
  
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = "https://api.deezer.com/radio/7/tracks&limit=40"

      var newdata= [];


        await fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
            console.log(data);
           // this.state.musics = data.data;
           newdata =data.data;
           console.log("newdata");
           console.log(newdata);

           
        })
        setTimeout(() => {

          this.setState({
            musics : newdata
          })
        console.log(this.state.musics);
    }, 500)
  
	
    //console.log(this.state.musics);
		
  }

  render(){
    return(
    <div>
       <h1>Les tendances</h1>  
			
			<div className="card-group search-results">
      {console.log("this.state.musics")}
        {console.log(this.state.musics)}
     
				{this.state.musics.map(music => (
          console.log("music"),
          console.log(music),
          console.log(music.album.cover),
					<Track key={music.id} 
						music={music} 
            //isSaved= {false}
            artist= {music.artist.name}
            imageUrl= {music.album.cover}
					/>
				))}

			</div>
		</div>	       
       

    )
  }
}


//function Trending(props) {
  /*const [radios, setRadios] = useState([]);
  function setRadios(event) {
    setRadios();
  }
  function onSearch(event) {
		
		event.preventDefault(); 
		
	
		
		fetchJsonp(
		`https://api.deezer.com/radio/6`
		)
		.then(res => res.json())
		.then(data => data.data)
		.then(radios => {
			setRadios(radios);
			console.log(radios);
		});
		
	}*/

  
export default Trending;




