#项目结构



##基础服务程序基本结构  
```
|- flaskyServer
  |- app/
    |- api/         提供给RIA ajax return JSON
    |- auth/        身份验证
    |- templates/   页面模版
    |- static/      静态资源
    |- main/
      |- __init__.py
      |- errors.py
      |- forms.py
      |- views.py
    |- __init__.py
    |- email.py
    |- models.py
    |- decorator.py 权限管理
    |- exceptions.py
  |- migrations/   数据库迁移脚本
  |- tests/
    |- __init__.py 单元测试
    |- test*.py
  |- venv/         运行环境
  |- requirements  依赖           pip3 freeze > requirements.txt 备份   
  |                              pip3 install -r requirements.txt 自动安装依赖（或直接拷贝venv文件夹 运行环境 source venv/bin/activate
  |- config.py    测试／生产环境配置   
  |- manage.py    server shell交互 使用python3 ./manage.py启动
```

\/================\/
##权限控制


\/================\/
##数据库model
Role        User        Event
