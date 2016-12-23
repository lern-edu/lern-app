import React from 'react';
import { List, ListItem, Badge, Card, CardHeader, CardText, } from 'material-ui';

AdminTestCreateFormQuestionsStatus = React.createClass({

  // render

  render() {
    const { subjectsInfo, subjects, tags, status } = this.props;
    return (
      <Card>
        <CardHeader
          title='Número de questões'
          actAsExpander={true}
          showExpandableButton={true}
          />
          <CardText expandable={true}>
            <List>
            {_.map(status, (value, subjectId) => {
              const subject = _.first(_.filter(subjects, s => s._id === subjectId));
              const selectedTags = _.filter(tags, t => value.tags[t._id]);

              return (
                <ListItem
                  key={subject._id}
                  primaryText={subject.name}
                  leftIcon={
                    <Badge
                      badgeContent={_.get(value, 'value')}
                      badgeStyle={{ fontSize: 16 }} >
                  </Badge>}
                  initiallyOpen={false}
                  primaryTogglesNestedList={true}
                  nestedItems={_.map(selectedTags, tag =>
                    <ListItem
                      key={tag._id}
                      primaryText={tag.text}
                      disabled={true}
                      leftIcon={
                        <Badge
                          badgeContent={_.get(value.tags, tag._id)}
                          badgeStyle={{ fontSize: 16 }} >
                      </Badge>}
                    />
                  )}
                />
              );
            })}
          </List>
        </CardText>
      </Card>
    );
  },

});
