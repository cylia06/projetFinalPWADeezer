import React from 'react';
import {useState} from 'react';
import fetchJsonp from 'fetch-jsonp';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBCol, MDBFormInline, MDBBtn , MDBIcon, MDBContainer, MDBRow} from "mdbreact";
import Track from './Track';
import NavBar from "./NavBar"


function Search(props) {
    const [title, setTitle] = useState('');
    const [musics, setMusics] = useState([]);
    
    function changeTitle(title) {
    setTitle(title.target.value);
    console.log(title.target.value);
    }
    function setMusic(event) {
        setMusic(event.target.value);
    }
        
	function onSearch(event) {
		
		event.preventDefault(); 
		
		const encodedTitle = encodeURIComponent(title);
		
		fetchJsonp(
		`https://api.deezer.com/search?q=${encodedTitle}&output=jsonp&limit=5`
		)
		.then(res => res.json())
		.then(data => data.data)
		.then(musics => {
			setMusics(musics);
			console.log(musics);
		});
		
	}
	
	


	return (
		<div>
			
			<div>
				<MDBContainer>
					<MDBRow>
						<MDBCol md="12">
							<MDBFormInline>
							<div className="md-form active-cyan active-cyan-2 mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text purple lighten-3" id="basic-text1">
									<MDBIcon className="text-# 4285F4" icon="search" />
									</span>
								</div>
								<input className="form-control my-0 py-1" type="text"  onChange={changeTitle} placeholder="Search" aria-label="Search" />
								<MDBBtn gradient="# 4285F4" rounded size="sm" type="submit" onClick={onSearch} className="mr-auto">
								Search
								</MDBBtn>
								
					
							</div>		
							</MDBFormInline>
						</MDBCol>	
					</MDBRow>
				</MDBContainer>	
			</div>
			<div className="card-group search-results">
				{musics && musics.map(music => (
					<Track {...props} key={music.id} 
						music={music} 
						//isSaved= {false}
						artist= {music.artist.name}
						imageUrl= {music.album.cover}
					/>
				))}

			</div>
		</div>	
	);

}

export default Search;