import { FontIcon, RaisedButton } from 'material-ui';

Layout.NotFound = React.createClass({

  /* Render
  */

  render() {
    const { path, message='Não existe nada aqui!',
      icon='mood_bad', } = this.props;

    return (
      <div>
        <div className='ui center aligned basic segment'>
          <h1 className='ui icon header'>
            <FontIcon className='material-icons' style={{ fontSize: 50 }}>
              {icon}</FontIcon>
            <div className='content'>
              <div className='sub header'>{message}</div>
            </div>
          </h1>
          <div>
            <RaisedButton
              label='Voltar'
              primary={true}
              href={FlowRouter.path(path)}
            />
          </div>
        </div>
      </div>
    );
  },
});
