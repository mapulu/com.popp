'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P700793 extends ZwaveDevice {
	onMeshInit() {
		this.enableDebug();
		this.printNode();
		this.registerCapability('onoff', 'SWITCH_BINARY');
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}
module.exports = P700793;
