import { ListData } from '@/types/answerData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ResponseProps {
  list: ListData;
}

interface Row {
  id: number;
  날짜: string;
  [key: string]: string | number;
}

function Response({ list }: ResponseProps) {
  const columns: GridColDef[] = [{ field: '날짜', headerName: '날짜', width: 200 }];

  list.head.forEach((question, index) => {
    columns.push({
      field: `Q${index + 1}`,
      headerName: `Q${index + 1}. ${question}`,
      width: 150,
    });
  });

  const rows = list.rows.map((row, index) => {
    const newRow: Row = { id: index + 1, 날짜: row.createdAt };

    row.responses.forEach((response, i) => {
      newRow[`Q${i + 1}`] = response;
    });

    return newRow;
  });
  console.log(rows);

  return (
    <div>
      <button
        type="button"
        className="absolute top-[8.25rem] right-[7.5rem] w-[6.25rem] h-9 bg-darkPurple rounded-[0.625rem] text-base text-white cltext-base focus:outline-none"
      >
        저장하기
      </button>
      <div className="max-w-[52.5rem] max-h-[41rem] pt-4">
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
