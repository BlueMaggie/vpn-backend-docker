
//依赖于根目录下的web_config
const fs =require('fs')

class GlobalCfg{
    constructor(){
        this.config=JSON.parse(String(fs.readFileSync(__dirname+'/../../web_config.json')))
        global.WEB_CONFIG=this
        console.log("全局配置已开启")
    }
    get(key)
    {
        return this.config[key]
    }
    set(key,value)
    {
        this.config[key]=value
        var jsonstr=JSON.stringify(this.config)
        fs.writeFileSync(__dirname+'/../../web_config.json',jsonstr)      
    }

}

module.exports=new GlobalCfg()