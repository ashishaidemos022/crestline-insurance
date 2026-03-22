type StatusConfig = {
  bg: string
  color: string
}

type StatusBadgeProps = {
  status: string
}

const statusConfig: Record<string, StatusConfig> = {
  // Policy statuses
  Active: { bg: '#dcfce7', color: '#166534' },
  'Renewal Pending': { bg: '#fef9c3', color: '#854d0e' },
  Expired: { bg: '#fee2e2', color: '#991b1b' },
  Cancelled: { bg: '#f3f4f6', color: '#374151' },
  // Claim statuses
  'FNOL Received': { bg: '#dbeafe', color: '#1e40af' },
  'Under Investigation': { bg: '#fef9c3', color: '#854d0e' },
  'Pending Review': { bg: '#ede9fe', color: '#5b21b6' },
  'Closed - Paid': { bg: '#dcfce7', color: '#166534' },
  'Closed - Denied': { bg: '#fee2e2', color: '#991b1b' },
  // Invoice statuses
  Paid: { bg: '#dcfce7', color: '#166534' },
  Pending: { bg: '#fef9c3', color: '#854d0e' },
  Overdue: { bg: '#fee2e2', color: '#991b1b' },
  // Priority levels
  Urgent: { bg: '#fee2e2', color: '#991b1b' },
  High: { bg: '#ffedd5', color: '#9a3412' },
  Medium: { bg: '#fef9c3', color: '#854d0e' },
  Low: { bg: '#dcfce7', color: '#166534' },
}

const fallbackConfig: StatusConfig = { bg: '#f3f4f6', color: '#374151' }

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? fallbackConfig
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: config.bg, color: config.color }}
    >
      {status}
    </span>
  )
}
