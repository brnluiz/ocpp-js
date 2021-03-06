const ChargingPoint = require('../entities/ChargingPoint');

var soapOptions = {
    fromHeader: 'http://localhost:9001',
    remoteActionPort: '9001'
}
var point = new ChargingPoint('http://localhost:9220', "3lsonASjk1", "ocpp1.5", 'soap', soapOptions);

var boot = setInterval(function() {

    // Station is ready
    point.bootNotification({
        chargePointVendor: 'Shneider Electric',
        chargePointModel: 'NQC-ACDC',
        chargePointSerialNumber: 'gir.vat.mx.000e48',
        chargeBoxSerialNumber: 'gir.vat.mx.000e48',
        firmwareVersion: '1.0.49',
        iccid: '1',
        imsi: '',
        meterType: 'DBT NQC-ACDC',
        meterSerialNumber: 'gir.vat.mx.000e48'
    });


    // Send Meter Values
    point.meterValues({
        transactionId: 0,
        values: [{
            "timestamp": "2013-03-07T16:52:16Z",
            "values": [{
                "value": "0",
                "unit": "Wh",
                "measurand": "Energy.Active.Import.Register"
            }, {
                "value": "0",
                "unit": "varh",
                "measurand": "Energy.Reactive.Import.Register"
            }]
        }, {
            "timestamp": "2013-03-07T19:52:16Z",
            "values": [{
                "value": "20",
                "unit": "Wh",
                "measurand": "Energy.Active.Import.Register"
            }, {
                "value": "20",
                "unit": "varh",
                "measurand": "Energy.Reactive.Import.Register"
            }]
        }]
    });

    point.sendStatusNotification({
        status: 'Available',
        errorCode: 'NoError',
        info: "",
        timestamp: "2013-02-01T15:09:18Z",
        vendorId: "",
        vendorErrorCode: ""
    });

    point.diagnosticsStatusNotification({
        status: 'Uploaded'
    });

    point.firmwareStatusNotification({
        status: 'DownloadFailed'
    });

    point.startTransaction({
        idTag: 'B4F62CEF',
        timestamp: '2013-02-01T15:09:18Z',
        meterStart: 0
    });

    point.stopTransaction({
        transactionId: 0,
        idTag: 'B4F62CEF',
        timestamp: "2013-02-01T15:09:18Z",
        meterStop: 20,
        transactionData: [{
            "values": [{
                "timestamp": "2013-03-07T16:52:16Z",
                "values": [{
                    "value": "0",
                    "unit": "Wh",
                    "measurand": "Energy.Active.Import.Register"
                }, {
                    "value": "0",
                    "unit": "varh",
                    "measurand": "Energy.Reactive.Import.Register"
                }]
            }]
        }, {
            "values": [{
                "timestamp": "2013-03-07T16:52:16Z",
                "values": [{
                    "value": "0",
                    "unit": "Wh",
                    "measurand": "Energy.Active.Import.Register"
                }, {
                    "value": "0",
                    "unit": "varh",
                    "measurand": "Energy.Reactive.Import.Register"
                }]
            }]
        }]
    });

    clearInterval(boot);
}, 3000);
