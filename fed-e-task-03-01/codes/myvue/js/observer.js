class Observer {

    constructor(data){
      this.walk(data)
    }
  
    walk(data){
      // 判断data是否是对象
      if(!data || typeof data !== 'object') return
      Object.keys(data).forEach(key => {
        this.defineReactive(data,key,data[key])
      })
    }
  
    defineReactive(obj,key,val){
      const that = this
      // 收集依赖
      let dep = new Dep()
      // 如果val为对象，递归调用，转为响应式数据
      this.walk(val)
      Object.defineProperty(obj,key,{
        configurable: true,
        enumerable: true,
        get(){
          // 收集依赖
          Dep.target && dep.addSubs(Dep.target)
          return val
        },
        set(newVal){
          if(newVal === val) return
          val = newVal
  
          // 如果新赋值的值为对象类型，则转换
          that.walk(newVal)
          // 值改变就触发通知
          dep.notify()
        }
  
      })
    }
  }
  