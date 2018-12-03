import Vue from 'vue'

Vue.filter('replaceWH', (path, w, h)=>{
    return path.replace(/w.h/, `${w}.${h}`);
})

Vue.filter('solveComing',function(comingMap){
    comingMap.map(items=>{
        console.log(comingMap[items])
    })
})