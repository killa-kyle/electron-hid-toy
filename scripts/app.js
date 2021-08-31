
"use strict";

var React = require('react');
var ReactDOM = require('react-dom');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Grid = require('react-bootstrap').Grid;
var Table = require('react-bootstrap').Table;


var HID = require('node-hid');
const fs = require('fs-extra');


const volumes = fs.readdirSync("/Volumes")

var firebase = require("firebase/app")


  var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId:process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  


// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
const image_source = `/Volumes/${volumes[0]}`;
const image_destination = `/../disk-image/`
console.log(image_source)

var devices = HID.devices();

var App = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        
        var createDeviceRow = function(dev, index) {
            return (
                <tr key={index}>
                    <td>{dev.vendorId}</td>
                    <td>{dev.productId}</td>
                    <td>{dev.product}</td>
                    <td>{dev.manufacturer}</td>
                    <td>{dev.serialNumber}</td>
                    <td>{dev.path}</td>
                </tr>
            );
        };
               var handleClick = (e) => {
                   console.log("this is:", e)
               }
        var createVolumeRow = function(drive, index) {
            return (
                <li key={index} onClick={function(){
                    if (
                        window.confirm(
                            "Are you sure you want to copy: " +
                                drive
                        )
                    )
                        copyDirectory(
                            drive,
                            image_destination
                        )
                }}>
                    <div>
                        {index} - {drive}
                    </div>
                </li>
            )
        };
 

        var copyDirectory = async function(src, dest){
            console.log(this)
            console.log(`
            src: ${`/Volumes/${src}`}
            dest: ${dest +src}
            `)
            
            fs.copy('/Volumes/'+src, __dirname + dest +src)
            .then(()=> console.log('sucessfully copied from ' + src + ' to ' + dest))
            .catch(err => console.error(err))
        }
        

        return (
            <Grid>
                <h1> Electron HID Toy! </h1>
                <Row>
                    <Col xs={6}>
                        <ul>{volumes.map(createVolumeRow, this)}</ul>
                    </Col>
                </Row>
                {/* <Row>
                    <Col xs={12}>
                        <h4> HID Devices connected </h4>
                        <Table bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>VendorId</th>
                                    <th>ProductId</th>
                                    <th>Product</th>
                                    <th>Manufacturer</th>
                                    <th>SerialNumber</th>
                                    <th>Path</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map(createDeviceRow, this)}
                            </tbody>
                        </Table>
                    </Col>
                </Row> */}
            </Grid>
        )
    }
});

ReactDOM.render( <App />,  document.getElementById('example') );
