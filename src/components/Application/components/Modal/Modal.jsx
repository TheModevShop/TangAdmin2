import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import "./modal.less";

class CustomModal extends React.Component {
	constructor(...args) {
	  super(...args);
	  this.state = {showModal: false};
	}
	close() {
		this.setState({ showModal: false });
	}
	open(action, items, fn) {
		this.setState({ 'showModal': true, 'action': action, 'items': items, 'fn': fn });
	}
	render() {
		const props = this.props;
		return (
			<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
				<Modal.Header>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Are you sure you want to {this.state.action} {this.state.items} {this.state.items > 1 ? 'items' : 'item'}? This action cannot be undone.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.state.fn}>Submit</Button>
					<Button onClick={this.close.bind(this)} className="cancel-btn">Cancel</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

 export default CustomModal;
