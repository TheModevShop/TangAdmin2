import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import BluebirdPromise from 'bluebird';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import {addPhotos} from 'actions/AddGymActions';
import './../add-gym.less';

const PhotosComponent = React.createClass({
  getInitialState() {
    return {
      images: []
    };
  },

  onDrop(files) {
    const imgs = this.state.images;
    for (var file in files) {
      imgs.push(files[file]);
    }

    this.setState({
      images: imgs
    });
  },

  onDelete(files) {

  },

  onSubmit() {
    const images = []
    const images = _.map(this.state.images, (image) => {
      images.push(imagePrcessor(image));
    });
    BluebirdPromise.all(images).then(function(allPhotoBlobs) {
      addPhotos(_.map(allPhotoBlobs, (photo) => {
        return {
          photo: photo
        }
      }), this.props.gymId);
    }).catch(function() {
      alert('error occured, try again')
    })
  },

  imagePrcessor(file) {
    return new BluebirdPromise((resolve, reject) => {
        const reader  = new FileReader();
        reader.addEventListener('load', function () {
          resolve(reader.result);
        }, false);
        reader.addEventListener('error', function () {
          reject();
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        } else {
          reject()
        }
    });
  },

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Row>
                {
                  this.state.images.length > 0 ? 
                  this.state.images.map((file) =>
                    <Col xs={4} className="image-container">
                      <div>
                      <img key={file.lastModified} src={file.preview} /> 
                    </div>
                  </Col>
                  ) : null
                }
                <Col className="dropzone-container" xs={4}>
                  <Dropzone className="dropzone" ref="dropzone" onDrop={this.onDrop}>
                    <span>+</span>
                    <p>Upload Photos</p>
                  </Dropzone>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button type="button" onClick={this.onSubmit}>
                Update
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
});

export default PhotosComponent;