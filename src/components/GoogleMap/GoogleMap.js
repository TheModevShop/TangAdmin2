import {default as React, Component} from "react";
import {GoogleMap, Marker} from "react-google-maps";

export default function Map (props) {
  return (
    <section style={{height: "100%"}}>
      <GoogleMap containerProps={{
          style: {
            height: "100%",
          },
        }}
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
        onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) => {
          return (
            <Marker
              {...marker}
              onRightclick={() => props.onMarkerRightclick(index)} />
          );
        })}
      </GoogleMap>
    </section>
  );
}