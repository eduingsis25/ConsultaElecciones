from .models import elector
from rest_framework import viewsets, permissions
from .serializers import ElectorSerializer


class ElectorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows elector to be viewed or edited.
    """
    queryset = elector.objects.all()
    serializer_class = ElectorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['GET']:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()
