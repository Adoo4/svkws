import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import useBooksGrid from "../Utils.js/useBooksGrid";

export default function BooksDataGrid() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  const [sortModel, setSortModel] = useState([]);
  const [filters, _setFilters] = useState({});

  // Serialize sortModel and filters to stabilize React Query key and DataGrid remount
  const stableSort = JSON.stringify(sortModel);
  const stableFilters = JSON.stringify(filters);

  const { data, isLoading } = useBooksGrid({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortModel,
    filters,
  });

  const columns = [
  { field: "_id", headerName: "ID", width: 220, cellClassName: "smallFont" },
  { field: "title", headerName: "Title", flex: 1, cellClassName: "smallFont" },
  { field: "author", headerName: "Author", width: 150, cellClassName: "smallFont" },
  { field: "mainCategory", headerName: "Category", width: 150, cellClassName: "smallFont" },
  { field: "price", headerName: "Price", type: "number", width: 100, cellClassName: "smallFont" },
  {
  field: "quantity",
  headerName: "Stock",
  width: 140,
  headerAlign: "center",
  align: "center",
  renderCell: (params) => {
    const qty = params.row.quantity ?? 0;

    // Determine stock level
    let color, label;
    if (!qty) {
      color = "error"; // empty or 0 → red
      label = "Prazno";
    } else if (qty <= 5) {
      color = "error"; // very low → red
      label = "Jako niske";
    } else if (qty <= 10) {
      color = "warning"; // low → orange
      label = "Niske";
    } else if (qty <= 15) {
      color = "info"; // medium → blue
      label = "Srednje";
    } else {
      color = "success"; // high → green
      label = "Dovoljne";
    }

    // Bar width percentage (cap at 100%)
    const maxQty = 20;
    const value = Math.min(qty / maxQty, 1) * 100;

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Stock bar background */}
        <Box
          sx={{
            width: "90%",
            height: 16,
            borderRadius: 8,
            bgcolor: "#eee",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Filled part */}
          <Box
            sx={{
              width: qty ? `${value}%` : "100%", // full red if empty
              height: "100%",
              bgcolor: `${color}.main`,
              transition: "width 0.3s ease",
            }}
          />

          {/* Label inside bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "white",
              textShadow: "0 0 2px rgba(0,0,0,0.6)",
            }}
          >
            {label} ({qty})
          </Box>
        </Box>
      </Box>
    );
  },
}

,

  // Discount amount
{
  field: "discountAmount",
  headerName: "Discount",
  width: 100,
  align: "center",
  headerAlign: "center",
  renderCell: (params) => {
    const amount = params.row.discountAmount;
    const validUntil = params.row.discount?.validUntil;

    const expired = !validUntil || new Date(validUntil) < new Date();
    if (expired || !amount) {
      return (
        <Box sx={{ fontSize: "0.75rem", color: "text.disabled" }}>
          —
        </Box>
      );
    }

    return (
     
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        px: 1.4,
        height: 20,
        lineHeight: "16px",
        borderRadius: 999,
        fontSize: "0.7rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor:
          amount >= 50
            ? "success.light"
            : amount >= 20
            ? "warning.light"
            : "error.light",
        color:
          amount >= 50
            ? "success.dark"
            : amount >= 20
            ? "warning.dark"
            : "error.dark",
      }}
    >
      {amount}%
    </Box>
  </Box>


    );
  },
}

,

  // Discount valid until
 {
  field: "discountValidUntil",
  headerName: "Discount",
  width: 180,
  headerAlign: "center",
  align: "center", // horizontal center for the cell
  renderCell: (params) => {
    const validUntil = params.row?.discount?.validUntil;
    if (!validUntil) return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center
          fontSize: "0.8rem",
          color: "text.disabled",
        }}
      >
        —
      </Box>
    );

    const date = new Date(validUntil);
    if (isNaN(date.getTime())) return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          color: "text.disabled",
        }}
      >
        —
      </Box>
    );

    const expired = date < new Date();
    if (expired) return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
          color: "text.disabled",
        }}
      >
        —
      </Box>
    );

    // Not expired → show date
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center", // vertical center
          justifyContent: "center", // horizontal center
          fontSize: "0.8rem",
          fontWeight: 500,
          color: "success.main", // green
        }}
      >
        {date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </Box>
    );
  },
}







];





  return (
   <Box
  sx={{
    minHeight: "100lvh",   // 🔑 take all available height
    width: "100%",
    overflow: "visible",
  }}
>
      <DataGrid
      sx={{
    "& .smallFont": {
      fontSize: "0.75rem",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "0.75rem",
    },
  }}
        key={`${paginationModel.page}-${paginationModel.pageSize}-${stableSort}-${stableFilters}`} // ✅ force remount on changes
        rows={data?.rows || []}
        columns={columns}
        getRowId={(row) => row._id}
        rowHeight={60}

        paginationMode="server"
        sortingMode="server"

        rowCount={data?.total || 0}
        loading={isLoading}

        paginationModel={paginationModel}
        onPaginationModelChange={(model) => {
          setPaginationModel((prev) => {
            // reset page if pageSize changes
            if (model.pageSize !== prev.pageSize) {
              return { page: 0, pageSize: model.pageSize };
            }
            return model;
          });
        }}

        sortModel={sortModel}
        onSortModelChange={(model) => {
          setSortModel(model);
          setPaginationModel((prev) => ({ ...prev, page: 0 }));
        }}

        pageSizeOptions={[10, 20, 50, 100]}
        checkboxSelection
        autoHeight={false}
        disableRowSelectionOnClick
        
      />
    </Box>
  );
}
