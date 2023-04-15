const nodemailer =require( 'nodemailer')

const sendVerificationAsync= async function(send_auth,recevier,verification)
{
    let transporter = nodemailer.createTransport({
        service: send_auth.service,  //  邮箱
        secure: false,    //  安全的发送模式
        auth:{
            user: send_auth.user, //  发件人邮箱
            pass: send_auth.pass //  授权码'mvvxkbqvojyocbac'
        }
    });
    transporter.sendMail(
        {
            // 发件人邮箱
            from: 'ikun的小站👻<'+send_auth.user+'>',
            // 目标邮箱
            to: recevier,
            // 邮件内容
            html:"<h1>您的验证码是  "+verification+"  请在5分钟之内使用</h1>"
            ,
            subject:'验证码'
        },
        (err, data) => {
            if (err!=null) {
                console.error(err);
            }
        }
    )

}

module.exports=sendVerificationAsync