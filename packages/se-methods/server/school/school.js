import { convertToRaw, convertFromRaw, ContentState } from 'draft-js';
const [prefix, protect] = ['School', 'school'];

Helpers.Methods({ prefix, protect }, {
  CourseCreate(doc) {
    Helpers.DefaultSave(doc);

    const course = _.get(doc, '_id');

    _.forEach(doc.students, student => {
      if (!Grades.findOne({ student, course })) {
        const grade = new Grades.Schema({ student, course });
        Helpers.DefaultSave(grade);
      };
    });

    if (_.get(doc, '_isNew'))
    _.forEach(doc.schedule, s => {
      const startDate = moment(s.startDate);
      const endDate = moment(s.endDate);
      let lectureDays = moment().day(_.get(WeekDays.all('both'), s.day));
      if (lectureDays.isBefore(doc.startDate))
        lectureDays.add(7, 'd');

      while (lectureDays.isSameOrBefore(doc.endDate)) {
        const schedule = new Lectures.Schema({
          course,
          startDate: new Date(lectureDays.hour(startDate.hour())
          .minute(startDate.minute())
            .second(startDate.second()).toDate()),
          endDate: new Date(lectureDays.hour(endDate.hour())
          .minute(endDate.minute())
            .second(endDate.second()).toDate()),
        });

        Helpers.DefaultSave(schedule);
        lectureDays.add(7, 'd');
      };
    });

    if (_.includes(_.get(doc, 'subjects'), 'k5cvmFbgMcH7di52A')) {
      const newTest = new Tests.Schema(Tests.findOne('Chzxqg7yBpY3GdbzG'));
      newTest.set('course', _.get(doc, '_id'));
      newTest.set('_id', null);
      const test = newTest.save();
      doc.set('initial', { 1: { test } });
    };

    return doc;
  },
});
