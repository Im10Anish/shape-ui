import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Table, type TableColumn } from "./Table";
import { Badge } from "../Badge/Badge";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "bordered", "striped"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    paginationType: {
      control: { type: "select" },
      options: ["paged", "showMore"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
    lastActiveLogin: "2024-01-15 14:30",
    loginBrowser: "Chrome",
    loginLocation: "New York, NY",
    loginIP: "192.168.1.100",
    loginDevice: "MacBook Pro",
    loginDeviceType: "Desktop",
    loginDeviceOS: "macOS",
    loginDeviceBrowser: "Chrome 120.0",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10",
    lastActiveLogin: "2024-01-10 09:15",
    loginBrowser: "Firefox",
    loginLocation: "Los Angeles, CA",
    loginIP: "192.168.1.101",
    loginDevice: "iPhone 15",
    loginDeviceType: "Mobile",
    loginDeviceOS: "iOS 17",
    loginDeviceBrowser: "Safari 17.0",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "active",
    lastLogin: "2024-01-12",
    lastActiveLogin: "2024-01-12 16:45",
    loginBrowser: "Edge",
    loginLocation: "Chicago, IL",
    loginIP: "192.168.1.102",
    loginDevice: "Dell XPS",
    loginDeviceType: "Desktop",
    loginDeviceOS: "Windows 11",
    loginDeviceBrowser: "Edge 120.0",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-14",
    lastActiveLogin: "2024-01-14 11:20",
    loginBrowser: "Safari",
    loginLocation: "Miami, FL",
    loginIP: "192.168.1.103",
    loginDevice: "iPad Pro",
    loginDeviceType: "Tablet",
    loginDeviceOS: "iPadOS 17",
    loginDeviceBrowser: "Safari 17.0",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
    status: "inactive",
    lastLogin: "2024-01-08",
    lastActiveLogin: "2024-01-08 13:10",
    loginBrowser: "Chrome",
    loginLocation: "Seattle, WA",
    loginIP: "192.168.1.104",
    loginDevice: "Lenovo ThinkPad",
    loginDeviceType: "Desktop",
    loginDeviceOS: "Ubuntu 22.04",
    loginDeviceBrowser: "Chrome 120.0",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
  },
];

// Basic columns
const basicColumns: TableColumn[] = [
  { id: "name", label: "Name", width: 3 },
  { id: "email", label: "Email", width: 4 },
  { id: "role", label: "Role", width: 2 },
  { id: "status", label: "Status", width: 2 },
  { id: "lastLogin", label: "Last Login", width: 3 },
];

// Advanced columns with custom rendering
const advancedColumns: TableColumn[] = [
  {
    id: "avatar",
    label: "User",
    width: 3,
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <Avatar src={value} alt={row.name} size="sm" />
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    id: "role",
    label: "Role",
    width: 2,
    render: (value) => (
      <Badge variant={value === "Admin" ? "default" : "secondary"}>
        {value}
      </Badge>
    ),
  },
  {
    id: "status",
    label: "Status",
    width: 2,
    render: (value) => (
      <Badge variant={value === "active" ? "success" : "destructive"}>
        {value}
      </Badge>
    ),
  },
  {
    id: "lastLogin",
    label: "Last Login",
    width: 3,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    width: 2,
    align: "center",
    render: () => (
      <div className="flex gap-1">
        <Button size="sm" variant="outline">
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
];

// Large dataset for pagination testing
const largeDataset = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Moderator" : "User",
  status: i % 4 === 0 ? "inactive" : "active",
  lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  avatar: `https://images.unsplash.com/photo-${
    1472099645785 + i
  }?w=32&h=32&fit=crop&crop=face`,
}));

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "default",
    size: "md",
  },
};

export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "bordered",
    size: "md",
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "striped",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "default",
    size: "lg",
  },
};

export const WithCustomRendering: Story = {
  args: {
    columns: advancedColumns,
    data: sampleData,
    variant: "default",
    size: "md",
  },
};

export const WithRowNumbers: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "default",
    size: "md",
    showRowNumbers: true,
  },
};

export const StickyHeader: Story = {
  args: {
    columns: basicColumns,
    data: largeDataset,
    variant: "default",
    size: "md",
    stickyHeader: true,
    scrollable: true,
    maxHeight: "300px",
  },
};

export const StickyLastColumns: Story = {
  args: {
    columns: [
      { id: "name", label: "Name", width: 2 },
      { id: "email", label: "Email", width: 3 },
      { id: "role", label: "Role", width: 1 },
      { id: "status", label: "Status", width: 1 },
      { id: "lastLogin", label: "Last Login", width: 2 },
      { id: "lastActiveLogin", label: "Last Active", width: 2 },
      { id: "loginBrowser", label: "Browser", width: 1 },
      { id: "loginLocation", label: "Location", width: 2 },
      { id: "loginIP", label: "IP Address", width: 2 },
      { id: "loginDevice", label: "Device", width: 2 },
      { id: "loginDeviceType", label: "Device Type", width: 1 },
      { id: "loginDeviceOS", label: "OS", width: 1 },
      { id: "loginDeviceBrowser", label: "Browser Version", width: 2 },
      {
        id: "actions",
        label: "Actions",
        width: 1,
        align: "center",
        render: () => (
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        ),
      },
    ],
    data: sampleData,
    variant: "default",
    size: "md",
    stickyHeader: true,
    stickyLastColumns: 1,
    scrollable: true,
    maxHeight: "300px",
  },
};

export const StickyFirstColumns: Story = {
  args: {
    columns: [
      { id: "name", label: "Name", width: 2 },
      { id: "email", label: "Email", width: 3 },
      { id: "role", label: "Role", width: 1 },
      { id: "status", label: "Status", width: 1 },
      { id: "lastLogin", label: "Last Login", width: 2 },
      { id: "lastActiveLogin", label: "Last Active", width: 2 },
      { id: "loginBrowser", label: "Browser", width: 1 },
      { id: "loginLocation", label: "Location", width: 2 },
      { id: "loginIP", label: "IP Address", width: 2 },
      { id: "loginDevice", label: "Device", width: 2 },
      { id: "loginDeviceType", label: "Device Type", width: 1 },
      { id: "loginDeviceOS", label: "OS", width: 1 },
      { id: "loginDeviceBrowser", label: "Browser Version", width: 2 },
      {
        id: "actions",
        label: "Actions",
        width: 1,
        align: "center",
        render: () => (
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        ),
      },
    ],
    data: sampleData,
    variant: "default",
    size: "md",
    stickyFirstColumns: 3,
    scrollable: true,
    maxHeight: "300px",
  },
};

export const StickyFirstAndLastColumns: Story = {
  args: {
    columns: [
      { id: "name", label: "Name", width: 2 },
      { id: "email", label: "Email", width: 3 },
      { id: "role", label: "Role", width: 1 },
      { id: "status", label: "Status", width: 1 },
      { id: "lastLogin", label: "Last Login", width: 2 },
      { id: "lastActiveLogin", label: "Last Active", width: 2 },
      { id: "loginBrowser", label: "Browser", width: 1 },
      { id: "loginLocation", label: "Location", width: 2 },
      { id: "loginIP", label: "IP Address", width: 2 },
      { id: "loginDevice", label: "Device", width: 2 },
      { id: "loginDeviceType", label: "Device Type", width: 1 },
      { id: "loginDeviceOS", label: "OS", width: 1 },
      { id: "loginDeviceBrowser", label: "Browser Version", width: 2 },
      {
        id: "actions",
        label: "Actions",
        width: 1,
        align: "center",
        render: () => (
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              Edit
            </Button>
            <Button size="sm" variant="destructive">
              Delete
            </Button>
          </div>
        ),
      },
    ],
    data: sampleData,
    variant: "default",
    size: "md",
    stickyFirstColumns: 2,
    stickyLastColumns: 2,
    scrollable: true,
    maxHeight: "300px",
  },
};

export const PagedPagination: Story = {
  args: {
    columns: basicColumns,
    data: largeDataset,
    variant: "default",
    size: "md",
    paginationType: "paged",
    pageSize: 5,
    currentPage: 1,
    totalPages: Math.ceil(largeDataset.length / 5),
  },
};

export const ShowMorePagination: Story = {
  render: () => {
    const [displayedData, setDisplayedData] = useState(
      largeDataset.slice(0, 10),
    );
    const [loading, setLoading] = useState(false);
    const [, setHasMore] = useState(true);

    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        const currentLength = displayedData.length;
        const newData = largeDataset.slice(0, currentLength + 10);
        setDisplayedData(newData);
        setHasMore(newData.length < largeDataset.length);
        setLoading(false);
      }, 1000);
    };

    return (
      <Table
        columns={basicColumns}
        data={displayedData}
        variant="default"
        size="md"
        paginationType="showMore"
        pageSize={10}
        onLoadMore={handleLoadMore}
        loading={loading}
      />
    );
  },
};

export const Sortable: Story = {
  render: () => {
    const [data, setData] = useState(sampleData);
    const [sortColumn, setSortColumn] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const sortableColumns: TableColumn[] = [
      { id: "name", label: "Name", width: 3, sortable: true },
      { id: "email", label: "Email", width: 4, sortable: true },
      { id: "role", label: "Role", width: 2, sortable: true },
      { id: "status", label: "Status", width: 2, sortable: true },
      { id: "lastLogin", label: "Last Login", width: 3, sortable: true },
    ];

    const handleSort = (columnId: string, direction: "asc" | "desc") => {
      setSortColumn(columnId);
      setSortDirection(direction);

      const sortedData = [...data].sort((a, b) => {
        const aValue = (a as any)[columnId];
        const bValue = (b as any)[columnId];

        if (direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });

      setData(sortedData);
    };

    return (
      <Table
        columns={sortableColumns}
        data={data}
        variant="default"
        size="md"
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    );
  },
};

export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
    variant: "default",
    size: "md",
    emptyMessage: "No users found. Try adjusting your search criteria.",
  },
};

export const LoadingState: Story = {
  args: {
    columns: basicColumns,
    data: [],
    variant: "default",
    size: "md",
    loading: true,
    emptyMessage: "Loading users...",
  },
};

export const WithCustomRowStyling: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: "default",
    size: "md",
    rowClassName: (row, index) => {
      if (row.status === "inactive") return "opacity-50";
      if (index % 2 === 0) return "bg-muted/25";
      return "";
    },
  },
};

export const ResponsiveTable: Story = {
  args: {
    columns: [
      { id: "name", label: "Name", width: 3 },
      { id: "email", label: "Email", width: 4 },
      { id: "role", label: "Role", width: 2 },
      { id: "status", label: "Status", width: 2 },
      { id: "lastLogin", label: "Last Login", width: 3 },
    ],
    data: sampleData,
    variant: "default",
    size: "md",
    stickyLastColumns: 2,
    scrollable: true,
    maxHeight: "400px",
  },
};
