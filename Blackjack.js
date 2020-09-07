////Lets start!
var ID;
var a = {'a':0};
var msg = {'span': '#message', 'color': '#EEE'};
var m = {
	'money': 500,
	'bet' : {'betY':0, 'betYspan': '#yourBet', 'betC':0, 'betCspan': '#compBet'}
};
var bjDictionary = {
	'yours' : {'scorespan': '#yourScore', 'div': '#you', 'score': 0, 'key':0},
	'computers': {'scorespan': '#compScore', 'div': '#computer', 'score': 0, 'key':1},
	'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
	'cardsValue' : {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
};

var you = bjDictionary['yours'];
var comp = bjDictionary['computers'];

var btnHit = document.querySelector('#hit');
if(m['money']>0){
	btnHit.addEventListener("click", fHit);
}else{
	btnHit.removeEventListener("click", fHit);
}
var btnStand = document.querySelector('#stand');
btnStand.addEventListener("click", function(){ID = setInterval(fStand, 1000)});
document.querySelector('#deal').addEventListener("click", fDeal);

function fHit () {
	if (m['bet']['betY'] > 0) {
		var rc = randomCard(bjDictionary['cards']);  //  Q/A/10 etc.
		score(rc,you);
		if(you['score'] <= 21){
			showScore(you);
			showCard(rc, you);
		} else if(you['score'] > 21){
			while (a['a'] < 1) {
			showCard(rc, you);
			a['a']++;
			}
			message(you);
		}
		//console.log('you' + you['score']);
		if (you['score'] > 21) {
			winner();
		}
	}
}

function randomCard (card) {
	let rndm = Math.floor(Math.random() * 13);
	let x = card[rndm];
	return x;
}
function score(cardName,player) {
	if(cardName === 'A'){
		if(player['score'] += bjDictionary['cardsValue'][cardName] > 21){
			player['score'] += bjDictionary['cardsValue'][cardName][0];
		} else if(player['score'] === 0 || (player['score'] += bjDictionary['cardsValue'][cardName]) <= 21) {
			player['score'] += bjDictionary['cardsValue'][cardName][1];
		}
	} else {
		player['score'] += bjDictionary['cardsValue'][cardName];  // incrementing the score
	}
}
function showScore (player) {
	document.querySelector(player['scorespan']).innerHTML = player['score'];
}

function showCard (card, player) {
	var c = document.createElement('img');
	c.src = `images/${card}.png`;
	document.querySelector(player['div']).appendChild(c);
}

function message (p) {
	if(p['key']===0) {
		document.querySelector('#message').innerHTML = 'BUST!';
		document.querySelector('#message').style.color = 'red';
	} else if(p['key']===1){
		document.querySelector('#message').innerHTML = 'Dealer BUST!';
		document.querySelector('#message').style.color = 'Yellow';
	}
}

function fDeal () {
	var div = document.querySelectorAll('img');
	for (let i = 0; i < div.length; i++) {
		div[i].remove();
	}
	bjDictionary['yours']['score'] = 0;
	document.querySelector(bjDictionary['yours']['scorespan']).innerHTML = 0;
	bjDictionary['computers']['score'] = 0;
	document.querySelector(bjDictionary['computers']['scorespan']).innerHTML = 0;
	document.querySelector(msg['span']).innerHTML = "Let's play!";
	document.querySelector(msg['span']).style.color = msg['color'];

	a['a'] = 0;
	clearInterval(ID);
	btnHit.addEventListener("click", fHit);

	m['bet']['betY'] = 0;
	m['bet']['betC'] = 0;
	document.querySelector("#yourBet").innerHTML = m['bet']['betY'];
	document.querySelector("#compBet").innerHTML = m['bet']['betC'];
}

function fStand () {
	if (m['bet']['betY'] > 0) {
		btnHit.removeEventListener("click", fHit);
		if (you['score'] <=21) {
			if(comp['score'] < randomNumber())
			{
				var rc = randomCard(bjDictionary['cards']);  //  Q/A/10 etc.
				score(rc, comp);
				if(comp['score'] <= 21){
					showScore(comp);
					showCard(rc, comp);
				} else if(comp['score'] > 21){
					while (a['a'] < 1) {
					showCard(rc, comp);
					a['a']++;
					}
					message(comp);
				}
				//console.log('comp:'+comp['score']);
			}else{
				winner();
				clearInterval(ID);
			}
		}else{
			winner();
		}
	}
}
function randomNumber () {
	var rn = (Math.floor(Math.random() * 6)) + 15;
	return rn;
}

function winner () {
	if(you['score'] > 21) {
		//console.log("Looser");
	}else if(comp['score'] > 21){
		//console.log("Winner");
		m['money'] = m['money'] + ((3/2) * (m['bet']['betY']));
		document.querySelector("#yourMoney").innerHTML = m['money'];
		document.querySelector('#message').innerHTML = 'You win!';
		document.querySelector('#message').style.color = 'aqua';
	}else{
		if(you['score'] > comp['score']){
			//console.log("Winner");
			m['money'] = m['money'] + ((3/2) * (m['bet']['betY']));
			document.querySelector("#yourMoney").innerHTML = m['money'];
			document.querySelector('#message').innerHTML = 'You win!';
			document.querySelector('#message').style.color = 'aqua';
		}else if(you['score'] < comp['score']){
			//console.log("Looser");
			document.querySelector('#message').innerHTML = 'You lost';
			document.querySelector('#message').style.color = 'red';
		}else if(you['score'] == comp['score']){
			//console.log("draw");
			m['money'] = m['money'] + m['bet']['betY'];
			document.querySelector("#yourMoney").innerHTML = m['money'];
			document.querySelector('#message').innerHTML = 'Draw';
			document.querySelector('#message').style.color = 'lime';
		}
	}
}

document.querySelector(".small").addEventListener("click", bet1);
document.querySelector(".large").addEventListener("click", bet2);
function bet1 () {
	if(m['money']>0){
		m['money'] -= 50;
		m['bet']['betY'] += 50;
		m['bet']['betC'] += 50;
		document.querySelector("#yourMoney").innerHTML = m['money'];
		document.querySelector("#yourBet").innerHTML = m['bet']['betY'];
		document.querySelector("#compBet").innerHTML = m['bet']['betC'];
	}else{
		alert("You poor bastard!");
	}
}
function bet2 () {
	if(m['money']>50){
		m['money'] -= 100;
		m['bet']['betY'] += 100;
		m['bet']['betC'] += 100;
		document.querySelector("#yourMoney").innerHTML = m['money'];
		document.querySelector("#yourBet").innerHTML = m['bet']['betY'];
		document.querySelector("#compBet").innerHTML = m['bet']['betC'];
	}else{
		alert("You poor bastard!");
	}
}




