import child_process from 'child_process';


export async function emailInUse(req, res) {
    const { email } = req.body;
    try {
        const cmd = `holehe ${email}`;
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
            const output = stdout.toString();
            console.log(output);
            res.status(200).json({
                success: true,
                message: output
            });
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid email, please enter a valid mail id <example@test.com>'
        });
    }
}