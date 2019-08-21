
from datetime import datetime, timedelta

import jwt
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models

from config import default
from apps.utils.base_model import BaseModel


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, password, **extra_fields)


class User(BaseModel, AbstractBaseUser, PermissionsMixin):

    username = models.CharField(db_index=True, max_length=255, unique=True)

    email = models.EmailField(db_index=True, max_length=255, unique=True)

    name = models.CharField(max_length=255)

    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', ]
    objects = UserManager()

    def __str__(self):
        return self.email

    def token(self, x=1):
        payload = {
            "email": self.email,
            "exp": datetime.now() + timedelta(days=x),
            "username": self.username
        }
        jwt_token = jwt.encode(payload, default.SECRET_KEY)
        return jwt_token.decode("utf-8")
