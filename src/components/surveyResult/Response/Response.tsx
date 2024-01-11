import { DataGrid, GridColDef } from '@mui/x-data-grid';

function Response() {
  const columns: GridColDef[] = [
    { field: '날짜', headerName: '날짜', width: 200 },
    { field: 'Q1', headerName: 'Q1', width: 150 },
    { field: 'Q2', headerName: 'Q2', width: 150 },
    { field: 'Q3', headerName: 'Q3', width: 150 },
    { field: 'Q4', headerName: 'Q4', width: 150 },
    { field: 'Q5', headerName: 'Q5', width: 150 },
  ];

  const rows = [
    { id: 1, 날짜: '2020.2.12 12:00', Q1: 'Jon', Q2: 14, Q3: 14, Q4: 14, Q5: 14 },
    { id: 2, 날짜: '2020.2.12 12:00', Q1: 'Jon', Q2: 14, Q3: 14, Q4: 14, Q5: 14 },
  ];
  return (
    <div>
      <button
        type="button"
        className="absolute top-[8.25rem] right-[7.5rem] w-[6.25rem] h-9 bg-darkPurple rounded-[0.625rem] text-base text-white cltext-base focus:outline-none"
      >
        저장하기
      </button>
      <div className="max-w-[52.5rem] max-h-[41rem]">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
        />
      </div>
    </div>
  );
}

export default Response;
