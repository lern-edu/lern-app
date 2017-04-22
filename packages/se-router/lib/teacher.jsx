import React from 'react';
const { render } = Layout.setup({ protect: 'teacher', nav: true, bar: true });

const teacherRoutes = FlowRouter.group({
  prefix: '/professor',
  name: 'Teacher',
});

teacherRoutes.route('/', {
  name: 'TeacherHome',
  action() {
    render({
      main: <TeacherHome />,
    });
  },
});

teacherRoutes.route('/ajustes', {
  name: 'TeacherSettings',
  action(params, query) {
    render({
      main: <TeacherSettingsView {...query}/>,
    });
  },
});

// posts

teacherRoutes.route('/posts', {
  name: 'TeacherPosts',
  action(params, query) {
    render({
      main: <TeacherPostsView {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/posts/novo', {
  name: 'TeacherPostCreate',
  action(params, query) {
    render({
      main: <TeacherPostCreateView {...query}/>,
    });
  },
});

teacherRoutes.route('/posts/editar/:postId', {
  name: 'TeacherPostEdit',
  action(params, query) {
    render({
      main: <TeacherPostEditView {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/posts/:postId', {
  name: 'TeacherPost',
  action(params) {
    render({
      main: <TeacherPostView {...params}/>,
    });
  },
});

/* Questions
*/

teacherRoutes.route('/questoes', {
  name: 'TeacherQuestions',
  action() {
    render({
      main: <TeacherQuestionsView />,
    });
  },
});

teacherRoutes.route('/questoes/criar', {
  name: 'TeacherQuestionCreate',
  action(params, query) {
    render({
      main: <TeacherQuestionCreate query={query} />,
    });
  },
});

// Tests

teacherRoutes.route('/testes', {
  name: 'TeacherTests',
  action(params, query) {
    render({
      main: <TeacherTestsView {...params} {...query}/>,
    });
  },
});

/* Courses
*/

teacherRoutes.route('/disciplinas', {
  name: 'TeacherCourses',
  action() {
    render({
      main: <TeacherCourses />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId', {
  name: 'TeacherCourseShow',
  action(params, query) {
    render({
      main: <TeacherCourseShow {...params} {...query} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade/criar', {
  name: 'TeacherTestCreate',
  action(params, query) {
    render({
      main: <TeacherTestCreateView {...params} query={query} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade-padrao/:testId', {
  name: 'TeacherTestShowDefault',
  action(params, query) {
    render({
      main: <TeacherTestShowDefault {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade-por-tag/:testId', {
  name: 'TeacherTestShowByTags',
  action(params, query) {
    render({
      main: <TeacherTestShowByTags {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/cognitivo/:testId', {
  name: 'TeacherTestShowCognitive',
  action(params, query) {
    render({
      main: <TeacherTestShowCognitiveView {...params} {...query}/>,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/notas/editar', {
  name: 'TeacherGradesEdit',
  action(params, query) {
    render({
      main: <TeacherGradesEditView {...params} query={query}/>,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/atividade/:testId/:attemptId/:questionId?', {
  name: 'TeacherTestGrade',
  action(params) {
    render({
      main: <TeacherTestGradeView {...params} />,
    });
  },
});

teacherRoutes.route('/blogs/novo', {
  name: 'TeacherPostCreate',
  action(params, query) {
    render({
      main: <TeacherPostCreateView {...params} {...query} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/aulas/criar', {
  name: 'TeacherLectureCreate',
  action(params) {
    render({
      main: <TeacherLectureCreate {...params} />,
    });
  },
});

teacherRoutes.route('/disciplinas/:courseId/aulas/:lectureId/chamada', {
  name: 'TeacherLecture',
  action(params) {
    render({
      main: <TeacherLecture {...params} />,
    });
  },
});
