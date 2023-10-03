import child_process, { ChildProcess } from 'child_process';


export async function instagram(req, res) {
    const { username, options } = req.body;
    try {
        const instacmd = `python -m instaloader ${username} ${options}`;
        child_process.exec(instacmd, (error, stdout, stderr) => {
            if (error) {
                console.log('Error:', error.message);
                return (
                    res.status(500).json({
                        success: false,
                        message: error.message
                    })
                )
            }
            console.log('Command executed successfully.');
            const output = stdout.toString();
            console.log(output);
            res.status(200).json({
                success: true,
                message: output
            });
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Please enter a username'
        })
    }
}

export async function insta_email_phone(req, res) {
    const { username, yourSessionId } = req.body;
    const cmd = `toutatis -u ${username} -s ${yourSessionId}`;
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
        console.log('Command executed successfully.');
        const result = stdout.toString();
        res.status(200).json({
            success: true,
            result: result
        });
    })
}