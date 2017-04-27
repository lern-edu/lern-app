// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import TeacherPostShowView from './View.jsx';

TeacherPostShow = createContainer(({ postId }) => {

  const handles = {
    post: Meteor.subscribe(
      'PublicPosts',
      { _id: postId },
      {},
      { subjects: true, tags: true, course: true, users: true }
    ),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    post: _.first(Fetch.General.posts().fetch()),
  };

  data.subjects = data.post && data.post.findSubjects().fetch();
  data.tags = data.post && data.post.findTags().fetch();
  data.author = data.post && _.first(data.post.findAuthor().fetch());
  data.users = data.post && Fetch.General.users().fetch();
  data.course = data.post && _.first(data.post.findCourse().fetch());

  return data;
}, TeacherPostShowView);
