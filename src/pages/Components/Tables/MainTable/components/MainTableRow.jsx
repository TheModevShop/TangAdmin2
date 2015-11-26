import {setActiveGym} from 'actions/GymActions';
import {Link} from 'react-router';

const MainTableRow = React.createClass({

  viewGymProfile: function(id) {
    setActiveGym(id);
  },

  render: function() {
    const data = this.props.data;
    return (
       <Link to={`/gyms/SOMEID`} onClick={this.viewGymProfile.bind(this, 'SOMEID')}>
         <td>{data.name}</td>
         <td>System Architect</td>
         <td>Edinburgh</td>
         <td>61</td>
         <td>2011/04/25</td>
         <td>$320,800</td>
       </Link>
    );
  }
});



module.exports = MainTableRow;