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
        return Fetch.Public().subjects(subjectId);
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

  Posts(query={}, options={}, { author, subjects, tags, images, documents }={}) {
    return {
      find() {
        return Fetch.General.posts(query, options);
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

        {
          find(post) {
            return images && post.findImages();
          },
        },

        {
          find(post) {
            return documents && post.findDocuments();
          },
        },
      ],
    };
  },

  Questions({ subjectId, text, tagsIds, type, onlyMine, questionsIds, notQuestions }={},
      { limit=1, skip=0 },
      { tags, subject }) {
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

});
