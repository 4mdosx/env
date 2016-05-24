#项目结构

Flask并不强制要求大型项目使用特定的组织方式，程序结构的组织方式完全由开发者决定。

对于开发初期结构更新频发的程序友好，但对组织架构和人员更替带来更多挑战。

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
  |- requirements.txt 依赖
  |- config.py    自动部署脚本
  |- manage.py    server shell交互工具
```
