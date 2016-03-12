import React from 'react';
import * as actions from 'actions/TablePaginationActions';
import './table-pagination.less'

const TablePagination = React.createClass({
  render() {
    return (
      <div className="table-pagination">
        {
          this.props.page !== 0 ?
          <div onClick={this.prev} className="prev primary-link">Previous</div> : null
        }
        {
          !this.props.depleted ?
          <div onClick={this.next} className="next primary-link">Next</div> : null
        }
      </div>
    );
  },

  prev() {
    actions.prev(this.props.path);
  },

  next() {
   actions.next(this.props.path); 
  }

});
      

export default TablePagination