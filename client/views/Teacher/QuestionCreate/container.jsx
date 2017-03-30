import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Views
import TeacherQuestionCreateView from './View.jsx';

TeacherQuestionCreate = createContainer(({ params }) => {
    const userId = Meteor.userId();

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
    };

    return {
      user: Meteor.user(),
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
    };
  }, TeacherQuestionCreateView);
