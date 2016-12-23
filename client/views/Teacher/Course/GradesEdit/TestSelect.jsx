import React from 'react';
import { Card, CardHeader, CardActions, FontIcon, Checkbox } from 'material-ui';

TeacherGradesEditTestSelect = React.createClass({

  // Render

  render() {
    const { tests, handleTestCheck, test } = this.props;

    return (
      <div className='ui vertical basic segment'>
        <div className='ui internally celled grid'>
          {_.map(tests, ({ name, _id, scores }) =>
            <div key={_id}
              className='eight wide mobile six wide tablet four wide computer column'>
              <Card>
                <CardHeader
                  title={name}
                  subtitle={`Valor: ${_.sum(scores)}`} />
                <CardActions>
                  <Checkbox
                    onCheck={handleTestCheck}
                    checked={_.isEqual(test, _id)}
                    data-value={_id}
                    checkedIcon={<FontIcon className='material-icons'>
                        check_box
                      </FontIcon>}
                    unCheckedIcon={<FontIcon className='material-icons'>
                        check_box_outline_blank
                      </FontIcon>} />
                </CardActions>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  },
});
