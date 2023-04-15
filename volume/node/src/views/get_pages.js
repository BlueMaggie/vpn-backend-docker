const fs=require('fs')

var pages={
    'index':fs.readFileSync(__dirname+'/index.html'),
    'admin':fs.readFileSync(__dirname+'/admin.html')
}
const getPage = function(name){
    if(pages[name]==undefined){
        return 'page not found'
    }else{
        return pages[name]
    }
}

module.exports = getPage