//const {InQueue,OutQueue,length,SetQueue}=require('../../utils/clash/token_queue')
const { createToken, deleteTokenById, queryOneLinkToken, queryAllLinkTokens, updateTokenById, deleteTokensByIsExpired } = require('../../db/ops/link_token')
const UserOp=require('../../db/ops/user')
const axios = require('axios')
const { getLinkSuccess } = require('../../constant/success_type')
const { getClashLinkError } = require('../../constant/error_type')
const generateCfgFile = require('../../utils/clash/gen_clashcfgfile')
const generateRandomAccount = function (len) {
    var litters = "123456789abcdefghijklmnopqrstuvwxyzQEERTYUIOPASDFGHJKLZXCVBNM"
    var account = ""
    for (i = 0; i < len; i++) {
        account += litters[Math.floor(Math.random() * litters.length)]
    }
    account += "@qq.com"
    return account
}




class ClashController{
    async requestLink () {
        let account = generateRandomAccount(12)
        let data = {
            'email': account,
            'password': '021114zz',
            'invite_code': '',
            'email_code': ''
        }
        axios.post("https://www.dageyun1.com/api/v1/passport/auth/register", data)
            .then((res) => {
                if (res.data.data.token != null) {
                    createToken(res.data.data.token)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    
    }
    //定期清除过期的token
    async clearTokens () {
        let now = new Date()
        let link_exp_time = global.WEB_CONFIG.get('LINK_EXP_TIME');
        let tokens = await queryAllLinkTokens()
        if (tokens.length != 0) {
            for (let i = 0; i < tokens.length; i++) {
                if (Math.floor(now.getTime() / (1000 * 60)) - Math.floor(new Date(tokens[i].dataValues.createdAt).getTime() / (1000 * 60)) >= link_exp_time) {
                    await updateTokenById({ id: tokens[i].dataValues.id, isExpired: true })
                } else {
                    break;
                }
            }
            deleteTokensByIsExpired()
        }
    }
    async getClashLink(ctx, next) {
        let {id,activation}=ctx.userInfo
        let res = await queryOneLinkToken();
    
        if (res != null)//获取成功
        {
            ctx.body = getLinkSuccess
            ctx.body.result = {
                clashlink: (global.WEB_CONFIG.get('HTTPS_ON') ? 'https://' : 'http://') + global.WEB_CONFIG.get('DOMAIN') + '/api/v1/service/sub/' + res.content
            }
            deleteTokenById(res.id)
            UserOp.updateUserById({id,activation:activation+1})
        } else {
            ctx.body = getClashLinkError
            this.requestLink()
        }
        await next()
    }
    
    async getCfgFile(ctx, next) {
        var data
        await axios.get("https://www.dgydgy.com/api/v1/client/subscribe?token=" + ctx.params.token)
            .then((res) => {
                data = res.data
            })
            .catch((e) => {
                ctx.body = {
                    code: 0,
                    message: '失败'
                }
                return
            })
        var file = generateCfgFile(data)
        if (file != null) {
            ctx.body = file
            ctx.set('Content-disposition', 'attachment; filename= ikun.yaml')
        }
        await next()
    }
    
    async getVipLink(ctx, next) {
        let res = await queryOnelink_token();
    
        if (res != null)//获取成功
        {
            let clashlink = (global.WEB_CONFIG.get('HTTPS_ON') ? 'https://' : 'http://') + global.WEB_CONFIG.get('DOMAIN') + '/api/v1/sub/' + res.content
            ctx.state=302
            ctx.redirect(clashlink)
            deleteTokenById(res.id)
        } else {
            ctx.body = getClashLinkError
        }
        await next()
    }
}
module.exports = new ClashController()