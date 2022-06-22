from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email,password, **extra_fields)

''' User class is our custom User model for our users '''

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique= True)
    phone = models.CharField(_('phone number'), max_length= 10,blank=True, null=True)
    token = models.CharField(_('token'), max_length= 200 , blank=True, null=True)
    refresh_token = models.CharField(_('refresh token'), max_length= 200 , blank=True, null=True)
    # email_otp = models.CharField(_('email otp'), max_length= 4, blank= True, null= True)
    # is_email_otp_verified = models.BooleanField(_('is email otp verified'), default= False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = "Users"
        verbose_name = "Users"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.email