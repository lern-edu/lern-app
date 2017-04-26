// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherPostsView from './View.jsx';

TeacherPosts = createContainer((query) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
    courses: Meteor.subscribe('TeacherCourses'),
    posts: Meteor.subscribe('PublicPosts', query || {}, { limit: 50 }, { author: true }),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    _courses: Fetch.General.courses().fetch(),
    _posts: Fetch.General.posts().fetch(),
    _subjects: Fetch.General.subjects().fetch(),
    _tags: Fetch.General.tags().fetch(),
    userId: Meteor.userId(),
  };

  data.authors = data.posts && Fetch.General.users(_.map(data.posts, 'author')).fetch();

  return data;
}, TeacherPostsView);
