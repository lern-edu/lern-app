import React from 'react';
import { Table, TableHeader, TableRow, TableRowColumn, TableHeaderColumn, TableBody, } from 'material-ui';

TeacherTestShowCognitiveInfoTable = React.createClass({

  // functions

  createTable() {
    const { attemptsFilter, infosFilter, questions,
      attempts, subjects, answers, students, grades, tags, test, } = this.props;


    const header = ['Nome'];
    _.forEach(_.get({
      grade: ['Nota'],
      questions: _.map(questions, (q, i) => `Questão ${i + 1}`),
      subjects: _.map(subjects, 'name'),
      tags: _.map(tags, 'text'),
      time: ['Tempo'],
    }, infosFilter), h => header.push(h));

    const data = {};
    const selectedAttempts = _.map(_.groupBy(attempts, 'author'), (att, key) =>
      _.assign({ user: key, attempts: _.sortBy(att, 'startedAt') }));

    _.forEach(_.sortBy(students, 'profile.name'), ({ _id, profile: { name } }) => {
      data[_id] = [name];

      const attempt = _.isEqual(attemptsFilter, 'grade')
        ? _.head(_.filter(attempts, a =>
          _.includes(_.get(_.find(grades, { student: _id }), 'attempts'), a._id)))
        : _.get(_.find(selectedAttempts,
            { user: _id }), `attempts[${attemptsFilter}]`);

      const ans = _.filter(answers, { attempt: _.get(attempt, '_id') });

      // define label
      const orderedTags = _.orderBy(tags, ['text']);
      const labels = _.map(orderedTags, 'text');
      const tagsIds = _.map(orderedTags, '_id');

      // calc performance
      const groupedQuestions = _.groupBy(questions, ({ tags }) => _.head(tags));
      console.log(groupedQuestions);
      const avaregeQuestions = _.map(tagsIds, t =>
        _.mean(
          _.map(
            _.get(groupedQuestions, t),
            ({ _id: qid }) =>
              _.toNumber(
                _.get(
                  _.find(ans, { question: qid }),
                'answer')
              )
          )
        )
      );
      const mean = _.round(_.mean(avaregeQuestions), 2);
      console.log(avaregeQuestions);
      options = {
        grade: [_.isEmpty(attempt) ? 'Sem nota' : !_.isNaN(mean) ? mean : 'Incompleto'],
        questions: _.map(test.questions, (question, index) => {
          const grade = _.get(_.find(answers,
              { attempt: _.get(attempt, '_id'), question }), 'grade');
          return _.isUndefined(grade) ? 'Sem Nota' : grade * _.get(test, `scores[${index}]`);
        }),
        tags: avaregeQuestions,
      };
      _.forEach(_.get(options, infosFilter), h => data[_id].push(h));
    });

    return _.assign({ header }, { data: _.sortBy(data, ['0']) });
  },

  // Render

  render() {
    const table = this.createTable();
    console.log(table);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {_.map(table.header, h => <TableHeaderColumn key={h}>{h}</TableHeaderColumn>)}
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} selectable={false}>
          {_.map(table.data, (row, key) =>
            <TableRow key={key}>
              {_.map(row, (label, index) =>
                <TableRowColumn key={index}>{label}</TableRowColumn>)}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  },

});
