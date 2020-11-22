#!/usr/bin/env node

// console.log('cli working')

// 脚手架的工作过程
// 1.通过命令行交互询问用户问题
// 2.根据用户回答结果生成文件
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name',
    }
])
.then(answers => {
    // console.log(answers)
    const tmplDir = path.join(__dirname,'templates')
    const destDir = process.cwd()
    fs.readdir(tmplDir, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            ejs.renderFile(path.join(tmplDir,file), answers, (err,result) => {
                if(err) throw err
                fs.writeFileSync(path.join(destDir,file),result)
            })
        });
    })
})