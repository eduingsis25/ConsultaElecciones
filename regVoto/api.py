from .models import votante
from rest_framework import viewsets, permissions
from .serializers import VotanteSerializer


class VotanteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows votante to be viewed or edited.
    """
    queryset = votante.objects.all()
    serializer_class = VotanteSerializer
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.request.method in ['GET']:
            return [permissions.AllowAny()]
        else:
            # Para todas las demás solicitudes (POST, PUT, DELETE, PATCH),
            # requerir que el usuario esté autenticado.
            return [permissions.IsAuthenticated()]
