<script setup lang="ts">
export interface Customer {
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_status: string;
  customer_address: string;
  customer_sales: Sales[];
  last_activity: string;
}

export interface Sales {
  sales_id: string;
  sales_name: string;
}
</script>
