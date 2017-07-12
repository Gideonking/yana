import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';
import LevelCourse from '../components/LevelCourse';
import CoursesPage from './CoursesPage'
import {
  languageIDs, languageIDToNames, languageIDToFlagImages
} from '../content/languages'

const  LanguagesPage = () => (
  <div>
    <MainHeader title="Languages"/>
    {
      languageIDs.map((languageId) =>
        <LevelCourse
          languageID={languageId}
          course_icon={ languageIDToFlagImages[languageId] }
          path={ `/languages/${languageId}` }
          title={ languageIDToNames[languageId] }
        />
      )
    }
  </div>
)


export default LanguagesPage;
