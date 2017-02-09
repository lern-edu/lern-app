const defs = {
  answers: {
    collection: Answers,
  },
  attempts: {
    collection: Attempts,
  },
  courses: {
    collection: Courses,
  },
  events: {
    collection: Events,
  },
  grades: {
    collection: Grades,
  },
  posts: {
    collection: Posts,
  },
  questions: {
    collection: Questions,
  },
  subjects: {
    collection: Subjects,
  },
  tags: {
    collection: Tags,
  },
  tests: {
    collection: Tests,
  },
  lectures: {
    collection: Lectures,
  },
  plans: {
    collection: Plans,
  },
  users: {
    collection: Meteor.users,
    fields: { roles: 1, profile: 1, emails: 1, planProfile: 1 },
  },

  images: {
    collection: FS.Images.collection,
  },
  documents: {
    collection: FS.Documents.collection,
  },
  videos: {
    collection: FS.Videos.collection,
  },
  audios: {
    collection: FS.Audios.collection,
  },
};

Fetch.General = _.mapValues(defs, def => (sel, opts={}) => {

  const selector =
      _.isArray(sel) ? { _id: { $in: _.compact(_.uniq(sel)) } }
    : _.isString(sel) ? sel
    : _.isObject(sel) ?
      (_.mapValues(_.omitBy(sel, _.isUndefined), val =>
        _.isArray(val) ? { $in: _.compact(_.uniq(val)) }
        : val)
      )
    : {}
    ;

  const options = _.omit({
    fields: def.fields || opts.fields,
    sort: def.sort || opts.sort,
    limit: def.limit || opts.limit || (_.isString(sel) ? 1 : undefined),
    skip: def.skip || opts.skip,
  }, _.isUndefined);

  return def.collection.find(selector, options);
});
