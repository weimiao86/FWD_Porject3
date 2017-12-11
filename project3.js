console.log("main.js connected");
if (window.jQuery) {console.log('jquery detected');}

new Vue({
	el:'#app',
	data: {
		win:0,
		p1score:0,
		p2score:0,
		p1inactive: false,
		p2inactive: true,
		progress:50,
		attempt:1,
		playerTurn: 1,
		possibleScore:0,
		toAdd:0,
		token:'',
		eCount:0,
		mCount:0,
		hCount:0,
		active: false,
		currentQuestion: '',
		easyQuestions:[],
		mediumQuestions:[],
		hardQuestions:[],
		currentOptions:[],
		easyOptions:[],
		mediumOptions:[],
		hardOptions:[]

	},

	created: function(){
		this.getToken();
		this.getEasy();
		this.getMedium();
		this.getHard();
	},

	methods: {

		getToken: function(){
			$.getJSON("https://opentdb.com/api_token.php?command=request", function(result){
				this.token = result.token;
				console.log(this.token);

			});
		},

		getEasy: function(){
			let _this = this;
			$.getJSON("https://opentdb.com/api.php?amount=50&category=9&difficulty=easy&type=multiple&token="+this.token, function(result){

	      		for (let i = 0; i < result.results.length; i++) {
							//console.log(result.results[i].question);
							//console.log(result.results[i].correct_answer);
	        		_this.easyQuestions.push(result.results[i].question);

							let arr= [];

	        		let option1={
								value: result.results[i].incorrect_answers[0],
								tag: "wrong1"
							}

							let option2={
								value: result.results[i].incorrect_answers[1],
								tag: "wrong2"
							}

							let option3={
								value: result.results[i].incorrect_answers[2],
								tag: "wrong3"
							}

	        		arr.push(option1);
	        		arr.push(option2);
	        		arr.push(option3);

	        		let rightAnswer={
								value: result.results[i].correct_answer,
								tag: "right"
							}

	        		let rand= Math.floor(Math.random() * 4);

	        		arr.splice(rand, 0, rightAnswer);

	        		_this.easyOptions.push(arr);
	      		}

			});
		},

		getMedium: function(){
			let _this = this;
			$.getJSON("https://opentdb.com/api.php?amount=50&category=9&difficulty=medium&type=multiple&token="+this.token, function(result){

	      		for (let i = 0; i < result.results.length; i++) {
	        		_this.mediumQuestions.push(result.results[i].question);

					let arr= [];

	        			let option1={
							value: result.results[i].incorrect_answers[0],
							tag: "wrong1"
						}

						let option2={
							value: result.results[i].incorrect_answers[1],
							tag: "wrong2"
						}

						let option3={
							value: result.results[i].incorrect_answers[2],
							tag: "wrong3"
						}

	        			arr.push(option1);
	        			arr.push(option2);
	        			arr.push(option3);

	        		let rightAnswer={
						value: result.results[i].correct_answer,
						tag: "right"
					}

	        		let rand= Math.floor(Math.random() * 4);

	        		arr.splice(rand, 0, rightAnswer);

	        		_this.mediumOptions.push(arr);
	      		}

			});
		},

		getHard: function(){
			let _this = this;
			$.getJSON("https://opentdb.com/api.php?amount=30&category=9&difficulty=hard&type=multiple&token="+this.token, function(result){
	      		for (let i = 0; i < result.results.length; i++) {
	        		_this.hardQuestions.push(result.results[i].question);
							// console.log(result.results[i].question);
							// console.log(result.results[i].correct_answer);

					let arr= [];

	        			let option1={
							value: result.results[i].incorrect_answers[0],
							tag: "wrong1"
						}

						let option2={
							value: result.results[i].incorrect_answers[1],
							tag: "wrong2"
						}

						let option3={
							value: result.results[i].incorrect_answers[2],
							tag: "wrong3"
						}

	        			arr.push(option1);
	        			arr.push(option2);
	        			arr.push(option3);

	        		let rightAnswer={
						value: result.results[i].correct_answer,
						tag: "right"
					}

	        		let rand= Math.floor(Math.random() * 4);

	        		arr.splice(rand, 0, rightAnswer);

	        		_this.hardOptions.push(arr);
	      		}

			});
		},

		setQ: function(event){

			let targetId = event.currentTarget.id;

			if (targetId === "100") {
				if (this.eCount <49) {
					this.currentQuestion = this.easyQuestions[this.eCount] ;
					this.currentOptions = this.easyOptions[this.eCount] ;
					this.eCount+=1;
				}else {
					this.currentQuestion = this.easyQuestions[this.eCount] ;
					this.currentOptions = this.easyOptions[this.eCount] ;
					this.eCount=0;
					//this.getEasy();
				}
				this.active=true;
				this.possibleScore=100;
			}

			if (targetId === "300") {
				if (this.mCount <49) {
					this.currentQuestion = this.mediumQuestions[this.mCount] ;
					this.currentOptions = this.mediumOptions[this.mCount] ;
					this.mCount+=1;
				}

				else {
					this.currentQuestion = this.mediumQuestions[this.mCount] ;
					this.currentOptions = this.mediumOptions[this.mCount] ;
					this.mCount=0;
					//this.getMedium();
				}
				this.active=true;
				this.possibleScore=300;
			}

			if (targetId === "500") {
				if (this.hCount <29) {
					this.currentQuestion = this.hardQuestions[this.hCount] ;
					this.currentOptions = this.hardOptions[this.hCount] ;
					this.hCount+=1;
				}else {
					this.currentQuestion = this.hardQuestions[this.hCount] ;
					this.currentOptions = this.hardOptions[this.hCount] ;
					this.hCount=0;
					//this.getHard();
				}
				this.active=true;
				this.possibleScore=500;
			}

		},

		submitAnswer: function(event){
			let targetClass = event.currentTarget.id;
			if (targetClass === "right") {
				this.toAdd=this.possibleScore;

				if(this.playerTurn===1){
					this.p1score+=this.toAdd;
					this.active=false;
					this.possibleScore=0;
					this.currentQuestion = null ;
					this.currentAnswer = null ;
					this.currentOptions = null ;

					if(this.attempt === 1){
						this.playerTurn=2;
					}else{
						this.attempt = 1;
						this.playerTurn=1;
					}
					return;
				}

				if(this.playerTurn===2){
					this.p2score+=this.toAdd;
					this.active=false;
					this.possibleScore=0;
					this.currentQuestion = null ;
					this.currentAnswer = null ;
					this.currentOptions = null ;

					if(this.attempt === 1){
						this.playerTurn=1;
					}else{
						this.playerTurn=2;
						this.attempt = 1;
					}
					return;
				}

			}
			else{
				if (this.attempt===1) {
					this.attempt =2;
					if (this.playerTurn===1) {
					this.playerTurn =2;
					}else{
						this.playerTurn=1;
					}
				}
				else{
					this.attempt = 1;
					this.active=false;
					this.possibleScore=0;
					this.currentQuestion = null ;
					this.currentAnswer = null ;
					this.currentOptions = null ;
				}
			}
			this.toAdd=0;
		}
	},

	computed:{

	},

	watch:{
		p1score: function(){
			this.win=Math.abs(this.p1score-this.p2score);
			if(this.p1score===this.p2score){
				this.progress=50;
			}
			if(this.p1score>this.p2score){
				let delta1 = (this.p1score-this.p2score)/20;
				this.progress = 50 + delta1;
			}
			if(this.p1score<this.p2score){
				let  delta2= (this.p2score-this.p1score)/20;
				this.progress = 50-delta2;
			}
    },

		p2score: function(){
			this.win=Math.abs(this.p1score-this.p2score);
			if(this.p1score===this.p2score){
				this.progress=50;
			}
			if(this.p1score>this.p2score){
				let delta1 = (this.p1score-this.p2score)/20;
				this.progress = 50 + delta1;
			}
			if(this.p1score<this.p2score){
				let  delta2= (this.p2score-this.p1score)/20;
				this.progress = 50-delta2;
			}
		},

		playerTurn: function(){
			if(this.playerTurn===1){
				this.p1inactive=false;
				this.p2inactive=true;
			}

			if(this.playerTurn===2){
				this.p1inactive=true;
				this.p2inactive=false;
			}

		},

		win: function(){
			if(this.win>=1000){
				alert("Game Over!");
			}
		}



	},

	mounted:function(){

	}

});
