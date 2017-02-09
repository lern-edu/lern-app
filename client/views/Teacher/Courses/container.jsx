import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Views
import TeacherCoursesView from './View.jsx';

TeacherCourses = createContainer(({ params }) => {

  const userId = Meteor.userId();

  const handles = {
    courses: Meteor.subscribe('TeacherCourses', {},
      { subjects: true, tags: true }),
  };

  return {
    ready: _.mapValues(handles, h => h.ready()),
    subjects: Fetch.Public().subjects().fetch(),
    tags: Fetch.Public().tags().fetch(),
    courses: Fetch.Teacher(userId).courses().fetch(),
  };
}, TeacherCoursesView);
