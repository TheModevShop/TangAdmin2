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

  componentWillMount() {    
    var photos = _.get(this.props, 'data.photos', [])
    this.setState({images: photos});
  },

  componentWillReceiveProps(nextProps) {
    var nextPhotos = _.get(nextProps, 'data.photos', [])
    var photos = _.get(nextProps, 'data.photos', [])
    if (nextPhotos.length !== photos.length) {
      this.setState({images: nextPhotos});
    }
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
        this.setState({images: this.state.images.concat(images)});
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

  render() {
    console.log(this.props)
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Row>
                {
                  this.state.images && this.state.images.length > 0 ? 
                  this.state.images.map((file, i) =>
                    <Col xs={4} className="image-container">
                      <div>
                      <img key={i} src={file.url} />
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
        </Col>
      </Row>
    );
  }
});

export default PhotosComponent;