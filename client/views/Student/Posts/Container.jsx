// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import StudentPostsView from './View.jsx';

StudentPosts = createContainer((query) => {

  const handles = {
    subjects: Meteor.subscribe('PublicSubjects'),
    tags: Meteor.subscribe('PublicTags'),
    courses: Meteor.subscribe('StudentCourses'),
    posts: Meteor.subscribe(
      'PublicPosts',
      _.pick(query, ['text', 'subjects', 'tags', 'course']) || {},
      { limit: 50, skip: _.get(query, 'skip') || 0 },
      { author: true }
    ),
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
}, StudentPostsView);
