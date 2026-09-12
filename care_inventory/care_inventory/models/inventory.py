from django.core.validators import MinValueValidator
from django.db import models


class InventoryItem(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=100, default="General")
    quantity = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
    )
    reorder_level = models.PositiveIntegerField(default=0)
    unit = models.CharField(max_length=20, default="units")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    @property
    def is_low_stock(self):
        return self.quantity <= self.reorder_level

    def __str__(self):
        return f"{self.name} ({self.sku})"
