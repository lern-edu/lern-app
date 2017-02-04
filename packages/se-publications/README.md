# Publications

Publications are divided by few states:
- Admin (role)
- School (role)
- Student (role)
- Teacher (role)
- Public (Not logged on app)
- User (Logged on app)

How to use:

~~~js
// Libs to use reactive data from database
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// View to bind reactive data
import View from './View.jsx';

Container = createContainer(({ params }) => {

  // handle subscription
  const handles = [
    Meteor.subscribe('STATE+COLLECTION+OPTIONS'),
  ];

  // Return data on View props
  return {
    ready: _.every(handles, h => h.ready()),
    COLLECTION: COLLECTION.find({ OPTIONS }).fetch(),
  };
}, View);
~~~
___
## School
### Courses - *plain*
- Return courses created by **current** School
- How to use:
~~~js
  Meteor.subscribe('SchoolCourses')
~~~
### Students - *plain*
- Return students managed by **current** School
- How to use:
~~~js
  Meteor.subscribe('SchoolStudents')
~~~
### Teachers - *plain*
- Return teachers managed by **current** School
- How to use:
~~~js
  Meteor.subscribe('SchoolTeachers')
~~~
___
## Public
### Subjects - *plain*
- Return **all** Subjects
- How to use:
~~~js
  Meteor.subscribe('PublicSubjects')
~~~
### Tags - *composite*
- Return **all** Tags or selected Tags
  - Return **Subjects** from returned Tags
- How to use:
~~~js
  Meteor.subscribe('PublicTags', {
    tagId: *Array or String*,
    subjectIds: *Array or String*,
  })
~~~
___
