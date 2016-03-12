import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import BluebirdPromise from 'bluebird';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import {addPhotos, defaultPhoto, deletePhoto} from 'actions/AddGymActions';
import './../add-gym.less';

const PhotosComponent = React.createClass({
  getInitialState() {
    return {
      images: []
    };
  },

  componentWillMount() {    
    var photos = _.get(this.props, 'data.photos', [])
    this.setState({images: photos});
  },

  componentWillReceiveProps(nextProps) {
    var nextPhotos = _.get(nextProps, 'data.photos', [])
    var photos = _.get(nextProps, 'data.photos', [])
    this.setState({images: nextPhotos});
  },

  onDrop(files) {
    const imgs = [];
    for (var file in files) {
      imgs.push(files[file]);
    }
    this.convertAndUploadImages(imgs);
  },


  convertAndUploadImages(imagesToConvert) {
    const gymId = this.props.gymId;
    const images = _.map(imagesToConvert, (image) => {
      return this.imagePrcessor(image);
    });
    BluebirdPromise.all(images).then((allPhotoBlobs) => {
      const allPhotos = _.map(allPhotoBlobs, (photo) => {
        return {
          photo: photo
        }
      });
      addPhotos(allPhotos, gymId).then((images) => {
        this.setState({images: images});
      });
    }).catch(() => {
      alert('error occured, try again')
    })
  },

  imagePrcessor(file) {
    return new BluebirdPromise((resolve, reject) => {
        const reader  = new FileReader();
        reader.addEventListener('load', () => {
          resolve(reader.result);
        }.bind(this), false);
        reader.addEventListener('error', () => {
          reject();
        }.bind(this), false);

        if (file) {
          reader.readAsDataURL(file);
        } else {
          reject()
        }
    });
  },

  async deletePhoto(url) {
    const photos = await deletePhoto(url, this.props.gymId);
    if (photos) {
      this.setState({images: photos});
    }
  },

  async defaultPhoto(url) {
    const photos = await defaultPhoto(url, this.props.gymId);
    if (photos) {
      this.setState({images: photos});
    }
  },

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Row>
                {
                  this.state.images && this.state.images.length > 0 ? 
                  this.state.images.map((file, i) =>
                  <Col key={i} xs={4} className="image-container">
                    <div className="image" style={{ backgroundImage: `url(${file.url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></div>
                    <div className="actions">
                      {
                        file.default ?
                        <div className="make-default primary-link inactive">Is Default</div> :
                        <div className="make-default primary-link" onClick={this.defaultPhoto.bind(null, file._id)}>Make Default</div>
                      }
                      <div className="delete primary-link" onClick={this.deletePhoto.bind(null, file._id)}>Delete</div>
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
        </Col>
      </Row>
    );
  }
});

export default PhotosComponent;