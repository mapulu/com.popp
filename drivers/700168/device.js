'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P700168 extends ZwaveDevice {
onMeshInit() {
  	    //this.enableDebug();
		//this.printNode();
		this._rainOnTrigger = this.getDriver().rainOnTrigger;
		this._rainOffTrigger = this.getDriver().rainOffTrigger;
		this._heavyRainAlarmOnTrigger = this.getDriver().heavyRainAlarmOnTrigger;
		this._heavyRainAlarmOffTrigger = this.getDriver().heavyRainAlarmOffTrigger;
    this.registerCapability('is_rain', 'BASIC', {
	get: 'BASIC_GET',
	report: 'BASIC_SET',
	reportParser: report => {
		if (report && report.hasOwnProperty('Value') && this.getSetting('rain_start_command') === report['Value'])
		{
		this._rainOnTrigger.trigger(this, null, null);
		return true;
		}
		else if (report && report.hasOwnProperty('Value') && this.getSetting('rain_stop_command') === report['Value'])
		{ 
		if(args.device.getCapabilityValue('alarm_heavyrain') === true)
		{
		this._heavyRainAlarmOffTrigger.trigger(this, null, null);
		this.setCapabilityValue('alarm_heavyrain', false).catch(this.error);
		}
		this._rainOffTrigger.trigger(this, null, null);
		return false;
		}
		return null;
	},
	});
    this.registerCapability('alarm_heavyrain', 'BASIC', {
	get: 'BASIC_GET',
	report: 'BASIC_SET',
	reportParser: report => {
		if (report && report.hasOwnProperty('Value') && this.getSetting('heavy_rain_start_command') === report['Value'])
		{
		this._heavyRainAlarmOnTrigger.trigger(this, null, null);
		if(args.device.getCapabilityValue('measure_rain.is_rain') === false)
		{
		this._rainOnTrigger.trigger(this, null, null);
		this.setCapabilityValue('is_rain', true).catch(this.error);
		}
		return true;
		}
		else if (report && report.hasOwnProperty('Value') && this.getSetting('heavy_rain_stop_command') === report['Value'])
		{ 
		this._heavyRainAlarmOffTrigger.trigger(this, null, null);
		return false;
		}
		return null;
	},
	});
    this.registerCapability('meter_rain', 'METER', {
        get: 'METER_REPORT',
        getParser: () => ({
          Properties1: {
            Scale: 0,
            'Rate Type:': 'Import'
          },
        }),
        report: 'METER_REPORT',
        reportParser: report => {
          if (report &&
			report.hasOwnProperty('Properties1') &&
			report.Properties1.hasOwnProperty('Meter Type') &&
			report.Properties1['Meter Type'] === 'Water meter' &&
			report.Properties1.hasOwnProperty('Scale bit 2') &&
			report.Properties1['Scale bit 2'] === false &&
			report.hasOwnProperty('Properties2') &&
			report.Properties2.hasOwnProperty('Scale bits 10') &&
			report.Properties2['Scale bits 10'] === 0) {
           return report['Meter Value (Parsed)'];
          }
          return null;
        }
      },
	);
	    this.registerCapability('measure_rain.total', 'SENSOR_MULTILEVEL', {
        get: 'SENSOR_MULTILEVEL_REPORT',
        getParser: () => ({
          'Sensor Type': 'Rain rate (version 2)',
          Properties1: {
            Scale: 0,
            'Rate Type:': 'Import'
          },
        }),
        report: 'SENSOR_MULTILEVEL_REPORT',
        reportParser: report => {
		if (report && report.hasOwnProperty('Sensor Type') && report.hasOwnProperty('Sensor Value (Parsed)') && report['Sensor Type'] === 'General purpose value (version 1)') {
           return report['Sensor Value (Parsed)'];
          }
          return null;
        },
      });
	
    this.registerCapability('measure_rain', 'SENSOR_MULTILEVEL', {
        get: 'SENSOR_MULTILEVEL_REPORT',
        getParser: () => ({
          'Sensor Type': 'Rain rate (version 2)',
          Properties1: {
            Scale: 0,
            'Rate Type:': 'Import'
          },
        }),
        report: 'SENSOR_MULTILEVEL_REPORT',
        reportParser: report => {
          if (report && report.hasOwnProperty('Sensor Type') && report.hasOwnProperty('Sensor Value (Parsed)') && report['Sensor Value (Parsed)'] != "14" && (report['Sensor Type'] === 'Rain rate (version 2)' || report['Sensor Type'] === 'Rain rate (version 2) ')) {
           return report['Sensor Value (Parsed)'];
          }
          return null;
        },
      });
    this.registerCapability('measure_battery', 'BATTERY');
    this.registerCapability('alarm_battery', 'BATTERY');
	


let heavyRainAlarmCondition = new Homey.FlowCardCondition("is_heavyrain_alarm");
heavyRainAlarmCondition.register().registerRunListener(( args, state ) => {
    let heavyRainAlarm = args.device.getCapabilityValue('alarm_heavyrain');
    return Promise.resolve( heavyRainAlarm );

});
let rainCondition = new Homey.FlowCardCondition("is_raining");
rainCondition.register().registerRunListener(( args, state ) => {
    let rain = args.device.getCapabilityValue('measure_rain.is_rain');
    return Promise.resolve( rain );

})
	
	
    }
  }
  module.exports = P700168;