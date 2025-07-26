from .models import votante
from rest_framework import viewsets, permissions
from .serializers import VotanteSerializer


class VotanteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows elector to be viewed or edited.
    """
    queryset = votante.objects.all(
    )  # Asegúrate de usar 'censo' si ese es el nombre de tu modelo
    serializer_class = VotanteSerializer
    # permission_classes = [permissions.IsAuthenticated] # Puedes quitar esta línea si get_permissions lo maneja todo, o dejarla como un fallback para métodos no cubiertos. Lo más limpio es que get_permissions devuelva SIEMPRE los permisos correctos.

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.request.method == 'GET':
            # Para las solicitudes GET, permitir acceso a cualquiera (no autenticado)
            return [permissions.AllowAny()]
        else:
            # Para todas las demás solicitudes (POST, PUT, DELETE, PATCH),
            # requerir que el usuario esté autenticado.
            return [permissions.IsAuthenticated()]
