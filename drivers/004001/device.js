'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P004001 extends ZwaveDevice {
	onMeshInit() {
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('alarm_smoke', 'BASIC', {
			report: 'BASIC_SET',
			reportParser: report => {
				if (report && report.hasOwnProperty('Value') && report.Value == this.getSetting('3')) {
					return true;
				}
				if (report && report.hasOwnProperty('Value') && report.Value == this.getSetting('4')) {
					return false;
				}
				return null;
			}		
		});
		this.registerCapability('alarm_smoke', 'SENSOR_BINARY');
		this.registerCapability('alarm_tamper', 'SENSOR_BINARY');
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');
	}
}
module.exports = P004001;
