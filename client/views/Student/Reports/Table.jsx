import React from 'react';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui';
import { redA700, green700 } from 'material-ui/styles/colors';

StudentReportsTable = React.createClass({
  getTagData(tagId) {
    const { questions, answers } = this.props;

    const qs = _.filter(questions, question => _.includes(question.tags, tagId));
    const qsIds = _.map(qs, '_id');
    const ans = _.filter(answers, answer => _.includes(qsIds, answer.question));

    return {
      total: ans.length,
      hits: _.filter(ans, { grade: 1 }).length,
      misses: _.filter(ans, { grade: 0 }).length,
    };
  },

  render() {
    const { subjectId, tags } = this.props;

    const _tags = _.filter(tags, { subject: subjectId });
    let ref;

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>
              Tema
            </TableHeaderColumn>
            <TableHeaderColumn>
              Questões
            </TableHeaderColumn>
            <TableHeaderColumn>
              <span style={{ color: green700 }}>Acertos</span>
            </TableHeaderColumn>
            <TableHeaderColumn>
              <span style={{ color: redA700 }}>Erros</span>
            </TableHeaderColumn>
            <TableHeaderColumn>
              Desempenho
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {_.map(_tags, tag =>
            <TableRow key={tag._id}>
              <TableRowColumn>
                {tag.text}
              </TableRowColumn>
              {(ref = this.getTagData(tag._id)) && [
                <TableRowColumn key='total'>
                  {ref.total}
                </TableRowColumn>,
                <TableRowColumn key='hits'>
                  {ref.hits}
                </TableRowColumn>,
                <TableRowColumn key='misses'>
                  {ref.misses}
                </TableRowColumn>,
                <TableRowColumn key='perc'>
                  {ref.total > 0 ? numeral(ref.hits / ref.total).format('0%') : 'N/A'}
                </TableRowColumn>,
              ]}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  },
});
