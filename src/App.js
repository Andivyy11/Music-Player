import React from "react";
import songs from "./data.js"
import './App.css'

let timeId=null;
let timeS=0;
let w=0;
const App = () => {
    const [song, setSong]=React.useState(songs[0])
	const [music ,setMusic]=React.useState(new Audio(song.audio))
	const [control,setControl]=React.useState("fa-solid fa-play")
	const[display,setDisplay]=React.useState("none")
	const [timeStamp,setTime]=React.useState(0)
    const [duration,setDuration]=React.useState(music.duration)
	const [widthBar,setWidth]=React.useState(0.0)
	const [anime,setAnime]=React.useState("")

	music.addEventListener('loadedmetadata', function() {
		const durationInSeconds = music.duration;
		setDuration(durationInSeconds)
		console.log('Duration:', durationInSeconds, 'seconds');
	  });
    
	function changeControl()
	{
		if(control === "fa-solid fa-play")
		{
			console.log('playing..')
		    setControl("fa-solid fa-pause")
		    setAnime("borderAnimate 1s linear infinite alternate-reverse")
		    music.play().then(() => {
			timeId = setInterval(() => {
				if(w>=350.0)
				{
					pauseSong();
				    changeSong(1);
				}
				else 
				{
			    timeS+=1;
				w=timeS*parseFloat(350/duration)
                setWidth(w)
				console.log("width ",w)
				setTime(timeS)
				}
			}, 1000);
		  });
		}
        else 
		{
			pauseSong();
		}
	}
	function pauseSong()
	{
		console.log('paused..')
		clearInterval(timeId)
		timeId=null 
		setControl("fa-solid fa-play") 
		music.pause()
		setAnime("")  
	}
	function chooseSong(s)
	{
		console.log("changing song")
		setSong(s)
		setMusic(new Audio(song.audio))
		timeS=0;
		w=0;
		setTime(0)
		setWidth(0)
		setControl("fa-solid fa-play") 
		music.load();
	}
	function changeSong(x)
	{
		let i=0;
		for(;i<songs.length;i++)
		{
			if(songs[i].id===song.id)
			   break
		}
		if(x===1)
		{
			i=i+1;
			if(i===songs.length)
			  i=0
		}
		else 
		{
			i=i-1;
			if(i===-1)
			  i=songs.length-1
		}
		chooseSong(songs[i])
	}
	  
	function toggleSongList()
	{
		if(display==="none")
		   setDisplay("block")
		else 
		   setDisplay("none")
	}
	return (
		<div>
	       <div className="header">
			   <h1>AudioAurora <i class="fa-solid fa-music"></i></h1>
			   <button onClick={toggleSongList}>All Songs</button>
		   </div>
		   <div className="songList" style={{display :display}}>
                {songs.map(s=> <h3 onClick={()=>chooseSong(s)}>{s.name}</h3> )}
		   </div>
		   <div className="container">
		     <div className="musicPlayer">
			    <img src={song.cover} alt={song.name} style={{animation:anime}}></img>
				<h2>{song.name}</h2>
				<span>{song.artist}</span>

				<div className="progress">
				    <span>{parseInt(timeStamp/60)}:{(timeStamp%60)}</span>
				    <div className="airBox">
					    <div className="colorBox" style={{width:widthBar+"px"}}></div>
				    </div>
					<span>{parseInt(duration/60)}:{parseInt(duration%60)}</span>
				</div>

				<div>
					<button onClick={()=>changeSong(1)}><i class="fa-solid fa-less-than"></i></button>
					<button onClick={changeControl}><i class={control}></i></button>
					<button onClick={()=>changeSong(-1)}><i class="fa-solid fa-greater-than"></i></button>
				</div>
				</div>
		   </div>
		</div>
	);
};



export default App;
