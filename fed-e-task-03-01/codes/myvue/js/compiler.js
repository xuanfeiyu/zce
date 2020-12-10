class compiler {
    constructor(vm){
      this.el = vm.$el
      this.vm = vm
      this.compile(this.el)
    }
    // 编译模版，处理文本节点和元素节点
    compile(el){
      let childNodes = el.childNodes
      Array.from(childNodes).forEach(node => {
        // 判断是否文本节点
        if(this.isTextNode(node)){
          this.compileText(node)
        }
  
        // 判断是否元素节点
        if(this.isElementNode(node)){
          this.compileElement(node)
        }
  
        if(node.childNodes && node.childNodes.length){
          this.compile(node)
        }
      })
    }
  
    // 编译元素节点，处理指令
    compileElement(node){
      // 遍历所有的属性节点
      Array.from(node.attributes).forEach(attr => {
        // 判断是否是指令
        let attrName = attr.name
        if(this.isDirective(attrName)) {
          let reg = /(v-on:|@)(\w+)/
          let key = attr.value
          if(reg.test(attrName)) {
             this.onUpdater(node,this.vm.$options.methods[key],RegExp.$2)
          } else {
            attrName = attrName.substr(2)
            this.update(node,key,attrName)
          }
        }
      })
    }
  
    update(node,key,attrName){
      let updateFn = this[attrName + 'Updater']
      updateFn && updateFn.call(this, node, this.vm[key], key)
    }
  
    onUpdater(node,value,key){
      node.addEventListener(key, value)
    }
  
    htmlUpdater(node,value,key){
      node.innerHTML = value
      new Watcher(this.vm, key, (newVal) => {
        node.innerHTML = newVal
      })
    }
  
    textUpdater(node,value,key){
      node.textContent = value
      new Watcher(this.vm,key,(newVal) => {
        node.textContent = newVal
      })
    }
  
    modelUpdater(node,value,key){
      node.value = value
      new Watcher(this.vm, key, (newVal) => {
        node.value = newVal
      })
      node.addEventListener('input', () => {
        this.vm[key] = node.value
      })
    }
  
    // 编译文本节点，处理差值表达式
    compileText (node){
      // console.dir(node)
      // 通过正则来匹配插值表达式
      let reg = /\{\{(.+?)\}\}/
      let value = node.textContent
  
      if(reg.test(value)){
        let key = RegExp.$1.trim()
        node.textContent = value.replace(reg,this.vm[key])
  
        // 创建watcher对象
        new Watcher(this.vm,key,(newVal) => {
          node.textContent = newVal
        })
      }
    }
  
    // 判断元素属性是否是指令
    isDirective(attrName){
      return attrName.startsWith('v-')
    }
  
    // 判断节点是否是文本节点
    isTextNode(node){
      return node.nodeType === 3
    }
  
    // 判断节点是否是元素节点
    isElementNode(node){
      return node.nodeType === 1
    }
  }