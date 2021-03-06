import React from 'react'
import MainHeader from '../components/MainHeader'
import LevelCourse from '../components/LevelCourse'
import ActionButton from '../components/ActionButton'
import Footer from '../components/Footer'
import WordExercise from '../components/WordExercise'
import CourseCover from '../components/CourseCover'
import FinishCourse from "../components/FinishCourse"
import * as coursesAPI from '../api/courses';

import animal from '../img/animal.png';

class SingleCoursePage extends React.Component {
  // Act as initialize in ruby
  constructor(props) {
    // with props recive characteristic from father(who calls him)
    super(props);
    this.state = { course: null, currentWordIndex: null };
  }

  componentDidMount() {
    var url = "REACT_APP_API_URL" + this.props.courseName;
    coursesAPI.list(url)
      .then(course => {
        this.setState({course: course});
      })
      .catch(function(err) {
        console.log("Didn't connect to the API", err)
      });
  }

  nextWord = () => {
    this.setState((prevState) =>{
      if (prevState.currentWordIndex == null) {
        return { currentWordIndex: 0 }
      }
      else {
        return { currentWordIndex: prevState.currentWordIndex + 1 }
      }
    });
  }

  progressBarWordIndex = () => {
    const progressWordIndex = this.state.currentWordIndex + 1 ;
    return progressWordIndex;
  }

  currentWord = () => {
    const course = this.state.course;
    const wordIndex = this.state.currentWordIndex;

    // !null == true
    // !0 == true

    if(!course || wordIndex == null) {
      return null;
    }

    return course.words[wordIndex];
  }

  progressBar () {
    const wordIndex = this.state.currentWordIndex ;
   return wordIndex / this.totalWords() * 100
  }

  courseNotStarted() {
    return !this.currentWord()
  }

  courseFinished() {
    const wordIndex = this.state.currentWordIndex;
    return this.totalWords() === wordIndex
  }

  languageWords() {
    const course = this.state.course;
    const allWords = course.words
    const languageID = this.props.languageId

    return allWords.filter(word => {
      const wordHasLanguage = !!word.title[languageID]
      return wordHasLanguage // Keep if true, remove if false
    }) // filter down allWords to your language
  }

  totalWords() {
    return this.languageWords().length
  }

  render() {
    const course = this.state.course;
    const languageID = this.props.languageId

    if(!course) {
      return (<div>Loading</div>);
    }

    if(this.courseFinished()) {
      return <FinishCourse course={course}
                           languageId={languageID}/>

    }
    else if(this.courseNotStarted()) {
      return <CourseCover course={course}
                          nextWord={this.nextWord}
                          languageId={languageID}
                          totalWords={this.totalWords()} />

    } else {
      return(
      <WordExercise
              word={this.currentWord()}
              nextWord={this.nextWord}
              languageId={languageID}
              CurrentLevel={this.progressBar()} />)
    }
  }
}

export default SingleCoursePage;
