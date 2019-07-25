'use strict';

const Homey = require('homey');

class P005206Driver extends Homey.Driver {
    onInit() {
        super.onInit();
		this.dewPointTrigger = new Homey.FlowCardTriggerDevice('dewpoint_value').register();
    }
}

module.exports = P005206Driver;