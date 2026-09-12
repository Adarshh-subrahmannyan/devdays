from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from care_inventory.models import InventoryItem
from care_inventory.serializers import InventoryItemSerializer


class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset

    @action(detail=True, methods=["post"], url_path="adjust-stock")
    def adjust_stock(self, request, *args, **kwargs):
        item = self.get_object()
        delta = request.data.get("delta")
        try:
            delta = int(delta)
        except (TypeError, ValueError):
            return Response(
                {"detail": "delta must be an integer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        new_quantity = item.quantity + delta
        if new_quantity < 0:
            return Response(
                {"detail": "Stock cannot go below zero."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        item.quantity = new_quantity
        item.save(update_fields=["quantity", "updated_at"])
        serializer = self.get_serializer(item)
        return Response(serializer.data)
