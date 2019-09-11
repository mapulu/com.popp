'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P004001 extends ZwaveDevice {
	onMeshInit() {
		this.enableDebug();
		this.printNode();
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('alarm_smoke', 'BASIC', {
			report: 'BASIC_SET',
			reportParser: report => {
				if (report && report.hasOwnProperty('Value')) {
					return report.Value >= 1;
				}
				return null;
			}		
		});
		this.registerCapability('alarm_smoke', 'SENSOR_BINARY');
		this.registerCapability('alarm_smoke', 'NOTIFICATION');
		this.registerCapability('alarm_tamper', 'SENSOR_BINARY');
		this.registerCapability('alarm_battery', 'BATTERY');
		this.registerCapability('measure_battery', 'BATTERY');
	}
}
module.exports = P004001;
