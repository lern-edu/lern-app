// Libs
import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import _ from 'lodash';

export default class TeacherCourseShowLecturesToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  /* Render
  */

  render() {
    const { handleChange, lectures, filter, course } = this.props;

    const months = _.uniq(
      _.map(
        _.sortBy(lectures, 'startDate'),
        ({ startDate }) => moment(startDate).format('MMMM')
      )
    );

    return (
      <Toolbar className='sixteen wide column'>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={filter} onChange={handleChange}>
            {
              _.map(months, m => <MenuItem key={m} value={m} primaryText={m} />)
            }
            <MenuItem value='all' primaryText='Todas' />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem
              href={
                FlowRouter.path(
                  `TeacherLectureSeries`,
                  { courseId: _.get(course, '_id') },
                )
              }
              primaryText='Criar série de aulas'
            />
            <MenuItem
              href={
                FlowRouter.path(
                  `TeacherLectureCreate`,
                  { courseId: _.get(course, '_id') },
                  { course: _.get(course, '_id') },
                )
              }
              primaryText='Criar aula'
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }

};
