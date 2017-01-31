// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import AdminTestCreateFormPageQuestionSearchShowView from './Show.jsx';

export default AdminTestCreateFormPageQuestionSearchShow =
  createContainer((params) => {
    const handles = {
      questions: Meteor.subscribe('PublicQuestions', params.query,
        { limit: 50, skip: params.skip },
        { subject: true, tags: true }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      questions: Fetch.General.questions({ _id:
        { $nin: params.questionsSelected }, }).fetch(),
    };

    data.images = data.questions && _.flatten(_.map(data.questions, q =>
        q.findAllImages().fetch()));
    data.tags = data.questions && Fetch.General.tags(
      _.uniq(_.flatten(_.map(data.questions, 'tags')))).fetch();
    data.subjects = data.questions && Fetch.General.subjects(
      _.uniq(_.map(data.questions, 'subject'))).fetch();

    return data;
  }, AdminTestCreateFormPageQuestionSearchShowView);
