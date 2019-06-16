import React , {Component , Fragment} from 'react';

const initialState = {
    quote:{
        quoteText:'',
        quoteAuthor:''
    },
    hasQuote:false,
    allQuotes:false,
    items:[]
    
};
class QuoteMachine extends Component {
    
    constructor() {
        super();
        this.state=initialState;
        this.END_POINT = 'https://quota.glitch.me/random';
        this.url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    }

    reset() {
        this.setState(initialState);
    }

    getRandomQuote = event =>{
        this.reset();
        fetch(this.END_POINT)
        .then(response => response.json())
        .then(data=> {
            if(data.quoteText && data.quoteAuthor ){
                let quote = this.state;
                quote.quoteAuthor = data.quoteAuthor;
                quote.quoteText = data.quoteText;
                this.setState({quote} , ()=>{
                    if (this.state.hasQuote === false) {
                        this.setState({hasQuote : true})
                    }
                })

            }
            else{
                return console.error ('NO Quote ! 404');
            }
        } )
    }

    renderQuote = ()=>{
        const {quoteText , quoteAuthor} = this.state.quote;
        return(
            <div>
            <div className="quoteBox">
               <h2 id="quoteText">	<i class="fa fa-quote-left"></i> {quoteText}	</h2>
               <p id="quoteAuthor"> 
                  <i className="fa fa-pencil"></i>
                  {quoteAuthor}
               </p>
            </div>
            <div onClick={()=>this.shareOnTwitter(quoteText)} className="fa fa-twitter"></div>
            </div>
        )
    }
    shareOnTwitter = (text)=>{
        let url = "http://google.com";
        window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
    }

    getAllQuotes = e =>{
        this.reset();
        fetch(this.url)
        .then(response => response.json())
        .then(data=>{
  
            if (data.quotes.length !==0){
                let items = this.state.items;
                for(let i=0;i<data.quotes.length;i++){
                    let j=data.quotes[i].quote;
                    items.push(j)
                }
               
                this.setState(items, ()=>{
                    if (this.state.allQuotes === false) {
                        this.setState({allQuotes : true})
                    }
                })
            }
            else{
               return console.error("NO QOUTE...!")
            } 
        })
    }

    renderAllQuotes = ()=>{
        const {items} = this.state;
        return (
            <div className="scroll">
                {items.map((todo, i) => {
                  return (
                      <li key={todo.toString()}>{todo}</li>
                  );
                })
                }
                
            </div>
        );
    }
     
    render() {
        const {hasQuote, allQuotes} = this.state;
        return(
            <Fragment>
              <h1> Quote machine </h1>
              <button className='btn_quote' onClick={this.getRandomQuote}>
                    Random Quote!
              </button>
               <button className='btn_quote' onClick={this.getAllQuotes}>
                    All of the Quotes!
              </button>  

              <br/>
              {hasQuote === true ? 
              this.renderQuote()
              : ''}
              
              {allQuotes === true ? 
              this.renderAllQuotes()
              : ''}

            </Fragment>
        )
    }
}

export default QuoteMachine;

