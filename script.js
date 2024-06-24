function fetchscore(){

    document.getElementById('user').innerText=localStorage.scoreplayer;
    document.getElementById('comp').innerText=localStorage.scorecomputer;
    console.log("computer",localStorage.scorecomputer);
    console.log("player",localStorage.scoreplayer);
}

function result(u,c){
    const data={   
        "rock"    : {"rock": 0,"paper": -1,"scissors": 1},
        "paper"   : {"rock": 1,"paper": 0,"scissors": -1},
        "scissors": {"rock": -1,"paper": 1,"scissors": 0}
      };
    //   console.log(data[u][c]);
    return data[u][c];
}

window.rules=function(){
    const element = document.getElementById('Rules');
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
      element.classList.add('hidden');}
}

function drawLine(x,y,z) {
    const box1 = document.getElementById(x).getBoundingClientRect();
    const box2 = document.getElementById(y).getBoundingClientRect();
    const line = document.getElementById(z);

    const x1 = box1.left + box1.width / 2;
    const y1 = box1.top + box1.height / 2;
    const x2 = box2.left + box2.width / 2;
    const y2 = box2.top + box2.height / 2;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = length + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
}
function line(){
drawLine("rock","paper","line1");
drawLine("rock","scissors","line2");
drawLine("scissors","paper","line3");
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

window.optionSelect = function(event) {
    const value = event.target.id;
    // console.log("player:", value); 
    const options = ['rock', 'paper', 'scissors'];
    let oppo=getRandomElement(options);
    // console.log("computer:",oppo);
    const data=result(value,oppo);
    {document.getElementById('interface1').classList.remove('main');
    document.getElementById('interface1').classList.add('hidden');
    document.getElementById('interface2').classList.remove('hidden');
    document.getElementById('interface2').classList.add('main');}
    const colour={'rock':'#0074B6','paper':'#FFA943','scissors':'#BD00FF'};
    var player=document.getElementById('player');
    var comp=document.getElementById('computer');
    comp.style.borderColor=colour[oppo];
    player.style.borderColor=colour[value];
    const playerimg=document.getElementById('playerimg');
    const computerimg=document.getElementById('computerimg');
    playerimg.src='images/'+value+'.png';
    computerimg.src='images/'+oppo+'.png';

    if(data==0){
        document.getElementById('matchresult').innerText="TIE UP";
        document.getElementById('tie').innerText="";
        document.getElementById('PC').style.background=0;
        document.getElementById('play').style.background=0;
    }
    else if(data==1){
        document.getElementById('matchresult').innerText="YOU WIN";
        document.getElementById('Next').style.display='block';
        document.getElementById('PC').style.background=0;
        localStorage.scoreplayer = Number(localStorage.scoreplayer)+1;
        
    }
    else if(data==-1){
        document.getElementById('matchresult').innerText="YOU LOST";
        document.getElementById('play').style.background=0;
        localStorage.scorecomputer = Number(localStorage.scorecomputer)+1;

    } 
    else{
        localStorage.scoreplayer=0;
        localStorage.scorecomputer=0;
    }
    fetchscore();
};


window.retry=function(){
    document.getElementById('gamepage').classList.remove('hidden');
    document.getElementById('wonpage').classList.add('hidden');
    document.getElementById('interface1').classList.remove('hidden');
    document.getElementById('interface1').classList.add('main');
    document.getElementById('interface2').classList.remove('main');
    document.getElementById('interface2').classList.add('hidden');
    document.getElementById('Next').style.display='none';
    document.getElementById('play').style.removeProperty('background');
    document.getElementById('PC').style.removeProperty('background');
    document.getElementById('tie').innerText="AGAINST PC";
}
window.winpage=function(){
    document.getElementById('gamepage').classList.add('hidden');
    document.getElementById('wonpage').classList.remove('hidden');
    document.getElementById('Next').style.display='none';
}

window.addEventListener('resize', line);
document.addEventListener('DOMContentLoaded', function() {   
    if(!localStorage.scoreplayer) {
        localStorage.scoreplayer = 0;
      }
    if(!localStorage.scorecomputer) {
        localStorage.scorecomputer = 0;
      }
    line();
    fetchscore();
});
