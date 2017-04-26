const [prefix, protect] = ['Public'];

Helpers.Publications({ type: 'plain', prefix, protect }, {
  Subjects() {
    return Fetch.Public().subjects();
  },

  Plans() {
    return Fetch.Public().plans();
  },

  Images(ids) {
    return Fetch.General.images(ids || []);
  },

  Documents(ids) {
    return Fetch.General.documents(ids || []);
  },
});

Helpers.Publications({ type: 'composite', prefix, protect }, {
  Tags({ tagId, subjectIds }={}) {
    return {
      find() {
        const query = {};
        if (subjectIds) {
          if (_.isArray(subjectIds)) query.subject = { $in: subjectIds };
          else query.subject = subjectIds;
        };

        if (tagId) {
          if (_.isArray(tagId)) query._id = { $in: tagId };
          else query._id = tagId;
        };

        return Tags.find(query);
      },

      children: [
        {
          find(tag) {
            return tag.findSubject();
          },
        },
      ],
    };
  },

  Subject({ subjectId }={}) {
    return {
      find() {
        return Fetch.General.subjects(subjectId);
      },

      children: [
        {
          find(subject) {
            return subject.findTags();
          },
        },
      ],
    };
  },

  Tag({ tagId, subjectId }={}) {
    return {
      find() {
        return Fetch.General.tags({ _id: tagId, subject: subjectId });
      },

      children: [
        {
          find(tag) {
            return tag.findSubject();
          },
        },
      ],
    };
  },

  Posts(query={}, options={}, { author, subjects, tags, courses }={}) {
    return {
      find() {
        const selector = _.omit(query, ['text']);
        if (query.text) {
          _.assign(selector, { $text: { $search: query.text } });
          _.assign(
            options,
            {
              sort: { score: { $meta: 'textScore' } },
              fields: { score: { $meta: 'textScore' } },
            }
          );
        };

        return Fetch.General.posts(selector, options);
      },

      children: [
        {
          find(post) {
            return author && post.findAuthor();
          },
        },

        {
          find(post) {
            return tags && post.findTags();
          },
        },

        {
          find(post) {
            return subjects && post.findSubjects();
          },
        },
      ],
    };
  },

  Questions({ subjectId, text, tagsIds, type, onlyMine, questionsIds, notQuestions }={},
      { limit=1, skip=0 },
      { tags, subject }={}) {
    return {
      find() {
        const selector = {};
        const options = { limit, skip, sort: { createdAt: 1 } };

        if (questionsIds)
          return Fetch.General.questions(_.isEmpty(questionsIds) ? [] : questionsIds);
        if (!_.isEmpty(tagsIds)) _.assign(selector, { tags: { $in: tagsIds } });
        if (subjectId) _.assign(selector, { subject: subjectId });
        if (onlyMine) _.assign(selector, { author: _.get(this, 'userId') });
        if (type) _.assign(selector, { type });
        if (notQuestions) _.assign(selector, { _id: { $nin: notQuestions } });
        if (text) {
          _.assign(selector, { $text: { $search: text } });
          _.assign(options, { sort: { score: { $meta: 'textScore' } },
            fields: { score: { $meta: 'textScore' } }, });
        };

        return Questions.find(_.isEmpty(selector) ? null : selector, options);
      },

      children: [
        {
          find(question) {
            return question && question.findAllImages();
          },
        }, {
          find(question) {
            return subject && question && question.findSubject();
          },
        }, {
          find(question) {
            return tags && question && question.findTags();
          },
        },
      ],
    };
  },

  Tests(
      { subjectsIds, tagsIds, type, onlyMine, course, testsIds }={},
      { limit=1, skip=0 },
      { tags, subjects }={}
  ) {
    return {
      find() {
        const options = { limit, skip, sort: { createdAt: 1 } };

        if (testsIds) return Fetch.General.tests(testsIds);

        return Fetch.General.tests({
            type,
            $or: [{ course: null }, { course }],
            tags: tagsIds,
            subjects: subjectsIds,
            author: onlyMine ? _.get(this, 'userId') : undefined,
          }, options);
      },

      children: [
        {
          find(question) {
            return subjects && question && question.findSubjects();
          },
        }, {
          find(question) {
            return tags && question && question.findTags();
          },
        },
      ],
    };
  },

});
