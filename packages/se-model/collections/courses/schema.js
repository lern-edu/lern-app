Courses = new Mongo.Collection('courses');

Courses.DaySchema = Astro.Class({
  name: 'CourseDay',
  fields: {
    day: {
      type: 'string',
      validator: Validators.OneOf(WeekDays.all('keys')),
    },
  },
  behaviors: [
    'timeBounds',
  ],
});

Courses.Schema = Astro.Class({
  name: 'Course',
  collection: Courses,
  fields: {
    name: {
      type: 'string',
      validator: Validators.String(),
    },
    teachers: {
      type: 'array',
      validator: Validators.and([Validators.minLength(1), Validators.References()]),
    },
    students: {
      type: 'array',
      validator: Validators.References(),
      default: () => [],
    },
    schedule: {
      type: 'array',
      nested: 'CourseDay',
      validator: Validators.and([Validators.required(), Validators.minLength(0)]),
      default: () => [],
    },
    score: {
      type: 'number',
      default: 100,
    },
    initial: {
      type: 'object',
      validator: Validators.object(),
      optional: true,
    },
    alias: {
      type: 'string',
    },
  },
  behaviors: [
    'creatable',
    'multiSubject',
    'tagable',
    'timeBounds',
  ],
});
