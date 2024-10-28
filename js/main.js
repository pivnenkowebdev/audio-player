document.addEventListener("DOMContentLoaded", () => {

   // ====================VARIABLES==============================
   const audio = document.querySelector('#audio');
   const btnPlay = document.querySelector('#btnPlay');
   const timeline = document.querySelector('#timeline');
   const volume = document.querySelector('#volume');
   const volumeImg = document.querySelector('#iconVolume');
   const volumeBtn = document.querySelector('#volumeBtn');

   // all songs
   const allTrucks = [
      {label: 'phut', author: 'Phao', name:'Phut Hon',},
      {label: 'stressed', author: 'Twenty One pilots', name:'Stressed Out',},
      {label: 'rompasso', author: 'Rompasso', name:'Angetenar',},
      {label: 'blackway', author: 'Blackway, Black Caviar', name:'What`s Up Danger',},
      {label: 'wkd', author: 'Weekend', name:'The Hills',},
   ];
   
   // counter
   let counterTrack = 0;

   // flag
   let isPlay = false;
   
// =======================FUNCTIONS=================================

      // current song
      function actualTrack(track){
         document.querySelector('#label').src = `./src/img/labels/${track.label}.jpg`;
         document.querySelector('#author').innerText = track.author;
         document.querySelector('#nameSong').innerText = track.name;
         audio.src = `./src/music/${track.name}.mp3`;
         document.querySelector('body').style.backgroundImage = `url(./src/img/labels/${track.label}.jpg)`;
      }
 
      

   // play
   function playAudio() {

      audio.play();
   
      btnPlay.innerHTML = `
      <img src="./src/img/icons/pause.svg" alt="icon" style = "margin-right: 0">
      `
   }

   // pause 
   function pauseAudio() {
     audio.pause();
   
     btnPlay.innerHTML = `
     <img src="./src/img/icons/play.svg" alt="icon">
     `;
   }

   // next
   function nextTrack(){
      counterTrack++;

      if(counterTrack > allTrucks.length - 1){
         counterTrack = 0;
      }  

      actualTrack(allTrucks[counterTrack]);

      if(isPlay){
         playAudio();
      }else{
         pauseAudio();
         isPlay = false;
      }
   }

   // prev
   function prevTrack(){
      counterTrack--;

      if(counterTrack < 0){
         counterTrack = allTrucks.length - 1;
      }

      actualTrack(allTrucks[counterTrack]);

      if(isPlay){
         playAudio();
      }else{
         pauseAudio();
         isPlay = false;
      }
   }

   // progress line
   function autoProgressLine(){
      let actualTime = Math.floor((audio.currentTime / audio.duration) * 100);

      timeline.style.background = `linear-gradient(90deg, #d3751c 0%, #d3751c ${actualTime}%,  #8C736C ${actualTime}%,  #8C736C 100%)`;

      timeline.value = actualTime;

      renderTime(audio.currentTime, audio.duration);
   }

   // current time
   function setCurrentTime(){
      audio.currentTime = Math.floor(audio.duration * timeline.value / 100);
   }

   // render time
   function renderTime(actualTime, duration){

      // actual time
      let minActual = Math.floor(actualTime / 60).toString().padStart(2, '0');
      let secActual = Math.floor(actualTime % 60).toString().padStart(2, '0');
      document.querySelector('#minActual').textContent = minActual;
      document.querySelector('#secActual').textContent = secActual;

      // duration
      let minDuration = Math.floor(duration / 60).toString().padStart(2, '0');
      let secDuration = Math.floor(duration % 60).toString().padStart(2, '0');
      document.querySelector('#fullMin').textContent = minDuration;
      document.querySelector('#fullSec').textContent = secDuration;

      if (!duration) {
         document.querySelector('#fullMin').textContent = '00';
         document.querySelector('#fullSec').textContent = '00';
         timeline.value = 0;
         timeline.style.background = `linear-gradient(90deg, #d3751c 0%, #d3751c 0%,  #8C736C 0%,  #8C736C 100%)`;
       }
   }

   // set volume
   function checkStatusVolume(){

      if(audio.volume < 0.25){
         volumeImg.src = './src/img/icons/sound-25.svg';
      }else if(audio.volume < 0.50){
         volumeImg.src = './src/img/icons/sound-50.svg';
      }else if(audio.volume < 0.75){
         volumeImg.src = './src/img/icons/sound-100.svg';
      }
   }

   function setVolume(){
      audio.volume = volume.value / 100;
      
      volume.style.background = `linear-gradient(90deg, #d3751c 0%, #d3751c ${volume.value}%,  #8C736C ${volume.value}%,  #8C736C 100%)`;

      checkStatusVolume();

      audio.muted = false;
   }
   setVolume();

   function mute(){
      if(!audio.muted){
         audio.muted = true;
         volumeImg.src = './src/img/icons/sound-off.svg';
      }else{
         audio.muted = false;
         checkStatusVolume();
      }
   }
   // ========================EVENTS=====================

   // button play\pause
   btnPlay.addEventListener('click', ()=>{
      if(!isPlay){
         playAudio();
         isPlay = true;
      }else{
         pauseAudio();
         isPlay = false;
      }
   });

   // next event
   document.querySelector('#btnNext').addEventListener('click',()=>{
      nextTrack();
   });

   // prev event
   document.querySelector('#btnPrev').addEventListener('click',()=>{
      prevTrack();
   });

   // ended song
   audio.addEventListener('ended', nextTrack);

   // auto progress line
   audio.addEventListener('timeupdate', autoProgressLine);
   
   // current time
   timeline.addEventListener('input', setCurrentTime);

   volumeBtn.addEventListener('click', mute);

   // audio
   volume.addEventListener('input', setVolume);

 });


