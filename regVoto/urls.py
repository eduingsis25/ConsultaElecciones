from rest_framework import routers
from .api import VotanteViewSet

router = routers.DefaultRouter()
router.register('api/votante', VotanteViewSet, 'votante')

urlpatterns = router.urls
