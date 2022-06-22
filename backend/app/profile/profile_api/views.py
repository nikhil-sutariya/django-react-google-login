from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import login
from .serializers import *
# from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data = user)
        serializer.is_valid(raise_exception = True)
        serializer.save()

        user_data = serializer.data
        return Response(user_data, status = status.HTTP_201_CREATED)



class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        # refresh = RefreshToken.for_user(user)
        login(request, user)
        return Response({
            'userId' : user.id,
            'firstName' : user.first_name,
            'lastName' : user.last_name,
            'email' : user.email,
            # 'refreshToken' : str(refresh),
            # 'accessToken' : str(refresh.access_token),
            }, status = status.HTTP_200_OK
        )

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response({'message': 'User successfully logged out'}, status= status.HTTP_200_OK)
