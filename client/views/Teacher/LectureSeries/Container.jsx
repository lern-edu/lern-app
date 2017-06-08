// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherLectureSeriesView from './View.jsx';

TeacherLectureSeries = createContainer(({ courseId }) => {

  const handles = {
    course: Meteor.subscribe(
      'TeacherCourses',
      { courseId },
    ),
    tags: Meteor.subscribe('PublicTags'),
    subjects: Meteor.subscribe('PublicSubjects'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    course: _.first(Fetch.General.courses(courseId).fetch()),
    tags: Fetch.Public().tags().fetch(),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, TeacherLectureSeriesView);
