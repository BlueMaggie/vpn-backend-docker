const {queryClientsCountByUid,queryAllClientsByUid,createClient, updateClientById}=require('../db/ops/clients')
class clientsController{
    async commitNewClient(ctx,next){
        let {cid,...userInfo}=ctx.userInfo
        let count=await queryClientsCountByUid(userInfo.id)
        let max_clients_num=global.WEB_CONFIG.get('MAX_CLIENTS_NUM')
        if(count!=max_clients_num){   
            createClient(cid,userInfo.id)
        }else{//登陆设备数达到预设最大值    
            let res=await queryAllClientsByUid(userInfo.id)
            let time=(new Date(res[0].dataValues.cid)).getTime()
            let earliest_cid_id=res[0].dataValues.id
            for(let i=1;i<max_clients_num;i++){
                let tmp_time=(new Date(res[i].dataValues.cid)).getTime()
                if(tmp_time<time){
                    time=tmp_time
                    earliest_cid_id=res[i].dataValues.id
                }
            }
            //把最早登陆的cid换成生成的cid
            updateClientById({id:earliest_cid_id,cid})
        }
        await next()
    }
}

module.exports=new clientsController()