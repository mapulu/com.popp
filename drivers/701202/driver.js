'use strict';

const Homey = require('homey');

class P701202Driver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.moldAlarmOnTrigger = new Homey.FlowCardTriggerDevice('mold_alarm_on').register();
        this.moldAlarmOffTrigger = new Homey.FlowCardTriggerDevice('mold_alarm_off').register();
		this.dewPointTrigger = new Homey.FlowCardTriggerDevice('dewpoint_value').register();
    }
}

module.exports = P701202Driver;