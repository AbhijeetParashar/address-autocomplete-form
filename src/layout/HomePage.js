import React, { Component } from 'react';
import TopBar from '../core/TopBar';
import location from '../images/location_icon.png';
import building from '../images/building-icon.png';
import Script from 'react-load-script';
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.fillInAddress = this.fillInAddress.bind(this);
    this.geolocate = this.geolocate.bind(this);
  }
  componentWillMount() {
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }

  handleScriptLoad = () => {
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      { types: ['geocode'] }
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }
  fillInAddress() {
    var placeSearch, autocomplete;
    var componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
    var place = this.autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }
  geolocate() {
    let me = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        me.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  render() {
    const YOUR_KEY_HERE = ``
    return (
      <div className="home-page">
        <TopBar
          title={"Address Form"}
        />
        <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
        <Script
          url={"https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE&libraries=places&callback=initAutocomplete"}
          onLoad={this.handleScriptLoad}
        />
        <div className="text-field">
          <img className="icon" src={location} alt="Search" />
          <input className="auto-complete-search" onFocus={this.geolocate} type="text" id="autocomplete" placeholder="Enter your address" onChange={(e) => {
            this.setState({ searchText: e.target.value })
          }}>
          </input>
          <img className="delete-icon" src={building} alt="clear" onClick={() => {
            this.setState({ searchText: "" })
          }} />
          <table id="address">
            <tr>
              <td class="label">Street address</td>
              <td class="slimField"><input class="field" id="street_number"
                disabled="true"></input></td>
              <td class="wideField" colspan="2"><input class="field" id="route"
                disabled="true"></input></td>
            </tr>
            <tr>
              <td class="label">City</td>

              <td class="wideField" colspan="3"><input class="field" id="locality"
                disabled="true"></input></td>
            </tr>
            <tr>
              <td class="label">State</td>
              <td class="slimField"><input class="field"
                id="administrative_area_level_1" disabled="true"></input></td>
            </tr>
            <tr>
              <td class="label">Zip code</td>
              <td class="wideField"><input class="field" id="postal_code"
                disabled="true"></input></td>
            </tr>
            <tr>
              <td class="label">Country</td>
              <td class="wideField" colspan="3"><input class="field"
                id="country" disabled="true"></input></td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default HomePage;


