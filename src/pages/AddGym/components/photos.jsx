import React from 'react';
import Image from 'react';
import {Row, Col} from 'react-bootstrap';
import FileInput from 'react-file-input';
import './../add-gym.less';

var PhotosComponent = React.createClass({
    handleChange(event) {
      console.log('Selected file:', event.target.files[0]);
    },
	render() {
		return (
            <Row>
                <Col xs={12}>
        			<Row>
                        <FileInput name="myImage" accept=".png,.gif" placeholder="My Image" className="inputClass" onChange={this.handleChange} />
                    </Row>
                </Col>
            </Row>
		);
	}
});

export default PhotosComponent;
