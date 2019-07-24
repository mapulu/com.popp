'use strict';

const Homey = require('homey');

class P700168Driver extends Homey.Driver {
    onInit() {
        super.onInit();

        this.rainOnTrigger = new Homey.FlowCardTriggerDevice('rain_on').register();
        this.rainOffTrigger = new Homey.FlowCardTriggerDevice('rain_off').register();
        this.heavyRainAlarmOnTrigger = new Homey.FlowCardTriggerDevice('heavyrain_alarm_on').register();
        this.heavyRainAlarmOffTrigger = new Homey.FlowCardTriggerDevice('heavyrain_alarm_off').register();
    }
}

module.exports = P700168Driver;