import ORM
from models import User, Blog, Comment

def test():
    yield from ORM.create_pool(loop='loop',user='www-data', password='www-data', databases='awesome')

    u = User(name='Test', email='test@example.com', passwd='1234567890', image='about:blank')

    yield from u.save()

for x in test():
    pass
