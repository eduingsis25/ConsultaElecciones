from rest_framework import routers
from .api import ElectorViewSet

router = routers.DefaultRouter()

router.register('api/elector', ElectorViewSet, 'elector')

urlpatterns = router.urls
