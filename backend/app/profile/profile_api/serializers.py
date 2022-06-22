from rest_framework import serializers
from profile.models import User
from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name', 'phone', 'email', 'password', 'is_active']
        extra_kwargs = {'email': {'read_only': True}, 'password': {'read_only': True}}


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField( write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'first_name','last_name', 'phone', 'email', 'password']
      
    def validate(self, attrs):
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length = 255, min_length = 3)
    password = serializers.CharField(max_length = 16, min_length = 6, write_only = True,  style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            
            if not user:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
            
            elif not user.is_active:
                raise serializers.ValidationError('Your account is disabled please contact your admin.')
        else:
            raise serializers.ValidationError('Email password is required')

        data['user'] = user
        return data

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    # def save(self, **kwargs):
    #     try:
    #         RefreshToken(self.token).blacklist()
        
    #     except TokenError:
    #         self.fail('bad request')
