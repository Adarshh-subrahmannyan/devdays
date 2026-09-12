"""URL routes.

Core mounts this module at /api/care_inventory/ via the PLUGIN_APPS loop in
config/urls.py. Do not repeat that prefix here.

Routes under `otp/` are for the patient portal (OTP-authenticated, phone-number scoped).
Keep them read-mostly. See the care-auth-contexts skill.
"""

from django.urls import path
from rest_framework.routers import DefaultRouter

from care_inventory.viewsets.config import ConfigView
from care_inventory.viewsets.items import InventoryItemViewSet

router = DefaultRouter()
router.register("items", InventoryItemViewSet, basename="inventory-item")

urlpatterns = [
    *router.urls,
    path("config/", ConfigView.as_view(), name="care_inventory-config"),
]
