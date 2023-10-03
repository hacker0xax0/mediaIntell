import mongoose from 'mongoose';


const portSchema = new mongoose.Schema({
    port: String,
    state: String,
    service: String
});
const resultSchema = new mongoose.Schema({
    result: {
        scanInfo: {
            startTime: String
        },
        scanReport: [
            {
                host: String,
                ports: [portSchema],
                macAddress: String,
                deviceType: String,
                runningOS: String,
                osCPE: String,
                osDetails: String,
                networkDistance: String,
                Done: String
            }
        ]
    }
}, { timestamps: true });


const Network_Scan = mongoose.model('Network_Scan', resultSchema);
export { Network_Scan }