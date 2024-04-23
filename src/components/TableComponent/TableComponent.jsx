import { Table } from 'antd';
import React, { useState } from 'react'
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const TableComponent = (props) => {
  const { selectionType = 'checkbox', data: dataSource = [], isLoading = false, columns = [], handleDelteMany } = props
  const [rowSelectedKeys, setRowSelectedKeys] = useState([])
  
  //Export excel no action
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== 'action')
    return arr
  }, [columns])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys)
    },

  };
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys)
  }
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      {!!rowSelectedKeys.length && (
        <div>
          <Button
            style={{
              background: 'red',
              color: '#fff',
              marginBottom: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none', // Loại bỏ viền
            }}
            onClick={handleDeleteAll}
          >
            {<DeleteOutlined />}
          </Button>
        </div>
      )}
      <button onClick={exportExcel}>Export Excel</button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </div>
  )
}

export default TableComponent