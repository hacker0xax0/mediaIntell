import { spawn } from 'child_process';
import child_process from 'child_process';
import path from 'path';
import { stderr } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function usr_hunt(req, res) {
    const { username } = req.body;
    try {
        const sherlockPath = path.join(__dirname, 'cd ../../../../../../../../../Windows/System32/sherlock/sherlock');

        const sherlockProcess = spawn('python', [sherlockPath, username]);

        let result = '';
        sherlockProcess.stdout.on('data', (data) => {
            result += data.toString();
        });
        sherlockProcess.stderr.on('data', (data) => {
            console.error('Error:', data.toString());
        });
        sherlockProcess.on('close', (code) => {
            console.log('Sherlock process exited with code', code);
            // You can modify the result as needed before sending it back to the client
            res.json({ result });
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Please enter a username'
        });
    }
}

export async function allAtOnce(req, res) {
    const { firstName, lastName } = req.body;
    const cmd = `python -m profiler.py -n ${firstName} -ln ${lastName} -json ${firstName}`;
    child_process.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log('Error:', error.message);
            return (
                res.status(500).json({
                    success: false,
                    message: error.message
                })
            )
        }
        console.log('command executed successfully.');
        const result = stdout.toString();
        res.status(200).json({
            success: true,
            result: result
        });
    });
}