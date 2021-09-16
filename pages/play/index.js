import { Component } from "react";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true,
        questions: props.questions,
        questionIndex: 0,
        score: 0
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1
    }));
  }

  render() {
    return (
        <div>
            <h1>{this.state.questions[this.state.questionIndex].headline}</h1>
            <button onClick={this.handleClick}>Next</button>
        </div>
    );
  }
}

export async function getStaticProps() {
  
    const res = await fetch("http://localhost:3000/api/quizzes");
    const questions = await res.json()

    return {
        props: {
            questions,
        },  
    }
}

// export async function getServerSideProps({req, res}) {
  
//     res = await fetch("http://localhost:3000/api/quizzes");
//     console.log(await res);
//     const results = await res.json();
//     var questions = [];
  
//     results.forEach(element => {
//       questions.push(element.headline);
  
//     });
//     console.log(questions);
//     return { props: {questions : results }}
//   }
  
  