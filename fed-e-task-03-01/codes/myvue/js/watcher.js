class Watcher {
    constructor(vm,key,cb){
      this.vm = vm
      // data中的属性名称
      this.key = key
      // 回调函数负责更新数值
      this.cb = cb
  
      // 把watcher对象记录到Dep类的target属性中
      Dep.target = this
      // 触发get方法，则会调用addSubs
      this.oldVal = vm[key]
      Dep.target = null
    }
  
    // 当数据发生变化时，更新视图
    update(){
      let newVal = this.vm[this.key]
      if(newVal === this.oldVal) return
      this.cb(newVal)
    }
  
  }