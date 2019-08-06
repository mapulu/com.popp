'use strict';

const Homey = require('homey');

class P700397Device extends Homey.Driver {
    onInit() {
        super.onInit();

        this.resetMeter = new Homey.FlowCardAction('P700397_reset_meter').register().registerRunListener((args, state) => {
            return args.device.resetMeterRunListener(args, state);
        });
    }
}

module.exports = P700397Device;