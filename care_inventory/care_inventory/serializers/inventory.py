from rest_framework import serializers

from care_inventory.models import InventoryItem


class InventoryItemSerializer(serializers.ModelSerializer):
    is_low_stock = serializers.BooleanField(read_only=True)

    class Meta:
        model = InventoryItem
        fields = [
            "id",
            "name",
            "sku",
            "category",
            "quantity",
            "reorder_level",
            "unit",
            "description",
            "is_low_stock",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "is_low_stock"]
