import { apiListMe } from "@/lib/member-api";
import { OrdersList, type UiOrder } from "@/components/account/orders-list";

export const metadata = { title: "Đơn hàng của tôi" };

interface ApiOrder {
  id: number | string;
  code: string;
  type: string;
  productName: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface ApiVbOrder {
  id: number | string;
  code: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string; // pending|delivered|failed|error|refunded
  items: string[];
  errorMsg: string | null;
  createdAt: string;
}

const typeLabel: Record<string, string> = {
  account: "Nick game",
  item: "Vật phẩm",
  boosting: "Cày thuê",
};

// Account/order statuses.
const orderStatus: Record<string, { label: string; variant: UiOrder["statusVariant"] }> = {
  completed: { label: "Hoàn tất", variant: "success" },
  pending: { label: "Chờ xử lý", variant: "accent" },
  processing: { label: "Đang xử lý", variant: "accent" },
  cancelled: { label: "Đã huỷ", variant: "outline" },
  refunded: { label: "Đã hoàn", variant: "accent" },
};

// Supplier (vieblox) statuses.
const vbStatus: Record<string, { label: string; variant: UiOrder["statusVariant"] }> = {
  delivered: { label: "Đã giao", variant: "success" },
  pending: { label: "Đang xử lý", variant: "accent" },
  failed: { label: "Thất bại", variant: "outline" },
  error: { label: "Đang xử lý", variant: "accent" },
  refunded: { label: "Đã hoàn tiền", variant: "accent" },
};

function mapOrder(o: ApiOrder): UiOrder {
  const st = orderStatus[o.status] ?? { label: o.status, variant: "outline" as const };
  return {
    key: `order-${o.id}`,
    code: o.code,
    typeLabel: typeLabel[o.type] ?? o.type,
    productName: o.productName,
    amount: o.amount,
    statusLabel: st.label,
    statusVariant: st.variant,
    createdAt: o.createdAt,
  };
}

function mapVb(o: ApiVbOrder): UiOrder {
  const st = vbStatus[o.status] ?? { label: o.status, variant: "outline" as const };
  return {
    key: `vb-${o.id}`,
    code: o.code,
    typeLabel: "Blox Fruits",
    productName: `${o.productName.trim()} x${o.quantity}`,
    amount: o.totalPrice,
    statusLabel: st.label,
    statusVariant: st.variant,
    createdAt: o.createdAt,
    items: o.status === "delivered" ? o.items : undefined,
    // show the reason only for failed/refunded/error states
    errorMsg: o.status === "delivered" ? null : o.errorMsg,
  };
}

export default async function AccountOrdersPage() {
  const [orders, vb] = await Promise.all([
    apiListMe<ApiOrder>("/orders/me?limit=50").catch(() => ({ data: [] as ApiOrder[] })),
    apiListMe<ApiVbOrder>("/vieblox/my-orders").catch(() => ({ data: [] as ApiVbOrder[] })),
  ]);

  const all: UiOrder[] = [...orders.data.map(mapOrder), ...vb.data.map(mapVb)].sort(
    (a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0)
  );

  return <OrdersList orders={all} />;
}
