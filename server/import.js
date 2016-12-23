
Meteor.startup(() => {
  if (Meteor.isServer) {
    const Future = Npm.require('fibers/future');
    DataManager = {
      clearCollections(collection, query={}) {
        const opt = {
          Questions: Questions,
          Tags: Tags,
          Subjects: Subjects,
          Images: FS.Images,
          Attempts: Attempts,
          Posts: Posts,
          Plans: Plans,
          Lectures: Lectures,
          Courses: Courses,
          Answers: Answers,
          Tests: Tests,
        };
        opt[collection].remove(query);
      },

      removeDuplicate(query) {
        const questions = Questions.find(query).fetch();
        for (var i = 0; i < questions.length; i++) {
          for (var j = i + 1; j < questions.length; j++) {
            if (questions[i].text == questions[j].text)
              questions[j].remove();
          };
        };
      },

      getFileText(path) {
        const future = new Future();
        let data = {};
        Assets.getText(path, (err, res) => {
          if (err) {
            future.throw(err);
          } else {
            data = res;
            future.return(res);
          };
        });
        future.wait();
        return data;
      },

      insertData(path, collection, start=0) {

        function insertCollection(collection, data) {
          const future = new Future();
          let save = {};
          if (collection.Schema)
            collection.insert(data, (err, res) => {
              if (err) {
                future.throw(err);
              } else {
                save = res;
                future.return(save);
              };
            });
          else Meteor.setTimeout(() => {
            try {
              FS.Images.insert(data, (err, res) => {
                if (err) {
                  console.log(err);
                  save = null;
                } else save = res;
                future.return(save);
              });
            } catch (e) {
              save = null;
              future.return(save);
            };
          }, 3000);

          future.wait();
          return save;
        };

        // Meteor wrap functions
        const wrapUpdateData = Meteor.wrapAsync(this.updateData);

        // Get data from files

        const data = JSON.parse(this.getFileText(path));

        //const data = JSON.parse(wrappedGetText(path));

        const actions = {
          Subjects() {
            // Create all subjects
            _.every(data, s => delete s._id);
            _.forEach(data, s => insertCollection(Subjects, s));
            _.forEach(Subjects.find().fetch(), s => {
              if (!s.validate())
                Subjects.remove({ _id: s._id });
            });
          },

          Tags() {
            // Create all tags
            _.forEach(data, t => insertCollection(Tags, {
                text: t.name,
                subject: _.get(Subjects.findOne({ name: t.subject }), '_id'),
              }));
            _.forEach(Tags.find().fetch(), s => {
              if (!s.validate())
                Tags.remove({ _id: s._id });
            });
          },

          Questions() {
            console.log('Start Import');
            console.log('Initial questions count: ' + data.length);

            const tagsObj = Tags.find().fetch();
            const subjectObj = Subjects.find().fetch();

            // Iterate questions

            for (var i = start; i < data.length; i++) {
              const question = data[i];

              // Change to subjectId
              question.subject = _.get(
                Subjects.findOne({ name: question.subject }), '_id'),

              _.pull(data[i].tags, '');

              // Change to tagId
              const auxTags = [];
              _.forEach(question.tags, qt => {
                const findTagId = _.get(Tags.findOne({ text: qt }), '_id');
                if (findTagId)
                  auxTags.push(findTagId._id);
              });
              question.tags = auxTags;
              question.type = 'closed';

              console.log(i);

              if (!question.subject) {
                console.log('No subject ahead');
                return;
              };

              delete question._id;

              _.forEach(question.options, opt => {
                if (opt.image) {
                  opt.image = insertCollection('image', opt.image);
                  if (!opt.image) {
                    console.log(i + ' image opt error');
                    question.text = null;
                  } else
                    opt.image = _.get(opt.image, '_id');
                };
              });

              // Download image
              if (question.image) {
                question.image = insertCollection('image', question.image);
                if (!question.image) {
                  console.log(i + ' image error');
                  question.text = null;
                } else
                question.image = _.get(question.image, '_id');
              };

              console.log(i);

              // Insert Question
              const questionId = insertCollection(Questions, question);
              if (!Questions.findOne({ _id: questionId }).validate()) {
                Questions.remove({ _id: questionId });
              }

            };

            // Alert finish
            console.log('Import finished!');
            console.log('Questions imported: ' + Questions.find().fetch().length);
          },
        };
        actions[collection]();

      },
    };
  };
});
