// Product Schema
export const productSchema = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "stock",
      type: "number",
      title: "Stock Level",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      validation: (Rule) => Rule.required(),
    },
    { name: "description", type: "text", title: "Description" },
    { name: "image", type: "image", title: "Product Image" },
    {
      name: "customizationOptions",
      type: "array",
      title: "Customization Options",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).max(10),
    },
  ],
};

// Customer Schema
export const customerSchema = {
  name: "customer",
  type: "document",
  title: "Customer",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      title: "Email Address",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "phone",
      type: "string",
      title: "Phone Number",
      validation: (Rule) =>
        Rule.required().regex(/^\+?[0-9]{10,15}$/, {
          name: "phone number",
          invert: false,
        }),
    },
    {
      name: "address",
      type: "string",
      title: "Delivery Address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderHistory",
      type: "array",
      title: "Order History",
      of: [{ type: "reference", to: [{ type: "order" }] }],
    },
  ],
};

// Order Schema
export const orderSchema = {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "orderID",
      type: "string",
      title: "Order ID",
      validation: (Rule) => Rule.required().unique(),
    },
    {
      name: "customer",
      type: "reference",
      title: "Customer",
      to: [{ type: "customer" }],
    },
    {
      name: "productDetails",
      type: "array",
      title: "Product Details",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "orderStatus",
      type: "string",
      title: "Order Status",
      options: { list: ["Pending", "Shipped", "Delivered", "Canceled"] },
    },
    {
      name: "paymentStatus",
      type: "string",
      title: "Payment Status",
      options: { list: ["Paid", "Pending", "Canceled"] },
    },
    {
      name: "deliveryDate",
      type: "datetime",
      title: "Delivery Date",
      validation: (Rule) => Rule.required().min("2025-01-01"),
    },
  ],
};

// Payment Schema
export const paymentSchema = {
  name: "payment",
  type: "document",
  title: "Payment",
  fields: [
    {
      name: "paymentID",
      type: "string",
      title: "Payment ID",
      validation: (Rule) => Rule.required().unique(),
    },
    {
      name: "order",
      type: "reference",
      title: "Order",
      to: [{ type: "order" }],
    },
    {
      name: "amount",
      type: "number",
      title: "Amount Paid",
      validation: (Rule) => Rule.required().min(0.01),
    },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
      options: { list: ["Credit Card", "PayPal", "Cash on Delivery"] },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "paymentStatus",
      type: "string",
      title: "Payment Status",
      options: { list: ["Paid", "Pending"] },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "transactionID",
      type: "string",
      title: "Transaction ID",
      validation: (Rule) => Rule.required(),
    },
  ],
};

// Shipment Schema
export const shipmentSchema = {
  name: "shipment",
  type: "document",
  title: "Shipment",
  fields: [
    {
      name: "shipmentID",
      type: "string",
      title: "Shipment ID",
      validation: (Rule) => Rule.required().unique(),
    },
    {
      name: "order",
      type: "reference",
      title: "Order",
      to: [{ type: "order" }],
    },
    {
      name: "shipmentStatus",
      type: "string",
      title: "Shipment Status",
      options: { list: ["In Transit", "Delivered", "Pending", "Failed"] },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "deliveryDate",
      type: "datetime",
      title: "Delivery Date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "trackingNumber",
      type: "string",
      title: "Tracking Number",
      validation: (Rule) => Rule.required(),
    },
  ],
};

// Customization Schema
export const customizationSchema = {
  name: "customization",
  type: "document",
  title: "Customization",
  fields: [
    {
      name: "product",
      type: "reference",
      title: "Product",
      to: [{ type: "product" }],
    },
    {
      name: "materialType",
      type: "string",
      title: "Material Type",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "colorChoice",
      type: "string",
      title: "Color Choice",
      validation: (Rule) => Rule.required(),
    },
    { name: "sizeModifications", type: "string", title: "Size Modifications" },
    {
      name: "additionalFeatures",
      type: "array",
      title: "Additional Features",
      of: [{ type: "string" }],
    },
    {
      name: "priceAdjustment",
      type: "number",
      title: "Price Adjustment",
      validation: (Rule) => Rule.min(0),
    },
  ],
};

export default {
  productSchema,
  customerSchema,
  orderSchema,
  paymentSchema,
  shipmentSchema,
  customizationSchema,
};
