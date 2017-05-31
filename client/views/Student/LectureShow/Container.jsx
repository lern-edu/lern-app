// Libs
import { createContainer } from 'meteor/react-meteor-data';

// View
import StudentLectureShowView from './View.jsx';

StudentLectureShow = createContainer(({ lectureId, courseId }) => {

  const handles = {
    lectures: Meteor.subscribe(
      'StudentLectures',
      { lectureId },
      {
        author: true,
        course: true,
        subjects: true,
        tags: true,
      }
    ),
  };

  const data = {
    ready: _.mapValues(handles, h => h.ready()),
    lecture: _.first(Fetch.General.lectures().fetch()),
  };

  data.course = data.lecture && _.head(data.lecture.findCourse().fetch());
  data.subjects = data.lecture && data.lecture.findSubjects().fetch();
  data.tags = data.lecture && data.lecture.findTags().fetch();
  data.author = data.lecture && _.head(data.lecture.findAuthor().fetch());

  return data;
}, StudentLectureShowView);
