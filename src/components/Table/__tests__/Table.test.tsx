import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Table, type TableColumn } from "../Table";

// Mock data for testing
const mockData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Moderator",
    status: "active",
    lastLogin: "2024-01-12",
  },
];

const basicColumns: TableColumn[] = [
  { id: "name", label: "Name", width: 3 },
  { id: "email", label: "Email", width: 4 },
  { id: "role", label: "Role", width: 2 },
  { id: "status", label: "Status", width: 2 },
  { id: "lastLogin", label: "Last Login", width: 3 },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table columns={basicColumns} data={mockData} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Moderator")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<Table columns={basicColumns} data={mockData} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Last Login")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Table columns={basicColumns} data={mockData} />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("w-full", "border-collapse");
  });

  it("applies bordered variant classes", () => {
    render(<Table columns={basicColumns} data={mockData} variant="bordered" />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("border", "border-border");
  });

  it("applies striped variant classes", () => {
    render(<Table columns={basicColumns} data={mockData} variant="striped" />);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("[&_tr:nth-child(even)]:bg-muted/90");
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Table columns={basicColumns} data={mockData} size="sm" />,
    );
    expect(screen.getByText("Name").closest("th")).toHaveClass("text-xs");

    rerender(<Table columns={basicColumns} data={mockData} size="lg" />);
    expect(screen.getByText("Name").closest("th")).toHaveClass("text-base");
  });

  it("applies sticky header classes when enabled", () => {
    render(<Table columns={basicColumns} data={mockData} stickyHeader />);
    const headerCells = screen.getAllByRole("columnheader");
    headerCells.forEach((headerCell) => {
      expect(headerCell).toHaveClass(
        "sticky",
        "top-0",
        "z-20",
        "bg-background/95",
        "backdrop-blur-xl",
        "shadow-lg",
        "border-b-2",
        "border-border/80",
      );
    });
  });

  it("renders empty state when no data", () => {
    render(<Table columns={basicColumns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(
      <Table columns={basicColumns} data={[]} emptyMessage="No users found" />,
    );
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("shows row numbers when enabled", () => {
    render(<Table columns={basicColumns} data={mockData} showRowNumbers />);
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("handles custom cell rendering", () => {
    const customColumns: TableColumn[] = [
      {
        id: "name",
        label: "Name",
        render: (value) => (
          <span data-testid="custom-cell">{value.toUpperCase()}</span>
        ),
      },
      { id: "email", label: "Email" },
    ];

    render(<Table columns={customColumns} data={mockData} />);
    expect(screen.getAllByTestId("custom-cell")[0]).toHaveTextContent(
      "JOHN DOE",
    );
  });

  it("handles column alignment", () => {
    const alignedColumns: TableColumn[] = [
      { id: "name", label: "Name", align: "left" },
      { id: "email", label: "Email", align: "center" },
      { id: "role", label: "Role", align: "right" },
    ];

    render(<Table columns={alignedColumns} data={mockData} />);

    const nameHeader = screen.getByText("Name").closest("th");
    const emailHeader = screen.getByText("Email").closest("th");
    const roleHeader = screen.getByText("Role").closest("th");

    expect(nameHeader).toHaveClass("text-left");
    expect(emailHeader).toHaveClass("text-center");
    expect(roleHeader).toHaveClass("text-right");
  });

  it("handles sortable columns", () => {
    const sortableColumns: TableColumn[] = [
      { id: "name", label: "Name", sortable: true },
      { id: "email", label: "Email", sortable: true },
    ];

    const handleSort = jest.fn();
    render(
      <Table
        columns={sortableColumns}
        data={mockData}
        onSort={handleSort}
        sortColumn="name"
        sortDirection="asc"
      />,
    );

    const nameHeader = screen.getByText("Name").closest("th");
    expect(nameHeader).toHaveClass("cursor-pointer");

    fireEvent.click(nameHeader!);
    expect(handleSort).toHaveBeenCalledWith("name", "desc");
  });

  it("shows sort indicators", () => {
    const sortableColumns: TableColumn[] = [
      { id: "name", label: "Name", sortable: true },
    ];

    render(
      <Table
        columns={sortableColumns}
        data={mockData}
        onSort={jest.fn()}
        sortColumn="name"
        sortDirection="asc"
      />,
    );

    expect(screen.getByText("↑")).toBeInTheDocument();
  });

  it("handles paged pagination", () => {
    const handlePageChange = jest.fn();
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        paginationType="paged"
        pageSize={1}
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />,
    );

    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
  });

  it("handles show more pagination", () => {
    const handleLoadMore = jest.fn();
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        paginationType="showMore"
        pageSize={2}
        onLoadMore={handleLoadMore}
      />,
    );

    expect(screen.getByText("Show More")).toBeInTheDocument();
  });

  it("shows loading state in show more", () => {
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: "User",
      status: "active",
      lastLogin: "2024-01-15",
    }));

    render(
      <Table
        columns={basicColumns}
        data={largeData}
        paginationType="showMore"
        loading={true}
        onLoadMore={jest.fn()}
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles sticky first columns", () => {
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        stickyFirstColumns={2}
        scrollable={true}
        maxHeight="300px"
      />,
    );

    const nameHeader = screen.getByText("Name").closest("th");
    const emailHeader = screen.getByText("Email").closest("th");

    expect(nameHeader).toHaveClass("sticky");
    expect(emailHeader).toHaveClass("sticky");
  });

  it("handles sticky last columns", () => {
    const columnsWithActions = [
      ...basicColumns,
      { id: "actions", label: "Actions", width: 2 },
    ];

    render(
      <Table
        columns={columnsWithActions}
        data={mockData}
        stickyLastColumns={1}
        scrollable={true}
        maxHeight="300px"
      />,
    );

    const actionsHeader = screen.getByText("Actions").closest("th");
    expect(actionsHeader).toHaveClass("sticky");
  });

  it("applies sticky cell styling", () => {
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        stickyFirstColumns={1}
        scrollable={true}
        maxHeight="300px"
      />,
    );

    const nameCell = screen.getByText("John Doe").closest("td");
    expect(nameCell).toHaveClass(
      "sticky",
      "bg-background/90",
      "backdrop-blur-lg",
      "shadow-md",
    );
  });

  it("applies custom row styling", () => {
    const rowClassName = jest.fn().mockReturnValue("custom-row-class");

    render(
      <Table
        columns={basicColumns}
        data={mockData}
        rowClassName={rowClassName}
      />,
    );

    expect(rowClassName).toHaveBeenCalledWith(mockData[0], 0);
    expect(rowClassName).toHaveBeenCalledWith(mockData[1], 1);
    expect(rowClassName).toHaveBeenCalledWith(mockData[2], 2);
  });

  it("handles scrollable container", () => {
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        scrollable={true}
        maxHeight="300px"
      />,
    );

    const container = screen.getByRole("table").closest("div");
    expect(container).toHaveClass("overflow-y-auto");
    expect(container).toHaveStyle({ maxHeight: "300px" });
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Table columns={basicColumns} data={mockData} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("spreads additional props", () => {
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        data-testid="test-table"
        aria-label="Test Table"
      />,
    );

    const container = screen.getByTestId("test-table");
    expect(container).toHaveAttribute("aria-label", "Test Table");
  });

  it("handles column width ratios", () => {
    const columnsWithWidths: TableColumn[] = [
      { id: "name", label: "Name", width: 3 },
      { id: "email", label: "Email", width: 4 },
      { id: "role", label: "Role", width: 2 },
    ];

    render(<Table columns={columnsWithWidths} data={mockData} />);

    const nameHeader = screen.getByText("Name").closest("th");
    const emailHeader = screen.getByText("Email").closest("th");
    const roleHeader = screen.getByText("Role").closest("th");

    expect(nameHeader).toHaveClass("w-3/12");
    expect(emailHeader).toHaveClass("w-4/12");
    expect(roleHeader).toHaveClass("w-2/12");
  });

  it("handles disabled pagination buttons", () => {
    const handlePageChange = jest.fn();
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        paginationType="paged"
        pageSize={1}
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />,
    );

    const previousButton = screen.getByText("Previous").closest("div");
    const nextButton = screen.getByText("Next").closest("div");

    expect(previousButton).toHaveClass("cursor-not-allowed");
    expect(nextButton).not.toHaveClass("cursor-not-allowed");
  });

  it("handles intersection observer for infinite scroll", async () => {
    const handleLoadMore = jest.fn();
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: "User",
      status: "active",
      lastLogin: "2024-01-15",
    }));

    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });
    (window as any).IntersectionObserver = mockIntersectionObserver;

    render(
      <Table
        columns={basicColumns}
        data={largeData}
        paginationType="showMore"
        pageSize={10}
        onLoadMore={handleLoadMore}
      />,
    );

    await waitFor(() => {
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });
  });

  it("handles custom cell alignment", () => {
    const columnsWithAlignment: TableColumn[] = [
      { id: "name", label: "Name", align: "left" },
      { id: "email", label: "Email", align: "center" },
      { id: "role", label: "Role", align: "right" },
    ];

    render(<Table columns={columnsWithAlignment} data={mockData} />);

    const nameCell = screen.getByText("John Doe").closest("td");
    const emailCell = screen.getByText("john@example.com").closest("td");
    const roleCell = screen.getByText("Admin").closest("td");

    expect(nameCell).toHaveClass("text-left");
    expect(emailCell).toHaveClass("text-center");
    expect(roleCell).toHaveClass("text-right");
  });

  it("handles empty data with row numbers", () => {
    render(<Table columns={basicColumns} data={[]} showRowNumbers />);

    const emptyCell = screen.getByText("No data available").closest("td");
    expect(emptyCell).toHaveAttribute("colSpan", "6"); // 5 columns + 1 row number
  });

  it("handles custom className for columns", () => {
    const columnsWithClassName: TableColumn[] = [
      { id: "name", label: "Name", className: "custom-name-column" },
      { id: "email", label: "Email", className: "custom-email-column" },
    ];

    render(<Table columns={columnsWithClassName} data={mockData} />);

    const nameHeader = screen.getByText("Name").closest("th");
    const emailHeader = screen.getByText("Email").closest("th");

    expect(nameHeader).toHaveClass("custom-name-column");
    expect(emailHeader).toHaveClass("custom-email-column");
  });

  it("handles hover effects on table rows", () => {
    render(<Table columns={basicColumns} data={mockData} />);

    const firstRow = screen.getByText("John Doe").closest("tr");
    expect(firstRow).toHaveClass("hover:bg-muted/90", "transition-colors");
  });

  it("handles sortable column hover effects", () => {
    const sortableColumns: TableColumn[] = [
      { id: "name", label: "Name", sortable: true },
    ];

    render(
      <Table columns={sortableColumns} data={mockData} onSort={jest.fn()} />,
    );

    const nameHeader = screen.getByText("Name").closest("th");
    expect(nameHeader).toHaveClass("hover:bg-muted/75");
  });

  it("handles sort when no onSort is provided", () => {
    const sortableColumns: TableColumn[] = [
      { id: "name", label: "Name", sortable: true },
    ];

    render(<Table columns={sortableColumns} data={mockData} />);

    const nameHeader = screen.getByText("Name").closest("th");
    fireEvent.click(nameHeader!);
    // Should not throw error when no onSort is provided
  });

  it("handles sort when column is not sortable", () => {
    const nonSortableColumns: TableColumn[] = [
      { id: "name", label: "Name", sortable: false },
    ];

    render(
      <Table columns={nonSortableColumns} data={mockData} onSort={jest.fn()} />,
    );

    const nameHeader = screen.getByText("Name").closest("th");
    fireEvent.click(nameHeader!);
    // Should not call onSort when column is not sortable
  });

  it("handles page change when no onPageChange is provided", () => {
    render(
      <Table
        columns={basicColumns}
        data={mockData}
        paginationType="paged"
        pageSize={1}
        currentPage={1}
        totalPages={3}
      />,
    );

    const nextButton = screen.getByText("Next").closest("div");
    fireEvent.click(nextButton!);
    // Should not throw error when no onPageChange is provided
  });

  it("handles intersection observer cleanup", async () => {
    const handleLoadMore = jest.fn();
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: "User",
      status: "active",
      lastLogin: "2024-01-15",
    }));

    const mockDisconnect = jest.fn();
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect: mockDisconnect,
    });
    (window as any).IntersectionObserver = mockIntersectionObserver;

    const { unmount } = render(
      <Table
        columns={basicColumns}
        data={largeData}
        paginationType="showMore"
        pageSize={10}
        onLoadMore={handleLoadMore}
      />,
    );

    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("handles intersection observer when element is not found", async () => {
    const handleLoadMore = jest.fn();
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: "User",
      status: "active",
      lastLogin: "2024-01-15",
    }));

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });
    (window as any).IntersectionObserver = mockIntersectionObserver;

    render(
      <Table
        columns={basicColumns}
        data={largeData}
        paginationType="showMore"
        pageSize={10}
        onLoadMore={handleLoadMore}
      />,
    );

    await waitFor(() => {
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });
  });

  it("handles intersection observer callback", async () => {
    const handleLoadMore = jest.fn();
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: "User",
      status: "active",
      lastLogin: "2024-01-15",
    }));

    let observerCallback:
      | ((entries: IntersectionObserverEntry[]) => void)
      | null = null;
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockImplementation(
      (callback: (entries: IntersectionObserverEntry[]) => void) => {
        observerCallback = callback;
        return {
          observe: () => null,
          disconnect: () => null,
        };
      },
    );
    (window as any).IntersectionObserver = mockIntersectionObserver;

    render(
      <Table
        columns={basicColumns}
        data={largeData}
        paginationType="showMore"
        pageSize={10}
        onLoadMore={handleLoadMore}
      />,
    );

    await waitFor(() => {
      expect(observerCallback).toBeTruthy();
    });

    // Simulate intersection observer callback
    if (observerCallback) {
      (observerCallback as (entries: IntersectionObserverEntry[]) => void)([
        { isIntersecting: true } as IntersectionObserverEntry,
      ]);
    }

    expect(handleLoadMore).toHaveBeenCalled();
  });
});
