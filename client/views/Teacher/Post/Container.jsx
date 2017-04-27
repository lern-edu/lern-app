// Libs
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// Views
import TeacherPostView from './View.jsx';

TeacherPost = createContainer(({ postId }) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
    posts: Meteor.subscribe('UserPost', { postId }),
    courses: Meteor.subscribe('TeacherCourses'),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    post: _.head(Fetch.General.posts().fetch()),
    courses: Fetch.General.courses().fetch(),
    tags: Fetch.Public().tags().fetch(),
    subjects: Fetch.Public().subjects().fetch(),
  };

  return data;
}, TeacherPostView);
