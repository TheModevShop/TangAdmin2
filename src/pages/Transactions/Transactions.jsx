import {branch} from 'baobab-react/higher-order';


class Transactions extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }
  render() {
    return (
        <div></div>
    );
  }
}
export default branch(Transactions, {
  cursors: {
    transactions: ['transactions']
  }
});
