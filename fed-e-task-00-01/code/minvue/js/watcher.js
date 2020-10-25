class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        // 把 wathcer 对象记录到Dep类的静态属性target
        Dep.target = this
        // 触发get方法，在get方法中会调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    // 当数据发生变化时候更新视图
    update() {
        let newValue = this.vm[this.key]
        console.log('this.oldValue',this.oldValue)
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }

}