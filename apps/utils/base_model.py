import uuid
from datetime import datetime

from django.db import models


class BaseModel(models.Model):
    identifier = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    date_created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True
        ordering = ['date_created']

    def delete(self):
        self.deleted_at = datetime.now()
        self.is_deleted = True
        self.save()

    def hard_delete(self):
        super().delete()
