from rest_framework import routers
from .api import CensoViewSet

router = routers.DefaultRouter()

router.register('api/censo', CensoViewSet, 'censo')

urlpatterns = router.urls
