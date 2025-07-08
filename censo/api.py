# from .models import censo
# from rest_framework import viewsets, permissions
# from .serializers import CensoSerializer


# class CensoViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows elector to be viewed or edited.
#     """
#     queryset = censo.objects.all()
#     serializer_class = CensoSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method in ['GET']:
#             self.permission_classes = [permissions.AllowAny]
#         return super().get_permissions()


from .models import censo  # Asumo que tu modelo se llama 'censo' en minúsculas
from rest_framework import viewsets, permissions
from .serializers import CensoSerializer


class CensoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows elector to be viewed or edited.
    """
    queryset = censo.objects.all()  # Asegúrate de usar 'censo' si ese es el nombre de tu modelo
    serializer_class = CensoSerializer
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
