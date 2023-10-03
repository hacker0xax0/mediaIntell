import child_process from 'child_process';
import { Network_Scan } from '../model/nmap_model.js';

export async function mapping(req, res) {
    const { target, options } = req.body;
    try {
        if (!target) {
            res.status(400).json({
                success: false,
                message: 'Target is required'
            });
            return;
        }

        const map_cmd = `nmap ${options || ''} ${target}`;
        child_process.exec(map_cmd, (err, stdout, stderr) => {
            if (err) {
                console.log(`Error: ${err.message}`);
                res.status(500).json({
                    success: false,
                    message: 'An error occurred while running the command',
                    error: err.message
                });
                return;
            }

            const parsedResult = parseNmapOutput(stdout);
            const savedResult = new Network_Scan({parsedResult});
            savedResult.save();
            console.log(parsedResult);
            res.status(200).json({
                success: true,
                result: parsedResult
            });
            console.log('log:',stdout);
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


function parseNmapOutput(output) {
    const lines = output.split('\r\n');
    const result = {
        scanInfo: {},
        scanReport: []
    };
    let currentHost = null;

    lines.forEach((line) => {
        if (line.startsWith("Starting Nmap")) {
            result.scanInfo.startTime = line.split(" at ")[1];
        } else if (line.startsWith("Nmap scan report for")) {
            if (currentHost) {
                result.scanReport.push(currentHost);
            }
            currentHost = { host: line.split("Nmap scan report for ")[1], ports: [] };
        } else if (line.includes("/tcp") || line.includes("/udp")) {
            const [port, state, service, version] = line.trim().split(/\s+/);
            currentHost.ports.push({ port, state, service, version });
        } else if (line.startsWith("MAC Address:")) {
            currentHost.macAddress = line.split("MAC Address: ")[1];
        } else if (line.startsWith("Service Info:")) {
            currentHost.serviceInfo = line.split("Service Info: ")[1];
        } else if (line.startsWith("Host:")) {
            currentHost.host = line.split("Host: ")[1];
        } else if (line.startsWith("Nmap done:")) {
            currentHost.Done = line.split("Nmap done: ")[1];
        } else if (line.startsWith("SF:")) {
            currentHost.sf = line.split("SF: ")[1];
        } else if (line.startsWith("Device type:")) {
            currentHost.deviceType = line.split("Device type: ")[1];
        } else if (line.startsWith("Running:")) {
            currentHost.runningOS = line.split("Running: ")[1];
        } else if (line.startsWith("OS CPE:")) {
            currentHost.osCPE = line.split("OS CPE: ")[1];
        } else if (line.startsWith("OS details:")) {
            currentHost.osDetails = line.split("OS details: ")[1];
        } else if (line.startsWith("Network Distance:")) {
            currentHost.networkDistance = line.split("Network Distance: ")[1];
        }
    });

    if (currentHost) {
        result.scanReport.push(currentHost);
    }

    return result;
}
