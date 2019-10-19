import React from 'react';

function YearTable(props) {
  console.log('YearTable', props);

  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.year}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function SortTable(props) {
  console.log('SortTable', props);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tr>
          <th>Month</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.month}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

let MonthWidthParse = widthParse(parseData, MonthTable);
let YearWidthParse = widthParse(parseData, YearTable);
let SordetDate = widthSort(sortData, SortTable)

function widthParse(parseFunction, Component) {
  return class extends React.Component {
    render() {
      let parsedProps = parseFunction(this.props)
      return <Component {...this.props} list={parsedProps} />
    }
  }
}

function widthSort(sortFunction, Component) {
  return class extends React.Component {
    render() {
      let sortedDate = sortFunction(this.props);
      return <Component {...this.props} list={sortedDate} />
    }
  }
}

function sortData(props) {
  let { list } = props;

  let sortedList = list.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return sortedList
}

function parseData(props) {
  let { list } = props;
  let data = [];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  list.forEach(el => {
    let dateObj = {
      year: new Date(Date.parse(el.date)).getFullYear(),
      month: monthNames[new Date(Date.parse(el.date)).getMonth()],
      date: el.date,
      amount: el.amount
    }

    data.push(dateObj)
  });

  return data
}

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json')
      .then(res => res.json())
      .then(data => {
        this.setState({ list: data.list })
      })
  }

  render() {
    const { list } = this.state;
    return (
      <div id="app">
        <MonthWidthParse list={list} />
        <YearWidthParse list={list} />
        <SordetDate list={list} />
      </div>
    );
  }
}