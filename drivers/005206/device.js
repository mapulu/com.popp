'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P005206 extends ZwaveDevice {
  onMeshInit() {
	  	//this.enableDebug();
		//this.printNode();
        this.registerCapability('measure_wind_strength', 'SENSOR_MULTILEVEL', {
                get: 'SENSOR_MULTILEVEL_GET',
                getParser: () => ({
                  'Sensor Type': 'Velocity (version 2)',
                  Properties1: {
                    Scale: 0,
                  },
                }),
                report: 'SENSOR_MULTILEVEL_REPORT',
                reportParser: report => {
                  if (report && report.hasOwnProperty('Sensor Type') && report.hasOwnProperty('Sensor Value (Parsed)') && report['Sensor Type'] === 'Velocity (version 2)' || report['Sensor Type'] === 'Velocity (version 2) ') {
                    return report['Sensor Value (Parsed)']*3.6; //from m/s to km/h
                  }
                  return null;
                }
              });
			
			
      this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
      this.registerCapability('measure_luminance', 'SENSOR_MULTILEVEL');
      this.registerCapability('measure_humidity', 'SENSOR_MULTILEVEL');
      this.registerCapability('measure_pressure', 'SENSOR_MULTILEVEL', {
              get: 'SENSOR_MULTILEVEL_GET',
              getParser: () => ({
                'Sensor Type': 'Barometric pressure (version 2)',
                Properties1: {
                  Scale: 0,
                },
              }),
              report: 'SENSOR_MULTILEVEL_REPORT',
              reportParser: report => {
                if (report && report.hasOwnProperty('Sensor Type') && report.hasOwnProperty('Sensor Value (Parsed)')) {
                  if (report['Sensor Type'] === 'Barometric pressure (version 2)' || report['Sensor Type'] === 'Barometric pressure (version 2) ') return report['Sensor Value (Parsed)']*10;
                }
                return null;
              }
            });
      this.registerCapability('measure_dewpoint', 'SENSOR_MULTILEVEL', {
                get: 'SENSOR_MULTILEVEL_GET',
                getParser: () => ({
                  'Sensor Type': 'Dew point (version 2)',
                  Properties1: {
                    Scale: 0,
                  },
                }),
                report: 'SENSOR_MULTILEVEL_REPORT',
                reportParser: report => {
                  if (report && report.hasOwnProperty('Sensor Type') && report.hasOwnProperty('Sensor Value (Parsed)')) {
                    if (report['Sensor Type'] === 'Dew point (version 2)' || report['Sensor Type'] === 'Dew point (version 2) ') return report['Sensor Value (Parsed)'];
                  }
                  return null;
                }
              });
      this.registerCapability('measure_battery', 'BATTERY');
  }
}
module.exports = P005206;
