console.log("lets write some javascript");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/Project/geet.html");
  let response = await a.text();
  console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/gaane/")[1]);
    }
  }
  return songs;
}

const playMusic = (track) => {
    let audio = new Audio("/gaane/"+ track)
    audio.play(); 
  
}

  



async function main() {




  //get the list of all the songs
  let songs = await getSongs();
  console.log(songs);




  //show all the songs in the playlist
  let songUL = document.querySelector(".songList ul");
  for (const song of songs) {
    songUL.innerHTML += `<li>  <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")} </div>
                                <div>Harry</div>

                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" style="width: 24px;height: 24px;" src="anotherplay.png" alt="playbutton">

                            </div></li>`;
  }

  //Attatch an event listener to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", () => {
        const trackName = e.querySelector(".info").firstElementChild.innerHTML;
        console.log("Playing: ", trackName);
        playMusic(trackName);
      });
    
  });

  
}

main();
