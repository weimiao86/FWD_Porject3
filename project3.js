console.log("main.js connected");
if (window.jQuery) {console.log('jquery detected');}

new Vue({
	el:'#app',
	data: {
		p1score:0,
		p2score:0,
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
			$.getJSON("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&token="+this.token, function(result){

	      		for (let i = 0; i < result.results.length; i++) {
	        		_this.easyQuestions.push(result.results[i].question);

							let arr= [];

	        		let option1={
								value: result.results[i].incorrect_answers[0],
								tag: "wrong"
							}

							let option2={
								value: result.results[i].incorrect_answers[1],
								tag: "wrong"
							}

							let option3={
								value: result.results[i].incorrect_answers[2],
								tag: "wrong"
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
			$.getJSON("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&token="+this.token, function(result){

	      		for (let i = 0; i < result.results.length; i++) {
	        		_this.mediumQuestions.push(result.results[i].question);

					let arr= [];

	        			let option1={
							value: result.results[i].incorrect_answers[0],
							tag: "wrong"
						}

						let option2={
							value: result.results[i].incorrect_answers[1],
							tag: "wrong"
						}

						let option3={
							value: result.results[i].incorrect_answers[2],
							tag: "wrong"
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
			$.getJSON("https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple&token="+this.token, function(result){

	      		for (let i = 0; i < result.results.length; i++) {
	        		_this.hardQuestions.push(result.results[i].question);

					let arr= [];

	        			let option1={
							value: result.results[i].incorrect_answers[0],
							tag: "wrong"
						}

						let option2={
							value: result.results[i].incorrect_answers[1],
							tag: "wrong"
						}

						let option3={
							value: result.results[i].incorrect_answers[2],
							tag: "wrong"
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
				if (this.eCount <9) {
					this.currentQuestion = this.easyQuestions[this.eCount] ;
					this.currentOptions = this.easyOptions[this.eCount] ;
					this.eCount+=1;
				}else {
					this.currentQuestion = this.easyQuestions[this.eCount] ;
					this.currentOptions = this.easyOptions[this.eCount] ;
					this.eCount=0;
					this.getEasy();
				}
				this.active=true;
				this.possibleScore=100;
			}

			if (targetId === "300") {
				if (this.mCount <9) {
					this.currentQuestion = this.mediumQuestions[this.mCount] ;
					this.currentOptions = this.mediumOptions[this.mCount] ;
					this.mCount+=1;
				}

				else {
					this.currentQuestion = this.mediumQuestions[this.mCount] ;
					this.currentOptions = this.mediumOptions[this.mCount] ;
					this.mCount=0;
					this.getMedium();
				}
				this.active=true;
				this.possibleScore=300;
			}

			if (targetId === "500") {
				if (this.hCount <9) {
					this.currentQuestion = this.hardQuestions[this.hCount] ;
					this.currentOptions = this.hardOptions[this.hCount] ;
					this.hCount+=1;
				}

				else {
					this.currentQuestion = this.hardQuestions[this.hCount] ;
					this.currentOptions = this.hardOptions[this.hCount] ;
					this.hCount=0;
					this.getHard();
				}
				this.active=true;
				this.possibleScore=500;
			}

		},

		submitAnswer: function(event){
			let targetClass = event.currentTarget.className;
			if (targetClass === "right") {
				this.toAdd=this.possibleScore;
			}

			else{
				this.toAdd=0;
			}
			this.active=false;
			this.possibleScore=0;
			this.currentQuestion = null ;
			this.currentAnswer = null ;
			this.currentOptions = null ;
		}
	},

	computed:{

	},

	watch:{

		tries: function(){

		}

	},

	mounted:function(){

	}

});
