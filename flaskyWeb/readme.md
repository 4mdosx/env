#项目结构

Flask并不强制要求像大型项目使用特定的组织方式，程序结构的组织方式完全由开发者决定。

对于开发初期结构更新频发的程序友好.

基础服务程序基本结构  
```
|- flaskyWeb
  |- app/
    |- templates/  页面模版
    |- static/     静态资源
    |- main/
      |- __init__.py
      |- errors.py
      |- forms.py
      |- views.py
    |- __init__.py
    |- email.py
    |- models.py
  |- migrations/   数据库迁移脚本
  |- tests/
    |- __init__.py 单元测试
    |- test*.py
  |- venv/         运行环境
  |- requirements.txt 依赖        pip3 freeze > requirements.txt 备份   
  |                              pip3 install -r requirements.txt 自动安装依赖（或直接拷贝venv文件夹 运行环境 source venv/bin/activate
  |- config.py    测试／生产环境配置   
  |- manage.py    server shell交互 使用python3 ./manage.py启动
```
