from django.conf import settings

if not settings.configured:
    settings.configure(
        SECRET_KEY="test-key",
        INSTALLED_APPS=[
            "django.contrib.auth",
            "django.contrib.contenttypes",
            "care_inventory",
        ],
        DATABASES={"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}},
        DEFAULT_AUTO_FIELD="django.db.models.AutoField",
        USE_TZ=True,
    )

import django
from django.test import SimpleTestCase


django.setup()

from care_inventory.models import InventoryItem


class InventoryItemTests(SimpleTestCase):
    def test_low_stock_flag_activates_when_quantity_is_at_reorder_level(self):
        item = InventoryItem(
            name="Surgical Gloves",
            sku="SG-240",
            quantity=10,
            reorder_level=10,
        )

        self.assertTrue(item.is_low_stock)
        self.assertEqual(str(item), "Surgical Gloves (SG-240)")

    def test_inventory_item_keeps_a_unique_sku(self):
        self.assertTrue(InventoryItem._meta.get_field("sku").unique)
