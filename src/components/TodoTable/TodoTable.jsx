import { useState } from 'react';
import useTodoData from './hooks/useTodoData';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import { Box } from '@mui/system';

const TodoTable = () => {
  const [todoList, isLoading, isError] = useTodoData();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // Find the new page
    let oldRowsPerPage = rowsPerPage;
    let newRowsPerPage = parseInt(event.target.value, 10);
    let newPage = (page * oldRowsPerPage) / newRowsPerPage;

    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error Fetching Data from Json Placeholder</p>;
  }

  return (
    <Box sx={{ marginInline: 'auto', width: { md: '50%' } }}>
      <TableContainer component={Paper}>
        <Table aria-label="Todo-Table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">User</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {todoList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell align="center">{task.id}</TableCell>
                  <TableCell align="center">{task.userId}</TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell align="center">
                    {task.completed ? (
                      <DoneIcon sx={{ color: 'green' }} />
                    ) : (
                      <PendingIcon sx={{ color: 'orange' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={todoList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TodoTable;
