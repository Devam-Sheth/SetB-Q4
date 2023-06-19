const setContainer = document.getElementsByClassName("set-box")[0];
const pointsContainer = document.getElementsByClassName("events-points")[0];
console.log(pointsContainer);

var totalEvents = parseInt(prompt("Enter the total no. of events (greater than 0)"));
var eventsAtTime = parseInt(prompt("Enter the events to be shown at a time (greater than 0 and less than total no. of events)"));
var setAtATime = parseInt(totalEvents / eventsAtTime);

let setNumber = 1;

let cardWidth = 80/eventsAtTime;
if (cardWidth > 20) {
    cardWidth =  20;
}

const numberOfEventsInLastSet = totalEvents % eventsAtTime ;

console.log(setAtATime);

let cardHeight = cardWidth*1.4; 
let fontSize = 20;

function cardSet() {
    for (let i = 0; i < setAtATime; i++) {
        let eventsSet = document.createElement('div');
        eventsSet.className = "card-box" ;
        for (let j = 0; j < eventsAtTime; j++) {
            let setOfCards = document.createElement('div');
            setOfCards.className = 'card'; 
            setOfCards.style.width = cardWidth + 'vw';
            setOfCards.style.height = cardHeight + 'vw';
            setOfCards.style.fontSize = fontSize + 'px';
            setOfCards.innerHTML = i*eventsAtTime + j + 1;
            eventsSet.appendChild(setOfCards);
        } 
        setContainer.appendChild(eventsSet);
    }
    if (numberOfEventsInLastSet === 1) {
        for (let i = 0; i < setAtATime; i++) {
            let eventsSet = document.createElement('div');
            eventsSet.className = "card-box" ;
            for (let j = 0; j < eventsAtTime; j++) {
                let setOfCards = document.createElement('div');
                setOfCards.className = 'card'; 
                setOfCards.style.width = cardWidth + 'vw';
                setOfCards.style.height = cardHeight + 'vw';
                setOfCards.style.fontSize = fontSize + 'rem';
                setOfCards.innerHTML = i*eventsAtTime + j + 1;
                eventsSet.appendChild(setOfCards);
            } 
            setContainer.appendChild(eventsSet);
        }
    }
}

function pointsOfCaraousel() {
        for (let i = 0; i < setAtATime; i++) {
            let points = document.createElement('div');
            points.className = "point";
            points.id = i+1;
            points.setAttribute('onclick','navigateEvent(this.id)');
            pointsContainer.appendChild(points);
        }
    if (numberOfEventsInLastSet === 1) {
       for (let j = 1; j < setAtATime; j++) {
        let points = document.createElement('div');
            points.className = "point";
            points.id = j+1;
            points.setAttribute('onclick','navigateEvent(this.id)');
            pointsContainer.appendChild(points);       
       } 
    }
}

function changeEvent() {
    const limit = (numberOfEventsInLastSet == 0) ? setAtATime : (setAtATime + 1);
    if (setNumber < limit) {
        setNumber++;
        setContainer.style.transform = "translate(" + (-100 * (setNumber - 1)) + "%)";
        for (point of document.getElementsByClassName('point')) {
            point.style.background = 'none';
        }
        setTimeout(() => {
            document.querySelectorAll('.events-points > .point')[setNumber - 1].style.background = "#ffffff";
        }, 1100);
    } else {
        setNumber = 0;
        changeEvent();
    }
}

function navigateEvent(pointCount) {
    if (eventsAtTime != pointCount) {
        eventsAtTime = pointCount - 1;
        changeEvent();
        clearInterval(eventSetChangeInterval);
        eventSetChangeInterval = setInterval(changeEventSet, 5000);
    }
}

window.onload = () => {
    setTimeout(() => {
        cardSet();
        eventSetChangeInterval = setInterval(changeEvent, 5000);
    }, 1);
    pointsOfCaraousel();
    cardSet();
}