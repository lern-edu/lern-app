import React from 'react';
import { List, Paper, ListItem, Divider } from 'material-ui';
import Chart from 'chart.js';

// Static data

const tags = {
  Informações: '/images/home/icons/ic_info.png',
  Persuasão: '/images/home/icons/ic_language.png',
  Eficiência: '/images/home/icons/ic_standard_rate.png',
  Planejamento: '/images/home/icons/ic_plan.png',
  'Intenção de empreender': '/images/home/icons/ic_sole_propietorship.png',
  Oportunidade: '/images/home/icons/ic_check_for_virus.png',
  Metas: '/images/home/icons/ic_action_items_list_checkmark.png',
  Controle: '/images/home/icons/ic_legal_issues_comment.png',
  Persistência: '/images/home/icons/ic_physical_education.png',
  'Rede de relações': '/images/home/icons/ic_public_chat.png',
};

const average = [9.00, 8.40, 9.10, 8.20, 8.90, 8.10, 8.50, 8.30, 8.90, 8.60];

export default class PublicHomeChart extends React.Component {

  // Lifecycle

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    const node = new Chart(this.refs.chart, {
      type: 'radar',
      data: {
        labels: _.keys(tags),
        datasets: [
          {
            label: 'Empreendedor de sucesso',
            backgroundColor: 'rgba(33,150,243,0.2)',
            borderColor: 'rgba(33,150,243,1)',
            pointBackgroundColor: 'rgba(33,150,243,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(33,150,243,1)',
            data: average,
          },
        ],
      },
      options: {
        legend: {
          display: true,
          onClick: null,
        },
        scale: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Handlers

  handleChange({ target: { value }, currentTarget }, id) {
    const { parent } = this.props;
    parent.setState({
      [currentTarget.getAttribute('data-key')]: value,
      valid: Match.Regex(value).mail(),
    });
  }

  // Styles

  render() {
    return (
      <Paper className='ui padded grid fluid'>
        <div className='row'>
          <div className='yellow column' >
            <div className='ui equal width padded grid fluid'>
              <div className='row' style={{ padding: 0 }}>
                <div className='sixteen wide mobile eight wide tablet ten wide computer column' >
                  <div className='ui basic segment' >
                    <h4 className='ui header'>
                      Conheça melhor suas competências empreendedoras ou de quem você instrui
                      e educa!
                    </h4>
                    <div className='ui grid' style={{ marginTop: 15 }}>
                      <Paper className='tablet only computer only sixteen wide column' >
                        <List>
                          {
                            _.map(tags, (img, tag) => [
                                <ListItem
                                  key={`${tag}.list`}
                                  disabled={true}
                                  primaryText={tag}
                                  leftAvatar={<img src={img} />}
                                />,
                                <Divider inset={true} key={`${tag}.divider`} />,
                              ],
                            )
                          }
                        </List>
                      </Paper>
                    </div>
                  </div>
                </div>
                <div className='sixteen wide mobile eight wide tablet six wide computer column' >
                  <div className='ui center aligned basic segment' >
                    <canvas ref='chart' width={300} height={300} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Paper>
    );
  }
};
