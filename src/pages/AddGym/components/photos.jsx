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
    const imgs = [];
    for (var file in files) {
      imgs.push(files[file]);
    }
    this.convertAndUploadImages(imgs);
  },

  onDelete(files) {

  },

  onSubmit() {
    
  },

  convertAndUploadImages(imagesToConvert) {
    const gymId = this.props.gymId;
    const images = _.map(imagesToConvert, (image) => {
      return this.imagePrcessor(image);
    });
    BluebirdPromise.all(images).then(function(allPhotoBlobs) {
      const allPhotos = _.map(allPhotoBlobs, (photo) => {
        return {
          photo: photo
        }
      });
      addPhotos(allPhotos, gymId).then(function(images) {
        this.setState({images: images});
      });
    }).catch(function() {
      alert('error occured, try again')
    })
  },

  imagePrcessor(file) {
    return new BluebirdPromise((resolve, reject) => {
        const reader  = new FileReader();
        reader.addEventListener('load', function () {
          resolve(reader.result);
        }.bind(this), false);
        reader.addEventListener('error', function () {
          reject();
        }.bind(this), false);

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
                      <div className="actions">
                        <div className="make-default">Make Default</div>
                        <div className="delete">Delete</div>
                      </div>
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