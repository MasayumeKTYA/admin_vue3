import { defineStore, } from "pinia";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
export const shopStore = defineStore("main", {
  state: () => ({
    name: 'zt'
  }),
  actions: {
    exportExcel(data: any, columns: any) {
      const xlsxData: string[][] = []
      const col: string[] = columns.reduce((pre: any, cur: any) => {
        if (cur.title != '操作') {
          pre.push(cur.title)
        }
        return pre
      }, []);
      xlsxData.push(col)
      const resXlsx = data.reduce((pre: any, cur: any) => {
        pre.push(Object.values(cur))
        return pre
      }, xlsxData)
      const ws = XLSX.utils.aoa_to_sheet(resXlsx);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const file = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(file, 'data.xlsx');
    },
  },
});

