import React from 'react';
import {GoogleMap, Marker} from "react-google-maps";
import {triggerEvent} from "react-google-maps/lib/utils";
import _ from 'lodash';


class GoogleMapComp extends React.Component {
  render() {
    const style = {
      height: '200px', 
      width: '100%'
    };
    const marker = {
      position: this.props.marker,
      key: 'Location Name',
      defaultAnimation: 2
    }
    const center = this.props.marker ? this.props.marker : {lat: 32.715786, lng: -117.158340};
    return (
      <section style={{style}}>
        <GoogleMap containerProps={{style}}
          ref={(map) => (this._googleMapComponent = map) && setTimeout(() => {
            map.panTo(center);
          }, 100)}
          defaultZoom={3}
          zoom={this.props.marker ? 15 : 3}
          defaultCenter={{lat: 32.715786, lng: -117.158340}}>
            <Marker{...marker} />
        </GoogleMap>
      </section>
    );
  } 
};

export default GoogleMapComp;


// class GoogleMapComp extends React.Component {
//   render() {
//     const style = {
//       height: '100%', 
//       width: '100%'
//     };
//     const marker = {
//       position: this.props.marker,
//       key: 'Location Name',
//       defaultAnimation: 2
//     };
//     const center = this.props.marker ? this.props.marker : {lat: 32.715786, lng: -117.158340};
//     return (
//       <GoogleMapLoader
//         containerElement={
//           <section
//             style={{ height: '200px', 
//       width: '100%'}}
//           />
//         }
//         googleMapElement={
//           <GoogleMap style={{height: '200px', 
//       width: '100%'}}
//             ref={(map) => (this._googleMapComponent = map) && setTimeout(() => {
//                   map.panTo({lat: 32.715786, lng: -117.158340});
//                 }, 100)}
//             defaultZoom={15}
//             defaultCenter={{lat: 32.715786, lng: -117.158340}}>
//             <Marker {...marker}/>
//           </GoogleMap>
//         }
//       />
//     );
//   } 
// };