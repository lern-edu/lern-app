if (Meteor.isServer) {
  const fs = Npm.require('fs');
  Meteor.methods({

    testToUrl({ name,
      author,
      info,
      subjects,
      tags,
      questions,
      scores,
      course,
      _id,
    }, images, { header }={}) {

      function downloadImage(img) {
        const path = process.env.PWD + '/public/export-images/' + img.name;
        var result = request.getSync(img.url, { encoding: null });
        fs.writeFileSync(path, result.body);
      };

      const { justify, center } = {
        center: { width: 410, align: 'center' },
        justify: { width: 410, align: 'justify' },
      };

      pdf = new PDFDocument();

      pdf.font('Times-Roman');

      if (header) {
        pdf.fontSize(12).text(name.toUpperCase(), 72, 15, center);
        pdf.moveDown(1).fontSize(10).text(info, center);
        pdf.moveDown(0.3).text(`Disciplina: ${_.get(Courses.findOne(course), 'name')}`, justify);

        const user = Meteor.users.findOne(author);
        if (!_.includes(user.roles, 'admin')) {
          pdf.moveDown(0.3).text(`${_.includes(user.roles, 'school') ? 'Escola' : 'Professor'}: ${
            _.get(Meteor.users.findOne(author), 'profile.name')}`, justify);
        };

        pdf.moveDown(0.3).text(`Matérias: ${_.map(
          _.filter(Fetch.General.subjects(subjects).fetch(),
            (s) => subjects.indexOf(s._id) >= 0),
          'name').join(' ,')}`, justify);

        if (tags && tags.length)
          pdf.moveDown(0.3).text(`Tags: ${_.map(
            _.filter(Fetch.General.subjects(tags).fetch(), (t) => tags.indexOf(t._id) >= 0),
            'text').join(' ,')}`, justify);

        pdf.moveDown(0.3).text('Nome: ', justify);

        if (scores)
          pdf.moveDown(0.3).text(`Valor: ${_.sum(scores)}`,  center);

      } else pdf.moveDown(7);

      _.forEach(Fetch.General.questions(questions).fetch(), (q, index) => {
        pdf.moveDown(2).fontSize(16).text(`Questão: ${index + 1}`);
        if (scores)
          pdf.fontSize(8).text(`Valor: ${_.get(scores, index)}`, pdf.x, pdf.y);
        pdf.moveDown(0.5).fontSize(12).text(q.text).moveDown(1);

        if (q.image) {
          downloadImage(images[q.image]);
          const path = process.env.PWD + '/public/export-images/'
            + _.get(images[q.image], 'name');
          pdf.addPage().image(path).moveDown(1);
          fs.unlinkSync(path);
        }

        if (q.type === 'closed')
          _.forEach(q.options, (opt) => {
            if (opt.text)
              pdf.text(`( ) ${opt.text}`).moveDown(0.5);
            else {
              downloadImage(images[opt.image]);
              const path = process.env.PWD + '/public/export-images/'
                + _.get(images[opt.image], 'name');
              pdf.text('( ) ').image(path).moveDown(0.5);
              fs.unlinkSync(path);
            };
          });
        else {
          pdf.rect(0, 0, 500, pdf.y).stroke();
          pdf.rect(0, 0, 500, pdf.y).stroke();
          pdf.rect(0, 0, 500, pdf.y).stroke();
        };
      });

      pdf.writeSync(process.env.PWD + '/public/documents/' + _id + '.pdf');

      const path = process.env.PWD + '/public/documents/' + _id + '.pdf';
      FS.Documents.insert(path, (err, fileObj) => {
        if (err) throw new Meteor.Error('Error create pdf', 'problems to generate pdf');
        else {
          const t = Tests.findOne(_id);
          t.set('documents', [_.get(fileObj, '_id')]);
          t.save();
          return fileObj;
        };

        fs.unlinkSync(path);
      });
    },

  });
};
