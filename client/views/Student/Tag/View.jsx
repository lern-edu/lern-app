import React from 'react';
import { Paper, LinearProgress, Divider } from 'material-ui';

StudentTagView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const { tagId } = this.props;

    const handles = {
      tag: Meteor.subscribe('PublicTags', { tagId }),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      tag: _.first(Fetch.Public().tags(tagId).fetch()),
    };

    data.subject = data.tag && _.first(data.tag.findSubject().fetch());

    return data;
  },

  /* Render
  */

  render() {
    const { ready } = this.data;

    return (
      <div className='ui container'>
        <div className='ui centered grid'>
          <div className='eight wide computer sixteen wide tablet column'>
            <Paper>

              {!_.every(ready) ? <LinearProgress/> : [
                <StudentTagTitle {...this.data} key='title'/>,
                <Divider key='div'/>,
                <StudentTagWarning {...this.data} key='warning'/>,
              ]}

            </Paper>
          </div>
        </div>
      </div>
    );
  },
});
