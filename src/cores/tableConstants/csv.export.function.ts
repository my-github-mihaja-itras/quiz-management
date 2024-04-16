export function convertArrayOfObjectsToCSV(array: any[], columns: any[]) {
  // console.log("Array=", array);

  let result = "";
  const columnDelimiter = ",";
  const lineDelimiter = "\n";

  result += columns.map((column) => column.name).join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    const row = columns.map((column) => {
      let CellData = item[column.selector];
      if (typeof column.selector === "function") {
        CellData = column.selector(item);

        if (Array.isArray(CellData)) {
          CellData = CellData.join(" & ");
        }
      }
      return CellData;
    });

    result += row.join(columnDelimiter);

    result += lineDelimiter;
  });
  // console.log(result);

  return result;
}

const data = [
  {
    _id: "660e92e20b047d0855170564",
    registrationNumber: "0014-GL-2024",
    registratedCourse: [
      {
        course: "660e92bc0b047d085516f7e2",
        average: 0,
        result: [],
        _id: "660e94fb90014d75258dbcba",
      },
      {
        course: "660e92bc0b047d085516f7ee",
        average: 0,
        result: [],
        _id: "660e94fb90014d75258dbcbc",
      },
      {
        course: "660e92bc0b047d085516f7f6",
        average: 0,
        result: [],
        _id: "660e94fb90014d75258dbcbd",
      },
      {
        course: "660e92bc0b047d085516f7e4",
        average: 10,
        result: [
          {
            note: 10,
            examDate: "2024-04-19T00:00:00.000Z",
            _id: "6613b22010a2333b044cdd34",
          },
        ],
        _id: "6613b22010a2333b044cdd33",
      },
    ],
    __v: 0,
  },
];

const after = [
  {
    _id: "660e92e20b047d0855170564",
    registrationNumber: "0014-GL-2024",
    registratedCourse: [null, null, null, null],
    __v: 0,
  },
];

export function downloadCSV(csv: string) {
  const link = document.createElement("a");
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

export const convertDataToReadableFormat = <T>(data: T[]): any[] => {
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    status: item.status ? "Actif" : "Inactif",
  }));
};
