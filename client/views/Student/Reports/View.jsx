import React from 'react';

StudentReportsView = React.createClass({
  mixins: [ReactMeteorData],

  /* Reactive Data Fetching
  */

  getMeteorData() {
    const userId = Meteor.userId();

    const handles = {
      grades: Meteor.subscribe('StudentGrades'),
    };

    const data = {
      ready: _.mapValues(handles, h => h.ready()),
      answers: Fetch.User(userId).answers().fetch(),

    };

    data.questions = Fetch.General.questions(_.map(data.answers, 'question')).fetch();
    data.subjects = Fetch.General.subjects(_.map(data.questions, 'subject')).fetch();
    data.tags = Fetch.General.tags(_.flatten(_.map(data.questions, 'tags'))).fetch();

    return data;
  },

  /* Lifecycle
  */

  getInitialState() {
    return { subjectId: undefined };
  },

  /* Handlers
  */

  handleSubjectChange(__, __, subjectId) {
    this.setState({ subjectId });
  },

  /* Render
  */

  render() {
    const { ready } = this.data;
    const { subjectId } = this.state;

    return (
      <div className='ui container'>

        <Layout.Bar
          title='Relatórios'
        />

        {!_.every(ready) ? <MUI.LinearProgress/> :
          <div>

            <StudentReportsToolbar parent={this} {...this.state} {...this.data}/>

            {!subjectId ? undefined :
              <div>
                <MUI.Paper className='ui basic segment'>
                  <StudentReportsTable {...this.state} {...this.data} key={subjectId + 'table'}/>
                </MUI.Paper>
                <StudentReportsChart {...this.state} {...this.data} key={subjectId + 'chart'}/>
              </div>
            }

          </div>
        }

      </div>
    );

    // old
    return (
      <div>

        <Layout.Bar
          title='Relatórios'
        />

        <div className={`ui basic segment centered grid ${ready.grades ? '' : 'loading'}`}>

          <div className='eight wide column'>
            <StudentReportsContent {...this.data} />
          </div>

        </div>
      </div>
    );
  },
});
