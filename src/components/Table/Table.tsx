import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Card } from "../Card/Card";
import { Typography } from "../Typography/Typography";

// Column configuration interface
export interface TableColumn<T = any> {
  id: string;
  label: string;
  width?: number; // Width ratio (1-12, like CSS grid)
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

// Pagination types
export type PaginationType = "showMore" | "paged" | "custom";

// Table variants
const tableVariants = cva("w-full border-collapse", {
  variants: {
    variant: {
      default: "bg-card",
      bordered: "border border-border",
      striped: "[&_tr:nth-child(even)]:bg-muted/90",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const tableHeaderVariants = cva(
  "border-b border-border bg-muted/90 font-medium text-muted-foreground",
  {
    variants: {
      size: {
        sm: "px-2 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-base",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      sticky: {
        true: "sticky top-0 z-20 bg-background/95 backdrop-blur-xl shadow-lg border-b-2 border-border/80",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      align: "left",
      sticky: false,
    },
  },
);

const tableCellVariants = cva("border-b border-border", {
  variants: {
    size: {
      sm: "px-2 py-2 text-xs",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    sticky: {
      true: "sticky bg-background/90 backdrop-blur-lg shadow-md",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    align: "left",
    sticky: false,
  },
});

const tableContainerVariants = cva("relative", {
  variants: {
    scrollable: {
      true: "overflow-y-auto",
      false: "",
    },
    stickyFirstColumns: {
      true: "",
      false: "",
    },
    stickyLastColumns: {
      true: "",
      false: "",
    },
    stickyHeader: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    scrollable: false,
    stickyFirstColumns: false,
    stickyLastColumns: false,
    stickyHeader: false,
  },
});

export interface TableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableVariants> {
  columns: TableColumn<T>[];
  data: T[];
  paginationType?: PaginationType;
  pageSize?: number;
  onLoadMore?: () => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  loading?: boolean;
  stickyHeader?: boolean;
  stickyFirstColumns?: number; // Number of columns to make sticky from the beginning
  stickyLastColumns?: number; // Number of columns to make sticky from the end
  scrollable?: boolean;
  maxHeight?: string;
  onSort?: (columnId: string, direction: "asc" | "desc") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  rowClassName?: (row: T, index: number) => string;
  emptyMessage?: string;
  showRowNumbers?: boolean;
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  (
    {
      className,
      variant,
      size,
      columns,
      data,
      paginationType = "paged",
      pageSize = 10,
      onLoadMore,
      onPageChange,
      currentPage = 1,
      totalPages = 1,
      loading = false,
      stickyHeader = false,
      stickyFirstColumns = 0,
      stickyLastColumns = 0,
      scrollable = false,
      maxHeight,
      onSort,
      sortColumn,
      sortDirection,
      rowClassName,
      emptyMessage = "No data available",
      showRowNumbers = false,
      ...props
    },
    ref,
  ) => {
    const [displayData, setDisplayData] = React.useState<any[]>([]);
    const [currentPageState, setCurrentPageState] = React.useState(currentPage);
    const [hasMore, setHasMore] = React.useState(true);
    const [columnWidths, setColumnWidths] = React.useState<number[]>([]);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const observerRef = React.useRef<IntersectionObserver | null>(null);
    const tableRef = React.useRef<HTMLTableElement>(null);

    // Measure column widths after table renders
    React.useEffect(() => {
      if (tableRef.current && data.length > 0) {
        const measureColumnWidths = () => {
          const table = tableRef.current;
          if (!table) return;

          const headerRow = table.querySelector("thead tr");
          if (!headerRow) return;

          const cells = Array.from(headerRow.children) as HTMLElement[];
          const widths: number[] = [];

          cells.forEach((cell, index) => {
            // Skip row numbers column if present
            if (showRowNumbers && index === 0) {
              widths.push(48); // Fixed width for row numbers
              return;
            }

            // Get the actual rendered width
            const rect = cell.getBoundingClientRect();
            widths.push(rect.width);
          });

          setColumnWidths(widths);
        };

        // Measure after a short delay to ensure table is fully rendered
        const timeoutId = setTimeout(measureColumnWidths, 100);
        return () => clearTimeout(timeoutId);
      }
    }, [data, columns, showRowNumbers]);

    // Handle pagination
    React.useEffect(() => {
      if (paginationType === "paged") {
        const startIndex = (currentPageState - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setDisplayData(data.slice(startIndex, endIndex));
      } else {
        setDisplayData(data);
      }
    }, [data, currentPageState, pageSize, paginationType]);

    // Handle show more pagination
    React.useEffect(() => {
      if (paginationType === "showMore") {
        setDisplayData(data.slice(0, currentPageState * pageSize));
        setHasMore(currentPageState * pageSize < data.length);
      }
    }, [data, currentPageState, pageSize, paginationType]);

    // Intersection observer for infinite scroll
    React.useEffect(() => {
      if (
        paginationType === "showMore" &&
        onLoadMore &&
        typeof IntersectionObserver !== "undefined"
      ) {
        const options = {
          root: null,
          rootMargin: "20px",
          threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasMore && !loading) {
            onLoadMore();
          }
        }, options);

        observerRef.current = observer;

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }

        return () => {
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        };
      }
    }, [paginationType, onLoadMore, hasMore, loading]);

    const handleSort = (columnId: string) => {
      if (onSort) {
        const newDirection =
          sortColumn === columnId && sortDirection === "asc" ? "desc" : "asc";
        onSort(columnId, newDirection);
      }
    };

    const handlePageChange = (page: number) => {
      if (paginationType === "paged") {
        setCurrentPageState(page);
        onPageChange?.(page);
      } else {
        setCurrentPageState(page);
      }
    };

    const renderCell = (
      column: TableColumn<any>,
      row: any,
      rowIndex: number,
    ) => {
      const value = (row as any)[column.id];

      if (column.render) {
        return column.render(value, row, rowIndex);
      }

      return (
        <Typography
          variant="p"
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "base"}
        >
          {value || ""}
        </Typography>
      );
    };

    const getStickyFirstColumns = () => {
      if (!stickyFirstColumns) return [];
      return columns.slice(0, stickyFirstColumns);
    };

    const getStickyLastColumns = () => {
      if (!stickyLastColumns) return [];
      return columns.slice(-stickyLastColumns);
    };

    const getRegularColumns = () => {
      const startIndex = stickyFirstColumns || 0;
      const endIndex = stickyLastColumns ? -stickyLastColumns : undefined;
      return columns.slice(startIndex, endIndex);
    };

    // Calculate cumulative width for sticky column positioning using measured widths
    const getStickyColumnLeftPosition = (columnIndex: number) => {
      if (columnWidths.length === 0) {
        // Fallback to estimated widths if not measured yet
        return `${columnIndex * 100 + (showRowNumbers ? 48 : 0)}px`;
      }

      let leftPosition = 0;

      // Add widths of all columns before the current sticky column
      for (let i = 0; i < columnIndex; i++) {
        if (columnWidths[i]) {
          leftPosition += columnWidths[i];
        }
      }

      return `${leftPosition}px`;
    };

    // Calculate cumulative width for sticky last columns positioning using measured widths
    const getStickyLastColumnRightPosition = (columnIndex: number) => {
      if (columnWidths.length === 0) {
        return `${columnIndex * 100}px`;
      }

      let rightPosition = 0;
      const lastColumns = getStickyLastColumns();

      // Calculate position from the end of the table
      const totalColumns = columns.length + (showRowNumbers ? 1 : 0);
      const stickyStartIndex = totalColumns - stickyLastColumns;

      for (let i = columnIndex + 1; i < lastColumns.length; i++) {
        const actualIndex = stickyStartIndex + i;
        if (columnWidths[actualIndex]) {
          rightPosition += columnWidths[actualIndex];
        }
      }

      return `${rightPosition}px`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          tableContainerVariants({
            scrollable,
            stickyFirstColumns: stickyFirstColumns > 0,
            stickyLastColumns: stickyLastColumns > 0,
            stickyHeader,
          }),
          className,
        )}
        style={maxHeight ? { maxHeight } : undefined}
        {...props}
      >
        <table
          ref={tableRef}
          className={cn(
            tableVariants({
              variant,
              size,
            }),
          )}
        >
          <thead>
            <tr>
              {showRowNumbers && (
                <th
                  className={cn(
                    tableHeaderVariants({
                      size,
                      align: "center",
                      sticky: stickyHeader,
                    }),
                    "w-12 sticky",
                  )}
                  style={{
                    left: "0px",
                    zIndex: stickyFirstColumns > 0 ? 20 : 10,
                  }}
                >
                  #
                </th>
              )}
              {getStickyFirstColumns().map((column, index) => (
                <th
                  key={column.id}
                  className={cn(
                    tableHeaderVariants({
                      size,
                      align: column.align,
                      sticky: stickyHeader,
                    }),
                    column.className,
                    column.width && `w-${column.width}/12`,
                    "sticky",
                    onSort &&
                      column.sortable &&
                      "cursor-pointer hover:bg-muted/75",
                  )}
                  style={{
                    left: getStickyColumnLeftPosition(index),
                    width: columnWidths[index + (showRowNumbers ? 1 : 0)]
                      ? `${columnWidths[index + (showRowNumbers ? 1 : 0)]}px`
                      : undefined,
                    minWidth: columnWidths[index + (showRowNumbers ? 1 : 0)]
                      ? `${columnWidths[index + (showRowNumbers ? 1 : 0)]}px`
                      : undefined,
                  }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    <Typography variant="small" weight="medium">
                      {column.label}
                    </Typography>
                    {onSort && column.sortable && sortColumn === column.id && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {getRegularColumns().map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    tableHeaderVariants({
                      size,
                      align: column.align,
                      sticky: stickyHeader,
                    }),
                    column.className,
                    column.width && `w-${column.width}/12`,
                    onSort &&
                      column.sortable &&
                      "cursor-pointer hover:bg-muted/75",
                  )}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    <Typography variant="small" weight="medium">
                      {column.label}
                    </Typography>
                    {onSort && column.sortable && sortColumn === column.id && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {getStickyLastColumns().map((column, index) => (
                <th
                  key={column.id}
                  className={cn(
                    tableHeaderVariants({
                      size,
                      align: column.align,
                      sticky: stickyHeader,
                    }),
                    column.className,
                    column.width && `w-${column.width}/12`,
                    "sticky",
                    onSort &&
                      column.sortable &&
                      "cursor-pointer hover:bg-muted/75",
                  )}
                  style={{
                    right: getStickyLastColumnRightPosition(index),
                    width: columnWidths[
                      columns.length -
                        stickyLastColumns +
                        index +
                        (showRowNumbers ? 1 : 0)
                    ]
                      ? `${
                          columnWidths[
                            columns.length -
                              stickyLastColumns +
                              index +
                              (showRowNumbers ? 1 : 0)
                          ]
                        }px`
                      : undefined,
                    minWidth: columnWidths[
                      columns.length -
                        stickyLastColumns +
                        index +
                        (showRowNumbers ? 1 : 0)
                    ]
                      ? `${
                          columnWidths[
                            columns.length -
                              stickyLastColumns +
                              index +
                              (showRowNumbers ? 1 : 0)
                          ]
                        }px`
                      : undefined,
                  }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    <Typography variant="small" weight="medium">
                      {column.label}
                    </Typography>
                    {onSort && column.sortable && sortColumn === column.id && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showRowNumbers ? 1 : 0)}
                  className="text-center py-8 text-muted-foreground"
                >
                  <Typography variant="muted">{emptyMessage}</Typography>
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    "hover:bg-muted/90 transition-colors",
                    rowClassName?.(row, rowIndex),
                  )}
                >
                  {showRowNumbers && (
                    <td
                      className={cn(
                        tableCellVariants({
                          size,
                          align: "center",
                          sticky: true,
                        }),
                        "sticky",
                      )}
                      style={{
                        left: "0px",
                        zIndex: stickyFirstColumns > 0 ? 20 : 10,
                      }}
                    >
                      <Typography
                        variant="small"
                        className="text-muted-foreground"
                      >
                        {(currentPageState - 1) * pageSize + rowIndex + 1}
                      </Typography>
                    </td>
                  )}
                  {getStickyFirstColumns().map((column, index) => (
                    <td
                      key={column.id}
                      className={cn(
                        tableCellVariants({
                          size,
                          align: column.align,
                          sticky: true,
                        }),
                        column.className,
                        "sticky",
                      )}
                      style={{
                        left: getStickyColumnLeftPosition(index),
                        width: columnWidths[index + (showRowNumbers ? 1 : 0)]
                          ? `${
                              columnWidths[index + (showRowNumbers ? 1 : 0)]
                            }px`
                          : undefined,
                        minWidth: columnWidths[index + (showRowNumbers ? 1 : 0)]
                          ? `${
                              columnWidths[index + (showRowNumbers ? 1 : 0)]
                            }px`
                          : undefined,
                      }}
                    >
                      {renderCell(column, row, rowIndex)}
                    </td>
                  ))}
                  {getRegularColumns().map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        tableCellVariants({ size, align: column.align }),
                        column.className,
                      )}
                    >
                      {renderCell(column, row, rowIndex)}
                    </td>
                  ))}
                  {getStickyLastColumns().map((column, index) => (
                    <td
                      key={column.id}
                      className={cn(
                        tableCellVariants({
                          size,
                          align: column.align,
                          sticky: true,
                        }),
                        column.className,
                        "sticky",
                      )}
                      style={{
                        right: getStickyLastColumnRightPosition(index),
                        width: columnWidths[
                          columns.length -
                            stickyLastColumns +
                            index +
                            (showRowNumbers ? 1 : 0)
                        ]
                          ? `${
                              columnWidths[
                                columns.length -
                                  stickyLastColumns +
                                  index +
                                  (showRowNumbers ? 1 : 0)
                              ]
                            }px`
                          : undefined,
                        minWidth: columnWidths[
                          columns.length -
                            stickyLastColumns +
                            index +
                            (showRowNumbers ? 1 : 0)
                        ]
                          ? `${
                              columnWidths[
                                columns.length -
                                  stickyLastColumns +
                                  index +
                                  (showRowNumbers ? 1 : 0)
                              ]
                            }px`
                          : undefined,
                      }}
                    >
                      {renderCell(column, row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Show More Button */}
        {paginationType === "showMore" && hasMore && (
          <div className="flex justify-center py-4">
            <Card
              variant="interactive"
              size="sm"
              onClick={onLoadMore}
              disabled={loading}
              className="cursor-pointer"
            >
              <Typography variant="small" weight="medium">
                {loading ? "Loading..." : "Show More"}
              </Typography>
            </Card>
          </div>
        )}

        {/* Pagination Controls */}
        {paginationType === "paged" && totalPages > 1 && (
          <div className="flex items-center justify-between py-4">
            <Typography variant="small" className="text-muted-foreground">
              Page {currentPageState} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Card
                variant="interactive"
                size="sm"
                onClick={() => handlePageChange(currentPageState - 1)}
                disabled={currentPageState <= 1}
                className="cursor-pointer"
              >
                <Typography variant="small">Previous</Typography>
              </Card>
              <Card
                variant="interactive"
                size="sm"
                onClick={() => handlePageChange(currentPageState + 1)}
                disabled={currentPageState >= totalPages}
                className="cursor-pointer"
              >
                <Typography variant="small">Next</Typography>
              </Card>
            </div>
          </div>
        )}

        {/* Custom Pagination Controls for Testing */}
        {paginationType === "custom" && (
          <div className="flex items-center justify-between py-4">
            <Typography variant="small" className="text-muted-foreground">
              Page {currentPageState} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Card
                variant="interactive"
                size="sm"
                onClick={() => handlePageChange(currentPageState - 1)}
                disabled={currentPageState <= 1}
                className="cursor-pointer"
              >
                <Typography variant="small">Previous</Typography>
              </Card>
              <Card
                variant="interactive"
                size="sm"
                onClick={() => handlePageChange(currentPageState + 1)}
                disabled={currentPageState >= totalPages}
                className="cursor-pointer"
              >
                <Typography variant="small">Next</Typography>
              </Card>
            </div>
          </div>
        )}

        {/* Intersection Observer Target */}
        {paginationType === "showMore" && (
          <div ref={containerRef} className="h-4" />
        )}
      </div>
    );
  },
);

Table.displayName = "Table";

export {
  Table,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants,
  tableContainerVariants,
};
