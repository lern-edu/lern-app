import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

//Views
import TeacherCourseShowView from './View.jsx';

TeacherCourseShow = createContainer(({ params }) => {

    const { courseId } = this.props;

    const handles = {
      subjects: Meteor.subscribe('PublicSubjects'),
      tags: Meteor.subscribe('PublicTags'),
      course: Meteor.subscribe('TeacherCourses', { courseId }, {
        posts: true,
        users: true,
        tests: true,
        lectures: true,
        attempts: true,
        answers: true,
        questions: true,
        grades: true,
      }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      subjects: Fetch.Public().subjects().fetch(),
      tags: Fetch.Public().tags().fetch(),
      course: _.first(Fetch.General.courses(courseId).fetch()),
      images: Fetch.General.images().fetch(),
      documents: Fetch.General.documents().fetch(),
      attempts: Fetch.General.attempts().fetch(),
      answers: Fetch.General.answers().fetch(),
      questions: Fetch.General.questions().fetch(),
      grades: Fetch.General.grades().fetch(),
    };

    data.students = data.course && data.course.findStudents().fetch();
    data.teachers = data.course && data.course.findTeachers().fetch();
    data.tests = data.course && data.course.findTests().fetch();
    data.posts = data.course && data.course.findPosts().fetch();
    data.lectures = data.course && data.course.findLectures().fetch();
    data.userId = Meteor.userId();

    return data;
  }, TeacherCourseShowView);
